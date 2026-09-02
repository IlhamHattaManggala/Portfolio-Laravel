import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminFormLayout from "@/components/admin/AdminFormLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { TExperience } from "@/types";
import experienceRoutes from '@/routes/admin/experience';
import { toUrl } from '@/lib/utils';

interface FormProps {
    experience?: TExperience;
}

export default function ExperienceForm({ experience }: FormProps) {
    const isEditing = !!experience;
    
    const { data, setData, post, put, processing, errors } = useForm({
        title: typeof experience?.title === 'object' && experience?.title ? experience.title : { id: experience?.title || "", en: experience?.title || "" },
        company_name: typeof experience?.company_name === 'object' && experience?.company_name ? experience.company_name : { id: experience?.company_name || "", en: experience?.company_name || "" },
        icon: experience?.icon || "",
        icon_bg: experience?.icon_bg || "#f3f4f6",
        date_range: typeof experience?.date_range === 'object' && experience?.date_range ? experience.date_range : { id: experience?.date_range || "", en: experience?.date_range || "" },
        points: !Array.isArray(experience?.points) && experience?.points?.id ? experience.points : { id: experience?.points || [], en: experience?.points || [] },
    });

    const [pointInputId, setPointInputId] = useState("");
    const [pointInputEn, setPointInputEn] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(toUrl(experienceRoutes.update(experience.id!)));
        } else {
            post(toUrl(experienceRoutes.store()));
        }
    };

    const addPoint = () => {
        if (pointInputId.trim() || pointInputEn.trim()) {
            setData('points', {
                id: [...data.points.id, pointInputId.trim()],
                en: [...data.points.en, pointInputEn.trim()]
            });
            setPointInputId("");
            setPointInputEn("");
        }
    };

    const removePoint = (index: number) => {
        setData('points', {
            id: data.points.id.filter((_: any, i: number) => i !== index),
            en: data.points.en.filter((_: any, i: number) => i !== index)
        });
    };

    return (
        <AdminFormLayout
            title={isEditing ? "Edit Pengalaman" : "Pengalaman Baru"}
            subtitle={isEditing ? "Perbarui informasi riwayat karir kamu." : "Catat pencapaian baru dalam karir kamu."}
            backUrl={toUrl(experienceRoutes.index())}
            onSubmit={handleSubmit}
            isSaving={processing}
        >
            <Head title={isEditing ? "Edit Pengalaman" : "Pengalaman Baru"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Jabatan / Role (Indonesia) <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">ID</span></label>
                    <input
                        type="text"
                        required
                        value={data.title.id}
                        onChange={(e) => setData('title', { ...data.title, id: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Pengembang Web"
                    />
                    {errors['title.id'] && <p className="text-red-500 text-xs mt-1">{errors['title.id']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Jabatan / Role (English) <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">EN</span></label>
                    <input
                        type="text"
                        required
                        value={data.title.en}
                        onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Web Developer"
                    />
                    {errors['title.en'] && <p className="text-red-500 text-xs mt-1">{errors['title.en']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Nama Perusahaan (Indonesia) <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">ID</span></label>
                    <input
                        type="text"
                        required
                        value={data.company_name.id}
                        onChange={(e) => setData('company_name', { ...data.company_name, id: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Pemerintah Provinsi"
                    />
                    {errors['company_name.id'] && <p className="text-red-500 text-xs mt-1">{errors['company_name.id']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Nama Perusahaan (English) <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">EN</span></label>
                    <input
                        type="text"
                        required
                        value={data.company_name.en}
                        onChange={(e) => setData('company_name', { ...data.company_name, en: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Provincial Government"
                    />
                    {errors['company_name.en'] && <p className="text-red-500 text-xs mt-1">{errors['company_name.en']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Rentang Waktu (ID) <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">ID</span></label>
                    <input
                        type="text"
                        required
                        value={data.date_range.id}
                        onChange={(e) => setData('date_range', { ...data.date_range, id: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Jan 2022 - Sekarang"
                    />
                    {errors['date_range.id'] && <p className="text-red-500 text-xs mt-1">{errors['date_range.id']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Rentang Waktu (EN) <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">EN</span></label>
                    <input
                        type="text"
                        required
                        value={data.date_range.en}
                        onChange={(e) => setData('date_range', { ...data.date_range, en: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Jan 2022 - Present"
                    />
                    {errors['date_range.en'] && <p className="text-red-500 text-xs mt-1">{errors['date_range.en']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Warna Background Icon (HEX)</label>
                    <input
                        type="text"
                        value={data.icon_bg}
                        onChange={(e) => setData('icon_bg', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 outline-none focus:border-blue-600 transition-all"
                        placeholder="#ffffff"
                    />
                    {errors.icon_bg && <p className="text-red-500 text-xs mt-1">{errors.icon_bg}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                    <ImageUpload 
                        label="Logo Perusahaan / Icon"
                        value={data.icon || ""}
                        onChange={(val) => setData('icon', val)}
                        folder="assets/experience"
                    />
                    {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
                </div>
                <div className="space-y-4 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Poin Kontribusi / Tugas</label>
                    <div className="flex flex-col gap-2 mb-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={pointInputId}
                                onChange={(e) => setPointInputId(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPoint())}
                                className="flex-grow px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                                placeholder="Tugas (Indonesia) - Contoh: Membangun arsitektur microservices..."
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={pointInputEn}
                                onChange={(e) => setPointInputEn(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPoint())}
                                className="flex-grow px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                                placeholder="Tugas (English) - Example: Built microservices architecture..."
                            />
                            <button
                                type="button"
                                onClick={addPoint}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                            >
                                Tambah
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {data.points.id.map((point: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-card border border-border rounded-2xl group relative overflow-hidden">
                                <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</span>
                                <div className="flex-grow">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1"><span className="text-xs bg-red-100 text-red-700 px-1 rounded mr-1">ID</span> {point}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium"><span className="text-xs bg-blue-100 text-blue-700 px-1 rounded mr-1">EN</span> {data.points.en[idx]}</p>
                                </div>
                                <button type="button" onClick={() => removePoint(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">×</button>
                            </div>
                        ))}
                    </div>
                    {errors['points.id'] && <p className="text-red-500 text-xs mt-1">{errors['points.id']}</p>}
                </div>
            </div>
        </AdminFormLayout>
    );
}
