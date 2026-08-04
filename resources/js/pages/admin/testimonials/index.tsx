import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
  Trash2, 
  Search,
  Quote,
  User,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  Pencil,
  X,
  Save
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from '@/layouts/app-layout';
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { Checkbox } from '@/components/ui/checkbox';
import { cn, toUrl } from '@/lib/utils';
import testimonialRoutes from '@/routes/admin/testimonials';

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

interface Testimonial {
    id: number;
    name: string;
    company: any;
    designation: any;
    testimonial: any;
    is_approved: boolean;
    created_at: string;
}

interface IndexProps {
    testimonials: Testimonial[];
}

export default function Index({ testimonials }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [activeTab, setActiveTab] = useState<'id' | 'en'>('id');
  const [formData, setFormData] = useState({
      company: { id: '', en: '' },
      designation: { id: '', en: '' },
      testimonial: { id: '', en: '' },
      is_approved: false
  });

  const getLocalized = (field: any) => {
    if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
      return field['id'] || field['en'] || '';
    }
    return field || '';
  };

  const filteredItems = useMemo(() => {
    return testimonials.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalized(t.designation).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalized(t.testimonial).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [testimonials, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map(m => m.id!));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleApproval = (testimonial: Testimonial) => {
    router.put(toUrl(testimonialRoutes.update(testimonial.id)), {
      is_approved: !testimonial.is_approved
    }, {
      preserveScroll: true
    });
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
        company: typeof item.company === 'object' && item.company !== null ? item.company : { id: item.company || '', en: '' },
        designation: typeof item.designation === 'object' && item.designation !== null ? item.designation : { id: item.designation || '', en: '' },
        testimonial: typeof item.testimonial === 'object' && item.testimonial !== null ? item.testimonial : { id: item.testimonial || '', en: '' },
        is_approved: item.is_approved
    });
    setActiveTab('id');
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingItem) return;

      router.put(toUrl(testimonialRoutes.update(editingItem.id)), formData, {
          onSuccess: () => {
              setIsEditModalOpen(false);
              setEditingItem(null);
          }
      });
  };

  const handleDelete = () => {
    if (isBulkDeleting) {
      router.post(toUrl(testimonialRoutes.bulkDestroy()), { ids: selectedIds }, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedIds([]);
          setIsBulkDeleting(false);
        },
      });
    } else {
      if (!itemToDelete) return;
      router.delete(toUrl(testimonialRoutes.destroy(itemToDelete)), {
          onSuccess: () => {
              setIsDeleteModalOpen(false);
              setItemToDelete(null);
          },
      });
    }
  };

  const openDeleteModal = (id: number) => {
    setItemToDelete(id);
    setIsBulkDeleting(false);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleting(true);
    setIsDeleteModalOpen(true);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Testimoni', href: '/admin/testimonials' }]}>
      <Head title="Manajemen Testimoni" />
      <div className="space-y-8 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Testimoni <span className="text-blue-600">Klien</span></h1>
            <p className="text-gray-600 dark:text-gray-400">Kelola dan setujui testimoni yang masuk dari klien.</p>
          </div>
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
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm">
            <Checkbox 
              checked={selectedIds.length === filteredItems.length && filteredItems.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm font-medium text-gray-500">Pilih Semua</span>
          </div>
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama, jabatan, atau isi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isSelected = selectedIds.includes(item.id!);
              return (
                <motion.div 
                  key={item.id} 
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  className={cn(
                    "bg-card p-6 rounded-3xl border border-border shadow-sm group hover:shadow-lg transition-all relative",
                    isSelected && "ring-2 ring-blue-600 ring-inset border-blue-600/30"
                  )}
                >
                  <div className="absolute top-6 left-6 z-10">
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(item.id!)}
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6 pl-12">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
                          <User size={14} />
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-bold border border-gray-100 dark:border-gray-700">
                          <Briefcase size={14} />
                          {getLocalized(item.designation)} di {getLocalized(item.company)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium ml-auto">
                          <Clock size={14} />
                          {new Date(item.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {getLocalized(item.testimonial)}
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col gap-2 shrink-0 md:justify-center">
                      <button 
                        onClick={() => toggleApproval(item)}
                        className={cn(
                          "flex items-center justify-center gap-2 px-4 py-2 text-white rounded-xl text-xs font-bold transition-all active:scale-95",
                          item.is_approved ? "bg-amber-500 hover:bg-amber-600" : "bg-green-600 hover:bg-green-700"
                        )}
                      >
                        {item.is_approved ? (
                          <><XCircle size={14} /> Sembunyikan</>
                        ) : (
                          <><CheckCircle2 size={14} /> Setujui & Tampilkan</>
                        )}
                      </button>
                      <button 
                        onClick={() => openEditModal(item)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all flex items-center justify-center"
                        title="Edit Testimoni"
                      >
                        <Pencil size={20} />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all flex items-center justify-center"
                        title="Hapus Testimoni"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24 bg-card rounded-[2.5rem] border border-border">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-gray-400">
               <Quote size={32} />
            </div>
            <p className="text-gray-500 font-medium">
              {searchQuery ? `Tidak ada testimoni yang cocok dengan "${searchQuery}"` : "Belum ada testimoni masuk."}
            </p>
          </div>
        )}

        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={isBulkDeleting ? "Hapus Beberapa Testimoni" : "Hapus Testimoni"}
          message={isBulkDeleting 
            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} testimoni yang dipilih?`
            : "Apakah Anda yakin ingin menghapus testimoni ini?"}
          confirmText={isBulkDeleting ? `Ya, Hapus ${selectedIds.length}` : "Ya, Hapus"}
          type="warning"
        />

        {/* Edit Modal */}
        <AnimatePresence>
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-card w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h2 className="text-xl font-bold">Edit Testimoni</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleEditSubmit}>
                            <div className="p-6">
                                {/* Language Tabs */}
                                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('id')}
                                        className={cn(
                                            "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                                            activeTab === 'id' ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                        )}
                                    >
                                        Indonesia (ID)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('en')}
                                        className={cn(
                                            "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                                            activeTab === 'en' ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                        )}
                                    >
                                        English (EN)
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Perusahaan</label>
                                        <input
                                            type="text"
                                            value={formData.company[activeTab] || ''}
                                            onChange={e => setFormData({
                                                ...formData,
                                                company: { ...formData.company, [activeTab]: e.target.value }
                                            })}
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:border-blue-600 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Jabatan</label>
                                        <input
                                            type="text"
                                            value={formData.designation[activeTab] || ''}
                                            onChange={e => setFormData({
                                                ...formData,
                                                designation: { ...formData.designation, [activeTab]: e.target.value }
                                            })}
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:border-blue-600 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Testimoni</label>
                                        <textarea
                                            rows={4}
                                            value={formData.testimonial[activeTab] || ''}
                                            onChange={e => setFormData({
                                                ...formData,
                                                testimonial: { ...formData.testimonial, [activeTab]: e.target.value }
                                            })}
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:border-blue-600 transition-colors resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 border-t border-border bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-2.5 font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                                >
                                    <Save size={18} />
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
