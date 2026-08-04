import React, { useState, useMemo, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  FileBadge,
  Calendar,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from '@/layouts/app-layout';
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import Image from "@/components/Image";
import { TCertificate } from "@/types";
import certificateRoutes from '@/routes/admin/certificates';
import { toUrl, cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { PaginatedData } from '@/types';
import Pagination from '@/components/Pagination';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

interface IndexProps {
    certificates: PaginatedData<TCertificate>;
    filters: {
        search?: string;
    };
}

export default function Index({ certificates, filters }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const getLocalized = (field: any) => {
    if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
      return field['id'] || field['en'] || '';
    }
    return field || '';
  };

  useEffect(() => {
    if (isFirstRender) {
        setIsFirstRender(false);
        return;
    }

    const timeout = setTimeout(() => {
        router.get(toUrl(certificateRoutes.index()), { search: searchQuery }, { 
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.length === certificates.data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(certificates.data.map(c => c.id!));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (isBulkDeleting) {
      router.post(toUrl(certificateRoutes.bulkDestroy()), { ids: selectedIds }, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedIds([]);
          setIsBulkDeleting(false);
        },
      });
    } else {
      if (!certificateToDelete) return;
      router.delete(toUrl(certificateRoutes.destroy(certificateToDelete)), {
          onSuccess: () => {
              setIsDeleteModalOpen(false);
              setCertificateToDelete(null);
          },
      });
    }
  };

  const openDeleteModal = (id: number) => {
    setCertificateToDelete(id);
    setIsBulkDeleting(false);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleting(true);
    setIsDeleteModalOpen(true);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Sertifikat', href: '/admin/certificates' }]}>
      <Head title="Manajemen Sertifikat" />
      <div className="space-y-8 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Koleksi <span className="text-blue-600">Sertifikat</span></h1>
            <p className="text-gray-600 dark:text-gray-400">Pamerkan kredensial dan keahlian yang telah kamu raih.</p>
          </div>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {selectedIds.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={openBulkDeleteModal}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/20 transition-all active:scale-95"
                >
                  <Trash2 size={20} />
                  Hapus ({selectedIds.length})
                </motion.button>
              )}
            </AnimatePresence>
            <Link 
              href={toUrl(certificateRoutes.create())} 
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <Plus size={20} />
              Sertifikat Baru
            </Link>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm">
            <Checkbox 
              checked={selectedIds.length === certificates.data.length && certificates.data.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm font-medium text-gray-500">Pilih Semua</span>
          </div>
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan judul atau penerbit..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {certificates.data.map((cert) => {
              const isSelected = selectedIds.includes(cert.id!);
              return (
                <motion.div 
                  key={cert.id} 
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={cn(
                    "bg-card rounded-[2.5rem] border border-border overflow-hidden shadow-sm group hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col relative",
                    isSelected && "ring-2 ring-blue-600 ring-inset border-blue-600/30"
                  )}
                >
                  <div className="absolute top-4 left-4 z-10">
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(cert.id!)}
                    />
                  </div>
                  
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={cert.image || "/assets/placeholder.png"} 
                      alt={getLocalized(cert.title)} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3">
                        <Link 
                          href={toUrl(certificateRoutes.edit(cert.id!))}
                          className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button 
                          onClick={() => openDeleteModal(cert.id!)}
                          className="w-10 h-10 bg-white text-red-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <Trash2 size={18} />
                        </button>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{getLocalized(cert.title)}</h3>
                    
                    <div className="space-y-2 mt-auto">
                      <p className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                        <Building2 size={14} className="text-gray-400" />
                        {getLocalized(cert.issuer)}
                      </p>
                      <p className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <Calendar size={14} />
                        {cert.date_issued}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {certificates.data.length === 0 && (
          <div className="text-center py-24 bg-card rounded-[2.5rem] border border-border">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-gray-400">
               <FileBadge size={32} />
            </div>
            <p className="text-gray-500 font-medium">
              {searchQuery ? `Tidak ada sertifikat yang cocok dengan "${searchQuery}"` : "Belum ada sertifikat yang ditambahkan."}
            </p>
          </div>
        )}

        <Pagination 
          currentPage={certificates.current_page}
          totalPages={certificates.last_page}
          onPageChange={(page) => {
            router.get(toUrl(certificateRoutes.index()), { page, search: searchQuery }, {
              preserveState: true,
              preserveScroll: true,
            });
          }}
        />

        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={isBulkDeleting ? "Hapus Beberapa Sertifikat" : "Hapus Sertifikat"}
          message={isBulkDeleting 
            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} sertifikat yang dipilih?`
            : "Apakah Anda yakin ingin menghapus sertifikat ini?"}
          confirmText={isBulkDeleting ? `Ya, Hapus ${selectedIds.length}` : "Ya, Hapus"}
        />
      </div>
    </AppLayout>
  );
}
