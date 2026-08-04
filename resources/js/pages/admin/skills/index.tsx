import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Code2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from '@/layouts/app-layout';
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import Image from "@/components/Image";
import { TTechnology } from "@/types";
import skillRoutes from '@/routes/admin/skills';
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
    skills: TTechnology[];
}

export default function Index({ skills }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [skills, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSkills.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSkills.map(s => s.id!));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (isBulkDeleting) {
      router.post(toUrl(skillRoutes.bulkDestroy()), { ids: selectedIds }, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedIds([]);
          setIsBulkDeleting(false);
        },
      });
    } else {
      if (!skillToDelete) return;
      router.delete(toUrl(skillRoutes.destroy(skillToDelete)), {
          onSuccess: () => {
              setIsDeleteModalOpen(false);
              setSkillToDelete(null);
          },
      });
    }
  };

  const openDeleteModal = (id: number) => {
    setSkillToDelete(id);
    setIsBulkDeleting(false);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleting(true);
    setIsDeleteModalOpen(true);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Skill & Tech', href: '/admin/skills' }]}>
      <Head title="Manajemen Skill" />
      <div className="space-y-8 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Keahlian <span className="text-blue-600">Teknis</span></h1>
            <p className="text-gray-600 dark:text-gray-400">Daftar teknologi yang kamu kuasai dan tampilkan di portfolio.</p>
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
              href={toUrl(skillRoutes.create())} 
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <Plus size={20} />
              Skill Baru
            </Link>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm">
            <Checkbox 
              checked={selectedIds.length === filteredSkills.length && filteredSkills.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm font-medium text-gray-500">Pilih Semua</span>
          </div>
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari skill berdasarkan nama..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const isSelected = selectedIds.includes(skill.id!);
              return (
                <motion.div 
                  key={skill.id} 
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={cn(
                    "bg-card p-6 rounded-3xl border border-border shadow-sm group hover:shadow-lg transition-all relative",
                    isSelected && "ring-2 ring-blue-600 ring-inset border-blue-600/30"
                  )}
                >
                  <div className="absolute top-3 left-3 z-10">
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(skill.id!)}
                      className="opacity-20 group-hover:opacity-100 data-[state=checked]:opacity-100 transition-opacity"
                    />
                  </div>
                  
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="font-bold text-sm truncate group-hover:text-blue-500 transition-colors">{skill.name}</p>
                  
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 flex gap-1">
                      <Link 
                          href={toUrl(skillRoutes.edit(skill.id!))}
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                          <Pencil size={14} />
                      </Link>
                      <button 
                          onClick={() => openDeleteModal(skill.id!)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                      >
                          <Trash2 size={14} />
                      </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-24 bg-card rounded-[2.5rem] border border-border">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-gray-400">
               <Code2 size={32} />
            </div>
            <p className="text-gray-500 font-medium">
              {searchQuery ? `Tidak ada skill yang cocok dengan "${searchQuery}"` : "Belum ada skill yang ditambahkan."}
            </p>
          </div>
        )}

        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={isBulkDeleting ? "Hapus Beberapa Skill" : "Hapus Skill"}
          message={isBulkDeleting 
            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} skill yang dipilih?`
            : "Apakah Anda yakin ingin menghapus skill ini?"}
          confirmText={isBulkDeleting ? `Ya, Hapus ${selectedIds.length}` : "Ya, Hapus"}
        />
      </div>
    </AppLayout>
  );
}
