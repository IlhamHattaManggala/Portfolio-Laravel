import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, Eye, ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "@/components/Image";
import { TArticle } from "@/types";
import { useTranslation } from "react-i18next";

interface BlogShowProps {
    blog: TArticle;
}

export default function Show({ blog }: BlogShowProps) {
    const { t, i18n } = useTranslation();

    const getLocalized = (field: any) => {
        if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
            const currentLang = i18n.language?.startsWith('id') ? 'id' : 'en';
            return field[currentLang] || field['id'] || '';
        }
        return field || '';
    };

    const contentLocalized = getLocalized(blog.content);
    const titleLocalized = getLocalized(blog.title);

    // Estimate reading time
    const wordsPerMinute = 200;
    const wordCount = contentLocalized ? contentLocalized.split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ilhamhatta.my.id';
    const canonicalUrl = typeof window !== 'undefined' ? window.location.href : `https://ilhamhatta.my.id/blog/${blog.slug}`;
    
    // Parse localized excerpt or generate fallback from content
    const excerptLocalized = getLocalized(blog.excerpt) || 
        (contentLocalized ? `${contentLocalized.substring(0, 160).replace(/[#*`_]/g, '')}...` : '');
    
    // Parse featured image url
    const shareImageUrl = blog.featured_image ? `${blog.featured_image}` : `${siteUrl}/images/profile.webp`;

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Head title={`${titleLocalized} | Blog Ilham Hatta Manggala`}>
                <meta name="description" content={excerptLocalized} />
                <meta name="keywords" content={`${titleLocalized.split(' ').join(', ')}, Tech Article, Coding, Tutorial, Ilham Hatta Manggala`} />
                <meta name="author" content="Ilham Hatta Manggala" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph / Facebook / LinkedIn */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content={`${titleLocalized} | Blog Ilham Hatta Manggala`} />
                <meta property="og:description" content={excerptLocalized} />
                <meta property="og:image" content={shareImageUrl} />
                {blog.published_at && (
                    <meta property="article:published_time" content={new Date(blog.published_at).toISOString()} />
                )}
                <meta property="article:author" content="Ilham Hatta Manggala" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content={`${titleLocalized} | Blog Ilham Hatta Manggala`} />
                <meta name="twitter:description" content={excerptLocalized} />
                <meta name="twitter:image" content={shareImageUrl} />
            </Head>
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <article className="max-w-4xl mx-auto px-6">
                    {/* Back Button */}
                    <Link 
                        href="/#blog" 
                        className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={20} />
                        {t('blog.back_home')}
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                            {titleLocalized}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-primary" />
                                <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString(i18n.language?.startsWith('id') ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Draft'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-primary" />
                                <span>{t('blog.reading_time', { count: readingTime })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye size={18} className="text-primary" />
                                <span>{t('blog.views_count', { count: blog.views })}</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {blog.featured_image && (
                        <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10">
                            <Image
                                src={blog.featured_image}
                                alt={titleLocalized}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="max-w-none text-gray-300">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ ...props }) => <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-10 mb-6 border-b border-white/10 pb-3 leading-tight tracking-tight" {...props} />,
                                h2: ({ ...props }) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4 leading-tight tracking-tight flex items-center gap-3 border-l-4 border-primary pl-4" {...props} />,
                                h3: ({ ...props }) => <h3 className="text-xl md:text-2xl font-bold text-white mt-6 mb-3 leading-tight" {...props} />,
                                p: ({ ...props }) => <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-6 text-justify" {...props} />,
                                ul: ({ ...props }) => <ul className="list-disc list-inside text-gray-300 mb-6 pl-4 space-y-2.5" {...props} />,
                                ol: ({ ...props }) => <ol className="list-decimal list-inside text-gray-300 mb-6 pl-4 space-y-2.5" {...props} />,
                                li: ({ ...props }) => <li className="text-gray-300 text-base md:text-lg leading-relaxed pl-1" {...props} />,
                                strong: ({ ...props }) => <strong className="text-primary font-bold" {...props} />,
                                code: ({ ...props }) => <code className="bg-white/10 px-2 py-0.5 rounded text-sm text-secondary font-mono border border-white/5" {...props} />,
                                pre: ({ ...props }) => <pre className="bg-[#0d1117] border border-white/10 rounded-2xl p-5 my-6 overflow-x-auto text-sm text-gray-200 font-mono leading-relaxed shadow-xl" {...props} />,
                                blockquote: ({ ...props }) => <blockquote className="border-l-4 border-primary bg-white/5 px-5 py-4 rounded-r-2xl italic my-6 text-gray-300 text-lg" {...props} />,
                                a: ({ ...props }) => <a className="text-primary hover:underline hover:text-secondary font-semibold transition-colors duration-200" {...props} />,
                                hr: ({ ...props }) => <hr className="border-white/10 my-10" {...props} />,
                            }}
                        >
                            {contentLocalized || ''}
                        </ReactMarkdown>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
