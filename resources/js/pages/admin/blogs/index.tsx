import React, { useState, useMemo, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ExternalLink, 
  Search,
  BookOpen,
  Eye,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from '@/layouts/app-layout';
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import Image from "@/components/Image";
import { TArticle } from "@/types";
import blogAdminRoutes from '@/routes/admin/blogs';
import { show as blogShowRoute } from '@/routes/blog';
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
    blogs: PaginatedData<TArticle>;
    filters: {
        search?: string;
    };
}

export default function Index({ blogs, filters }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
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
        router.get(toUrl(blogAdminRoutes.index()), { search: searchQuery }, { 
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.length === blogs.data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(blogs.data.map(b => b.id!));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (isBulkDeleting) {
      router.post(toUrl(blogAdminRoutes.bulkDestroy()), { ids: selectedIds }, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedIds([]);
          setIsBulkDeleting(false);
        },
      });
    } else {
      if (!blogToDelete) return;
      router.delete(toUrl(blogAdminRoutes.destroy(blogToDelete)), {
          onSuccess: () => {
              setIsDeleteModalOpen(false);
              setBlogToDelete(null);
          },
      });
    }
  };

  const openDeleteModal = (id: number) => {
    setBlogToDelete(id);
    setIsBulkDeleting(false);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleting(true);
    setIsDeleteModalOpen(true);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Blog', href: '/admin/blogs' }]}>
      <Head title="Manajemen Blog" />
      <div className="space-y-8 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manajemen <span className="text-blue-600">Blog</span></h1>
            <p className="text-gray-600 dark:text-gray-400">Tulis dan bagikan pengetahuan kamu kepada dunia.</p>
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
              href={toUrl(blogAdminRoutes.create())} 
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <Plus size={20} />
              Artikel Baru
            </Link>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm">
            <Checkbox 
              checked={selectedIds.length === blogs.data.length && blogs.data.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm font-medium text-gray-500">Pilih Semua</span>
          </div>
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari artikel berdasarkan judul atau kutipan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Blogs List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {blogs.data.map((blog) => {
              const isSelected = selectedIds.includes(blog.id!);
              return (
                <motion.div 
                  key={blog.id} 
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={cn(
                    "bg-card rounded-[2.5rem] border border-border overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group flex flex-col relative",
                    isSelected && "ring-2 ring-blue-600 ring-inset border-blue-600/30"
                  )}
                >
                  <div className="absolute top-4 left-4 z-10">
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(blog.id!)}
                    />
                  </div>
                  
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={blog.featured_image || "/assets/placeholder.png"} 
                      alt={getLocalized(blog.title)} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {blog.is_published ? (
                        <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-green-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-gray-500/20">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {blog.views} Views
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{getLocalized(blog.title)}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">{getLocalized(blog.excerpt)}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                      <div className="flex gap-1">
                        <Link 
                          href={toUrl(blogAdminRoutes.edit(blog.id))}
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all active:scale-90"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button 
                          onClick={() => openDeleteModal(blog.id)}
                          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all active:scale-90"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <Link 
                        href={toUrl(blogShowRoute(blog.slug))}
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        View Live
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {blogs.data.length === 0 && (
          <div className="text-center py-24 bg-card rounded-[2.5rem] border border-border">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-gray-400">
               <BookOpen size={32} />
            </div>
            <p className="text-gray-500 font-medium">
              {searchQuery ? `Tidak ada artikel yang cocok dengan "${searchQuery}"` : "Belum ada artikel yang ditulis."}
            </p>
            <p className="text-sm text-gray-400 mt-1">Berbagi inspirasi pertama kamu hari ini.</p>
          </div>
        )}

        <Pagination 
          currentPage={blogs.current_page}
          totalPages={blogs.last_page}
          onPageChange={(page) => {
            router.get(toUrl(blogAdminRoutes.index()), { page, search: searchQuery }, {
              preserveState: true,
              preserveScroll: true,
            });
          }}
        />

        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={isBulkDeleting ? "Hapus Beberapa Artikel" : "Hapus Artikel"}
          message={isBulkDeleting 
            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} artikel yang dipilih? Tindakan ini tidak dapat dibatalkan.`
            : "Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan."}
          confirmText={isBulkDeleting ? `Ya, Hapus ${selectedIds.length} Artikel` : "Ya, Hapus Artikel"}
        />
      </div>
    </AppLayout>
  );
}
