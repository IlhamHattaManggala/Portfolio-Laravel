import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { 
  Trash2, 
  Search,
  MessageSquare,
  User,
  Mail,
  Clock,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from '@/layouts/app-layout';
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { Checkbox } from '@/components/ui/checkbox';
import { cn, toUrl } from '@/lib/utils';
import messageRoutes from '@/routes/admin/messages';

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

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

interface IndexProps {
    messages: Message[];
}

export default function Index({ messages }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const filteredMessages = useMemo(() => {
    return messages.filter(msg => 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredMessages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMessages.map(m => m.id!));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (isBulkDeleting) {
      router.post(toUrl(messageRoutes.bulkDestroy()), { ids: selectedIds }, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedIds([]);
          setIsBulkDeleting(false);
        },
      });
    } else {
      if (!messageToDelete) return;
      router.delete(toUrl(messageRoutes.destroy(messageToDelete)), {
          onSuccess: () => {
              setIsDeleteModalOpen(false);
              setMessageToDelete(null);
          },
      });
    }
  };

  const openDeleteModal = (id: number) => {
    setMessageToDelete(id);
    setIsBulkDeleting(false);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleting(true);
    setIsDeleteModalOpen(true);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Pesan', href: '/admin/messages' }]}>
      <Head title="Manajemen Pesan" />
      <div className="space-y-8 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Pesan <span className="text-blue-600">Masuk</span></h1>
            <p className="text-gray-600 dark:text-gray-400">Dengar apa yang dikatakan orang lain tentang pekerjaan kamu.</p>
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
              checked={selectedIds.length === filteredMessages.length && filteredMessages.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm font-medium text-gray-500">Pilih Semua</span>
          </div>
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari pesan berdasarkan nama, email, atau isi pesan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-card border border-border outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Messages List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((msg) => {
              const isSelected = selectedIds.includes(msg.id!);
              return (
                <motion.div 
                  key={msg.id} 
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
                      onCheckedChange={() => toggleSelect(msg.id!)}
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6 pl-12">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
                          <User size={14} />
                          {msg.name}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-bold border border-gray-100 dark:border-gray-700">
                          <Mail size={14} />
                          {msg.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium ml-auto">
                          <Clock size={14} />
                          {new Date(msg.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col gap-2 shrink-0 md:justify-center">
                      <a 
                        href={`mailto:${msg.email}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all active:scale-95"
                      >
                        Balas
                        <ExternalLink size={14} />
                      </a>
                      <button 
                        onClick={() => openDeleteModal(msg.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                        title="Hapus Pesan"
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

        {filteredMessages.length === 0 && (
          <div className="text-center py-24 bg-card rounded-[2.5rem] border border-border">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-gray-400">
               <MessageSquare size={32} />
            </div>
            <p className="text-gray-500 font-medium">
              {searchQuery ? `Tidak ada pesan yang cocok dengan "${searchQuery}"` : "Belum ada pesan masuk."}
            </p>
          </div>
        )}

        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={isBulkDeleting ? "Hapus Beberapa Pesan" : "Hapus Pesan"}
          message={isBulkDeleting 
            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} pesan yang dipilih?`
            : "Apakah Anda yakin ingin menghapus pesan ini?"}
          confirmText={isBulkDeleting ? `Ya, Hapus ${selectedIds.length}` : "Ya, Hapus"}
          type="warning"
        />
      </div>
    </AppLayout>
  );
}
