import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ExternalLink, 
  Search,
  Filter,
  Briefcase,
  CheckSquare,
  Square
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from '@/layouts/app-layout';
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import Pagination from "@/components/Pagination";
import Image from "@/components/Image";
import { TProject } from "@/types";
import projectRoutes from '@/routes/admin/projects';
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
    projects: {
        data: TProject[];
        current_page: number;
        last_page: number;
        total: number;
        links: any[];
    };
}

export default function Index({ projects }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const getLocalized = (field: any) => {
    if (typeof field === 'object' && field !== null) {
      return field['id'] || field['en'] || '';
    }
    return field || '';
  };

  const filteredProjects = useMemo(() => {
    return projects.data.filter(project => 
      getLocalized(project.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalized(project.descriptions).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalized(project.tipe).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects.data, searchQuery]);

  const handlePageChange = (page: number) => {
    router.get(toUrl(projectRoutes.index()), { page }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProjects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProjects.map(p => p.id!));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (isBulkDeleting) {
      router.post(toUrl(projectRoutes.bulkDestroy()), { ids: selectedIds }, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedIds([]);
          setIsBulkDeleting(false);
        },
      });
    } else {
      if (!projectToDelete) return;
      router.delete(toUrl(projectRoutes.destroy(projectToDelete)), {
          onSuccess: () => {
              setIsDeleteModalOpen(false);
              setProjectToDelete(null);
          },
      });
    }
  };

  const openDeleteModal = (id: number) => {
    setProjectToDelete(id);
    setIsBulkDeleting(false);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleting(true);
    setIsDeleteModalOpen(true);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Proyek', href: '/admin/projects' }]}>
      <Head title="Manajemen Proyek" />
      <div className="space-y-8 p-6 text-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manajemen <span className="text-blue-600">Proyek</span></h1>
            <p className="text-muted-foreground">Kelola daftar karya dan showcase kamu di sini.</p>
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
              href={toUrl(projectRoutes.create())} 
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <Plus size={20} />
              Proyek Baru
            </Link>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Cari proyek berdasarkan nama, tipe, atau deskripsi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-2xl text-muted-foreground font-medium hover:border-blue-600 transition-all shadow-sm">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Projects Table/Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-card rounded-[2.5rem] border border-border overflow-hidden shadow-sm ${filteredProjects.length > 0 ? 'min-h-[400px]' : ''} relative`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-5 w-10">
                    <Checkbox 
                      checked={selectedIds.length === filteredProjects.length && filteredProjects.length > 0}
                      onCheckedChange={toggleSelectAll}
                      className="opacity-20 hover:opacity-100 data-[state=checked]:opacity-100 transition-opacity"
                    />
                  </th>
                  <th className="px-4 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Info Proyek</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Tipe</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Tech Stack</th>
                  <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Aksi</th>
                </tr>
              </thead>
              <motion.tbody 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-border"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => {
                    const libs = project.library || [];
                    const isSelected = selectedIds.includes(project.id!);
                    return (
                      <motion.tr 
                        key={project.id} 
                        variants={itemVariants}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                          "hover:bg-muted/30 transition-colors group",
                          isSelected && "bg-blue-500/10"
                        )}
                      >
                        <td className="px-6 py-6">
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => toggleSelect(project.id!)}
                            className="opacity-20 group-hover:opacity-100 data-[state=checked]:opacity-100 transition-opacity"
                          />
                        </td>
                        <td className="px-4 py-6">
                          <div className="flex items-center gap-5">
                            <div className="relative w-24 h-16 rounded-2xl overflow-hidden border border-border shrink-0 bg-muted shadow-sm group-hover:border-blue-600/30 transition-colors">
                              <Image 
                                src={project.image || "/assets/placeholder.png"} 
                                alt={project.name} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                            <div className="max-w-[300px]">
                              <p className="font-bold text-lg group-hover:text-blue-600 transition-colors">{getLocalized(project.name)}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 leading-relaxed">{getLocalized(project.descriptions)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                            {getLocalized(project.tipe)}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                            {libs.slice(0, 3).map((lib: string, idx: number) => (
                              <span key={idx} className="text-[9px] bg-muted px-2 py-0.5 rounded-lg text-muted-foreground uppercase font-black tracking-tight border border-border">
                                {lib}
                              </span>
                            ))}
                            {libs.length > 3 && <span className="text-[10px] text-muted-foreground font-bold">+{libs.length - 3}</span>}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                            <Link 
                              href={toUrl(projectRoutes.edit(project.id!))}
                              className="p-2 text-muted-foreground hover:text-blue-500 transition-colors"
                            >
                              <Pencil size={16} />
                            </Link>
                            <button 
                              onClick={() => project.id && openDeleteModal(project.id)}
                              className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                            <a 
                              href={project.link || "#"} 
                              target="_blank"
                              className="p-2 text-muted-foreground hover:text-green-500 transition-colors"
                            >
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </motion.tbody>
            </table>
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-24 bg-muted/20">
              <div className="w-20 h-20 bg-muted rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                 <Briefcase size={32} />
              </div>
              <p className="text-muted-foreground font-medium">
                {searchQuery ? `Tidak ada proyek yang cocok dengan "${searchQuery}"` : "Belum ada proyek yang ditambahkan."}
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">Mulai tampilkan karya hebatmu hari ini.</p>
            </div>
          )}
        </motion.div>

        {projects.last_page > 1 && (
          <div className="mt-8">
            <Pagination 
              currentPage={projects.current_page} 
              totalPages={projects.last_page} 
              onPageChange={handlePageChange} 
            />
          </div>
        )}

        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={isBulkDeleting ? "Hapus Beberapa Proyek" : "Hapus Proyek"}
          message={isBulkDeleting 
            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} proyek yang dipilih? Tindakan ini tidak dapat dibatalkan.`
            : "Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan."}
          confirmText={isBulkDeleting ? `Ya, Hapus ${selectedIds.length} Proyek` : "Ya, Hapus Proyek"}
        />
      </div>
    </AppLayout>
  );
}
