import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
  Briefcase, 
  BookOpen, 
  MessageSquare, 
  FileBadge, 
  ArrowUpRight,
  Eye,
  TrendingUp,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from '@/layouts/app-layout';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

interface DashboardProps {
    stats: {
        projectCount: number;
        blogCount: number;
        certCount: number;
        messageCount: number;
        totalViews: number;
    };
    recentMessages: {
        id: number;
        name: string;
        message: string;
        created_at: string;
    }[];
}

export default function Dashboard({ stats, recentMessages }: DashboardProps) {
    const statCards = [
        { name: "Total Proyek", value: stats.projectCount, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20", href: "/admin/projects" },
        { name: "Artikel Blog", value: stats.blogCount, icon: BookOpen, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20", href: "/admin/blogs" },
        { name: "Sertifikat", value: stats.certCount, icon: FileBadge, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/20", href: "/admin/certificates" },
        { name: "Pesan Masuk", value: stats.messageCount, icon: MessageSquare, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/20", href: "/admin/messages" },
    ];

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin Dashboard', href: '/admin' }]}>
            <Head title="Admin Dashboard" />
            <div className="space-y-10 p-6 text-foreground">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Ringkasan <span className="text-blue-600">Dashboard</span></h1>
                    <p className="text-muted-foreground">Selamat datang kembali! Berikut adalah statistik portofolio kamu.</p>
                </div>

                {/* Stats Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {statCards.map((stat) => (
                        <motion.div 
                            key={stat.name} 
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="bg-card p-6 rounded-[2rem] border border-border shadow-sm flex flex-col justify-between hover:shadow-xl hover:shadow-blue-500/5 transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={28} />
                                </div>
                                <div className="p-2 bg-muted rounded-xl">
                                    <TrendingUp size={18} className="text-muted-foreground" />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.name}</p>
                                <h3 className="text-4xl font-black">{stat.value}</h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quick Actions */}
                    <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ArrowUpRight className="text-blue-600" />
                            Akses Cepat
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/projects" className="p-4 rounded-2xl bg-muted hover:bg-blue-600 hover:text-white transition-all group">
                                <p className="font-bold">Proyek</p>
                                <p className="text-xs text-muted-foreground group-hover:text-blue-100">Kelola karya terbaru</p>
                            </Link>
                            <Link href="/admin/blogs" className="p-4 rounded-2xl bg-muted hover:bg-blue-600 hover:text-white transition-all group">
                                <p className="font-bold">Blog</p>
                                <p className="text-xs text-muted-foreground group-hover:text-blue-100">Tulis artikel baru</p>
                            </Link>
                            <Link href="/admin/certificates" className="p-4 rounded-2xl bg-muted hover:bg-blue-600 hover:text-white transition-all group">
                                <p className="font-bold">Sertifikat</p>
                                <p className="text-xs text-muted-foreground group-hover:text-blue-100">Update sertifikasi</p>
                            </Link>
                            <Link href="/settings/profile" className="p-4 rounded-2xl bg-muted hover:bg-blue-600 hover:text-white transition-all group">
                                <p className="font-bold">Profil</p>
                                <p className="text-xs text-muted-foreground group-hover:text-blue-100">Ubah detail akun</p>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <MessageSquare className="text-orange-600" />
                                Pesan Terbaru
                            </span>
                            <Link href="/admin/messages" className="text-sm text-blue-600 hover:underline">Lihat Semua</Link>
                        </h2>
                        <div className="space-y-4">
                            {recentMessages && recentMessages.length > 0 ? recentMessages.map((msg) => (
                                <div key={msg.id} className="flex items-start gap-4 p-4 rounded-2xl bg-muted">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold shrink-0">
                                        {msg.name.charAt(0)}
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="font-bold text-sm truncate">{msg.name}</p>
                                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                <Clock size={10} />
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{msg.message}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center py-8 text-muted-foreground text-sm">Belum ada pesan masuk.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Traffic Info */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                            <Eye />
                            Total Kunjungan Blog
                        </h3>
                        <p className="text-blue-100 opacity-80">Orang-orang mulai tertarik dengan apa yang kamu tulis!</p>
                    </div>
                    <div className="text-5xl font-black">{stats.totalViews || 0} <span className="text-xl font-normal opacity-60">Views</span></div>
                </div>
            </div>
        </AppLayout>
    );
}
