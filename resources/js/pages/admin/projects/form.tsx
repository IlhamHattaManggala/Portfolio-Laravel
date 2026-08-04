import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminFormLayout from "@/components/admin/AdminFormLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { TProject } from "@/types";
import projectRoutes from '@/routes/admin/projects';
import { toUrl } from '@/lib/utils';

interface FormProps {
    project?: TProject;
}

export default function ProjectForm({ project }: FormProps) {
    const isEditing = !!project;
    
    const { data, setData, post, put, processing, errors } = useForm({
        name: typeof project?.name === 'object' && project?.name ? project.name : { id: project?.name || "", en: project?.name || "" },
        descriptions: typeof project?.descriptions === 'object' && project?.descriptions ? project.descriptions : { id: project?.descriptions || "", en: project?.descriptions || "" },
        tipe: typeof project?.tipe === 'object' && project?.tipe ? project.tipe : { id: project?.tipe || "Website", en: project?.tipe || "Website" },
        library: project?.library || [],
        image: project?.image || "",
        link: project?.link || "",
        video: project?.video || ""
    });

    const [libInput, setLibInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(toUrl(projectRoutes.update(project.id!)));
        } else {
            post(toUrl(projectRoutes.store()));
        }
    };

    const addLib = () => {
        if (libInput.trim()) {
            setData('library', [...data.library, libInput.trim()]);
            setLibInput("");
        }
    };

    const removeLib = (index: number) => {
        setData('library', data.library.filter((_, i) => i !== index));
    };

    return (
        <AdminFormLayout
            title={isEditing ? "Edit Proyek" : "Proyek Baru"}
            subtitle={isEditing ? "Perbarui informasi karya kamu." : "Tambahkan karya hebatmu yang baru."}
            backUrl={toUrl(projectRoutes.index())}
            onSubmit={handleSubmit}
            isSaving={processing}
        >
            <Head title={isEditing ? "Edit Proyek" : "Proyek Baru"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Nama Proyek (Indonesia) <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">ID</span></label>
                    <input
                        type="text"
                        required
                        value={data.name.id}
                        onChange={(e) => setData('name', { ...data.name, id: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Website Portofolio"
                    />
                    {errors['name.id'] && <p className="text-red-500 text-xs mt-1">{errors['name.id']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Nama Proyek (English) <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">EN</span></label>
                    <input
                        type="text"
                        required
                        value={data.name.en}
                        onChange={(e) => setData('name', { ...data.name, en: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Portfolio Website"
                    />
                    {errors['name.en'] && <p className="text-red-500 text-xs mt-1">{errors['name.en']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Tipe Proyek (ID)</label>
                    <select
                        value={data.tipe.id}
                        onChange={(e) => setData('tipe', { ...data.tipe, id: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                    >
                        <option value="Website">Website</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Game">Game</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Design">Design</option>
                    </select>
                    {errors['tipe.id'] && <p className="text-red-500 text-xs mt-1">{errors['tipe.id']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Tipe Proyek (EN)</label>
                    <select
                        value={data.tipe.en}
                        onChange={(e) => setData('tipe', { ...data.tipe, en: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                    >
                        <option value="Website">Website</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Game">Game</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Design">Design</option>
                    </select>
                    {errors['tipe.en'] && <p className="text-red-500 text-xs mt-1">{errors['tipe.en']}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Deskripsi (Indonesia) <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">ID</span></label>
                    <textarea
                        required
                        rows={4}
                        value={data.descriptions.id}
                        onChange={(e) => setData('descriptions', { ...data.descriptions, id: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Jelaskan tentang proyek ini dalam Bahasa Indonesia..."
                    />
                    {errors['descriptions.id'] && <p className="text-red-500 text-xs mt-1">{errors['descriptions.id']}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Deskripsi (English) <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">EN</span></label>
                    <textarea
                        required
                        rows={4}
                        value={data.descriptions.en}
                        onChange={(e) => setData('descriptions', { ...data.descriptions, en: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Explain about this project in English..."
                    />
                    {errors['descriptions.en'] && <p className="text-red-500 text-xs mt-1">{errors['descriptions.en']}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Tech Stack (Library)</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={libInput}
                            onChange={(e) => setLibInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLib())}
                            className="flex-grow px-4 py-2 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                            placeholder="Tambah tech stack (misal: React, Tailwind)"
                        />
                        <button
                            type="button"
                            onClick={addLib}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                        >
                            Tambah
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.library.map((lib, idx) => (
                            <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold border border-blue-100 dark:border-blue-800/50">
                                {lib}
                                <button type="button" onClick={() => removeLib(idx)} className="hover:text-red-500 transition-colors">×</button>
                            </span>
                        ))}
                    </div>
                    {errors.library && <p className="text-red-500 text-xs mt-1">{errors.library}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                    <ImageUpload 
                        label="Gambar Proyek"
                        value={data.image || ""}
                        onChange={(val) => setData('image', val)}
                        folder="projects"
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Link Demo/Repo</label>
                    <input
                        type="text"
                        value={data.link || ""}
                        onChange={(e) => setData('link', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="https://..."
                    />
                    {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Video Demo (Opsional)</label>
                    <input
                        type="text"
                        value={data.video || ""}
                        onChange={(e) => setData('video', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="https://youtube.com/..."
                    />
                    {errors.video && <p className="text-red-500 text-xs mt-1">{errors.video}</p>}
                </div>
            </div>
        </AdminFormLayout>
    );
}
