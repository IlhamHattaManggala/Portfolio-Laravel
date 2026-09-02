import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminFormLayout from "@/components/admin/AdminFormLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { TArticle } from "@/types";
import blogRoutes from '@/routes/admin/blogs';
import { toUrl } from '@/lib/utils';

interface FormProps {
    blog?: TArticle;
}

export default function BlogForm({ blog }: FormProps) {
    const isEditing = !!blog;
    
    const [activeTab, setActiveTab] = useState<'id' | 'en'>('id');

    const { data, setData, post, put, processing, errors } = useForm({
        title: typeof blog?.title === 'object' && blog?.title ? blog.title : { id: blog?.title || "", en: blog?.title || "" },
        excerpt: typeof blog?.excerpt === 'object' && blog?.excerpt ? blog.excerpt : { id: blog?.excerpt || "", en: blog?.excerpt || "" },
        content: typeof blog?.content === 'object' && blog?.content ? blog.content : { id: blog?.content || "", en: blog?.content || "" },
        featured_image: blog?.featured_image || "",
        meta_title: typeof blog?.meta_title === 'object' && blog?.meta_title ? blog.meta_title : { id: blog?.meta_title || "", en: blog?.meta_title || "" },
        meta_description: typeof blog?.meta_description === 'object' && blog?.meta_description ? blog.meta_description : { id: blog?.meta_description || "", en: blog?.meta_description || "" },
        meta_keywords: typeof blog?.meta_keywords === 'object' && blog?.meta_keywords ? blog.meta_keywords : { id: blog?.meta_keywords || "", en: blog?.meta_keywords || "" },
        is_published: blog?.is_published ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(toUrl(blogRoutes.update(blog.id)));
        } else {
            post(toUrl(blogRoutes.store()));
        }
    };

    return (
        <AdminFormLayout
            title={isEditing ? "Edit Artikel" : "Tulis Artikel Baru"}
            subtitle={isEditing ? "Perbarui pemikiran kamu." : "Bagikan pemikiran atau update terbarumu."}
            backUrl={toUrl(blogRoutes.index())}
            onSubmit={handleSubmit}
            isSaving={processing}
        >
            <Head title={isEditing ? "Edit Artikel" : "Tulis Artikel Baru"} />

            <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
                <button
                    type="button"
                    onClick={() => setActiveTab('id')}
                    className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'id' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    🇮🇩 Bahasa Indonesia
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('en')}
                    className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'en' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    🇬🇧 English
                </button>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Judul Artikel ({activeTab.toUpperCase()})</label>
                    <input
                        type="text"
                        required
                        value={data.title[activeTab]}
                        onChange={(e) => setData('title', { ...data.title, [activeTab]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Judul yang menarik..."
                    />
                    {errors[`title.${activeTab}`] && <p className="text-red-500 text-xs mt-1">{errors[`title.${activeTab}`]}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Ringkasan (Excerpt) ({activeTab.toUpperCase()})</label>
                    <textarea
                        rows={3}
                        value={data.excerpt[activeTab]}
                        onChange={(e) => setData('excerpt', { ...data.excerpt, [activeTab]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Ringkasan singkat artikel ini..."
                    />
                    {errors[`excerpt.${activeTab}`] && <p className="text-red-500 text-xs mt-1">{errors[`excerpt.${activeTab}`]}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Konten (Markdown/HTML) ({activeTab.toUpperCase()})</label>
                    <textarea
                        rows={10}
                        required
                        value={data.content[activeTab]}
                        onChange={(e) => setData('content', { ...data.content, [activeTab]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all font-mono text-sm text-foreground"
                        placeholder="Tulis konten artikel di sini..."
                    />
                    {errors[`content.${activeTab}`] && <p className="text-red-500 text-xs mt-1">{errors[`content.${activeTab}`]}</p>}
                </div>

                <div className="space-y-2">
                    <ImageUpload 
                        label="Gambar Sampul Artikel (WebP, Max 3MB)"
                        value={data.featured_image || ""}
                        onChange={(val) => setData('featured_image', val)}
                        folder="assets/blogs"
                    />
                    {errors.featured_image && <p className="text-red-500 text-xs mt-1">{errors.featured_image}</p>}
                </div>

                <div className="flex items-center gap-3 pt-4">
                    <input
                        type="checkbox"
                        id="is_published"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="is_published" className="text-sm font-bold text-gray-700 dark:text-gray-300">Publikasikan Sekarang</label>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold mb-4">SEO Settings ({activeTab.toUpperCase()})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Meta Title</label>
                            <input
                                type="text"
                                value={data.meta_title[activeTab]}
                                onChange={(e) => setData('meta_title', { ...data.meta_title, [activeTab]: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Meta Keywords</label>
                            <input
                                type="text"
                                value={data.meta_keywords[activeTab]}
                                onChange={(e) => setData('meta_keywords', { ...data.meta_keywords, [activeTab]: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                                placeholder="keyword1, keyword2..."
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Meta Description</label>
                            <textarea
                                rows={2}
                                value={data.meta_description[activeTab]}
                                onChange={(e) => setData('meta_description', { ...data.meta_description, [activeTab]: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 outline-none focus:border-blue-600 transition-all text-foreground"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminFormLayout>
    );
}
