import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  UserCircle,
  Building2,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from '@/layouts/app-layout';
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { TExperience } from "@/types";
import experienceRoutes from '@/routes/admin/experience';
import { toUrl, cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

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
    experiences: TExperience[];
}

export default function Index({ experiences }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const getLocalized = (field: any) => {
    if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
      return field['id'] || field['en'] || '';
    }
    return field || '';
  };

  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => 
      getLocalized(exp.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalized(exp.company_name).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [experiences, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredExperiences.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredExperiences.map(e => e.id!));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (isBulkDeleting) {
      router.post(toUrl(experienceRoutes.bulkDestroy()), { ids: selectedIds }, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedIds([]);
          setIsBulkDeleting(false);
        },
      });
    } else {
      if (!experienceToDelete) return;
      router.delete(toUrl(experienceRoutes.destroy(experienceToDelete)), {
          onSuccess: () => {
              setIsDeleteModalOpen(false);
              setExperienceToDelete(null);
          },
      });
    }
  };

  const openDeleteModal = (id: number) => {
    setExperienceToDelete(id);
    setIsBulkDeleting(false);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleting(true);
    setIsDeleteModalOpen(true);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Pengalaman', href: '/admin/experience' }]}>
      <Head title="Manajemen Pengalaman" />
      <div className="space-y-8 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Riwayat <span className="text-blue-600">Pengalaman</span></h1>
            <p className="text-gray-600 dark:text-gray-400">Catat perjalanan karir dan kontribusi kamu.</p>
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
              href={toUrl(experienceRoutes.create())} 
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <Plus size={20} />
              Pengalaman Baru
            </Link>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm">
            <Checkbox 
              checked={selectedIds.length === filteredExperiences.length && filteredExperiences.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm font-medium text-gray-500">Pilih Semua</span>
          </div>
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan jabatan atau perusahaan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Experience List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp) => {
              const isSelected = selectedIds.includes(exp.id!);
              return (
                <motion.div 
                  key={exp.id} 
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  className={cn(
                    "bg-card p-8 rounded-[2.5rem] border border-border shadow-sm group hover:shadow-xl hover:shadow-blue-500/5 transition-all relative",
                    isSelected && "ring-2 ring-blue-600 ring-inset border-blue-600/30"
                  )}
                >
                  <div className="absolute top-8 left-8 z-10">
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(exp.id!)}
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 pl-12">
                    <div 
                      className="w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-lg"
                      style={{ backgroundColor: exp.icon_bg || '#f3f4f6' }}
                    >
                      <img src={exp.icon || "/assets/placeholder.png"} alt={getLocalized(exp.company_name)} className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">{getLocalized(exp.title)}</h3>
                          <p className="flex items-center gap-2 text-gray-500 font-medium">
                            <Building2 size={16} />
                            {getLocalized(exp.company_name)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-muted text-muted-foreground rounded-full text-xs font-black uppercase tracking-widest border border-border">
                          <Calendar size={14} />
                          {getLocalized(exp.date_range)}
                        </div>
                      </div>
                      
                      <ul className="space-y-2 list-disc list-inside text-gray-500 text-sm">
                          {(Array.isArray(getLocalized(exp.points)) ? getLocalized(exp.points) : []).map((point: string, idx: number) => (
                              <li key={idx}>{point}</li>
                          ))}
                      </ul>
                      
                      <div className="flex items-center justify-end gap-2 mt-6 pt-6 border-t border-border transition-opacity">
                        <Link 
                          href={toUrl(experienceRoutes.edit(exp.id!))}
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all active:scale-90"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button 
                          onClick={() => openDeleteModal(exp.id!)}
                          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all active:scale-90"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-24 bg-card rounded-[2.5rem] border border-border">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-gray-400">
               <UserCircle size={32} />
            </div>
            <p className="text-gray-500 font-medium">
              {searchQuery ? `Tidak ada pengalaman yang cocok dengan "${searchQuery}"` : "Belum ada riwayat pengalaman."}
            </p>
          </div>
        )}

        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={isBulkDeleting ? "Hapus Beberapa Pengalaman" : "Hapus Pengalaman"}
          message={isBulkDeleting 
            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} riwayat pengalaman yang dipilih?`
            : "Apakah Anda yakin ingin menghapus riwayat pengalaman ini?"}
          confirmText={isBulkDeleting ? `Ya, Hapus ${selectedIds.length}` : "Ya, Hapus"}
        />
      </div>
    </AppLayout>
  );
}
