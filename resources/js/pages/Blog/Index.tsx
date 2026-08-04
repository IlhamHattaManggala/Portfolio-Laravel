import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, Clock, Eye, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "@/components/Image";
import { motion } from "framer-motion";
import { TArticle } from "@/types";
import { useTranslation } from "react-i18next";

interface BlogsData {
    data: TArticle[];
    current_page: number;
    last_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface BlogIndexProps {
    blogs: BlogsData;
    filters: {
        search?: string;
    };
}

export default function Index({ blogs, filters }: BlogIndexProps) {
    const [search, setSearch] = React.useState(filters.search || '');
    const { t, i18n } = useTranslation();

    const getLocalized = (field: any) => {
        if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
            const currentLang = i18n.language?.startsWith('id') ? 'id' : 'en';
            return field[currentLang] || field['id'] || '';
        }
        return field || '';
    };

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get('/blog', 
                    { search: search || undefined }, 
                    { 
                        preserveState: true, 
                        replace: true,
                        preserveScroll: true
                    }
                );
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // Sinkronisasi state local dengan props dari server (untuk tombol back/forward)
    React.useEffect(() => {
        if (filters.search !== undefined && filters.search !== search) {
            setSearch(filters.search || '');
        }
    }, [filters.search]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ilhamhatta.my.id';
    const canonicalUrl = typeof window !== 'undefined' ? window.location.href : 'https://ilhamhatta.my.id/blog';
    const defaultShareImage = `${siteUrl}/images/profile.webp`;

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
            <Head title="Blog & Artikel Teknologi | Ilham Hatta Manggala">
                <meta name="description" content="Kumpulan artikel teknologi, pemrograman web dan mobile, tutorial coding, tips software engineering, serta wawasan tech terupdate dari Ilham Hatta Manggala." />
                <meta name="keywords" content="Tech Blog, Blog Programmer Indonesia, Tutorial Flutter, Tips Laravel, React JS, Coding, Software Engineer Indonesia, Ilham Hatta Manggala" />
                <meta name="author" content="Ilham Hatta Manggala" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content="Blog & Artikel Teknologi | Ilham Hatta Manggala" />
                <meta property="og:description" content="Kumpulan artikel teknologi, pemrograman web dan mobile, tutorial coding, tips software engineering, serta wawasan tech terupdate dari Ilham Hatta Manggala." />
                <meta property="og:image" content={defaultShareImage} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content="Blog & Artikel Teknologi | Ilham Hatta Manggala" />
                <meta name="twitter:description" content="Kumpulan artikel teknologi, pemrograman web dan mobile, tutorial coding, tips software engineering, serta wawasan tech terupdate dari Ilham Hatta Manggala." />
                <meta name="twitter:image" content={defaultShareImage} />
            </Head>
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium mb-6 text-gray-300"
                        >
                            <BookOpen size={14} className="text-primary" />
                            <span>{t('blog.tag')}</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
                        >
                            {t('blog.title_1')} <span className="text-gray-500">{t('blog.title_2')}</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 max-w-2xl mx-auto"
                        >
                            {t('blog.subtitle')}
                        </motion.p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-16">
                        <form onSubmit={handleSearch} className="relative group">
                            <input
                                type="text"
                                placeholder={t('blog.search_placeholder')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-gray-500"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                            <button type="submit" className="hidden">Search</button>
                        </form>
                    </div>

                    {/* Blog Grid */}
                    {blogs.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {blogs.data.map((blog, i) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="group bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 flex flex-col h-full"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={blog.featured_image || "/assets/placeholder.png"}
                                            alt={getLocalized(blog.title)}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1 relative z-10 -mt-20">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                                                Article
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-gray-300 font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                                                <Clock size={12} />
                                                {new Date(blog.published_at).toLocaleDateString(i18n.language?.startsWith('id') ? 'id-ID' : 'en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-gray-300 font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                                                <Eye size={12} className="text-primary" />
                                                {blog.views}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors tracking-tight line-clamp-2 mt-4">
                                            {getLocalized(blog.title)}
                                        </h3>
                                        
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                                            {getLocalized(blog.excerpt)}
                                        </p>
                                        
                                        <Link
                                            href={`/blog/${blog.slug}`}
                                            className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group/link"
                                        >
                                            <span className="text-sm font-semibold text-white group-hover/link:text-primary transition-colors">{t('blog.read_article')}</span>
                                            <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-2 text-white group-hover/link:text-primary" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <p className="text-gray-500 text-lg">{t('blog.no_articles')}</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {blogs.last_page > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12">
                            {blogs.links.map((link, i) => {
                                // Skip "Previous" and "Next" labels if they are already handled by icons or keep them
                                if (link.label.includes('Previous')) {
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`p-2 rounded-full border border-white/10 transition-colors ${!link.url ? 'opacity-30 cursor-not-allowed' : 'hover:border-primary hover:text-primary'}`}
                                        >
                                            <ChevronLeft size={20} />
                                        </Link>
                                    );
                                }
                                if (link.label.includes('Next')) {
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`p-2 rounded-full border border-white/10 transition-colors ${!link.url ? 'opacity-30 cursor-not-allowed' : 'hover:border-primary hover:text-primary'}`}
                                        >
                                            <ChevronRight size={20} />
                                        </Link>
                                    );
                                }
                                return (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                                            link.active
                                                ? "bg-primary text-black shadow-lg shadow-primary/20"
                                                : "bg-white/5 hover:bg-white/10 text-white"
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
