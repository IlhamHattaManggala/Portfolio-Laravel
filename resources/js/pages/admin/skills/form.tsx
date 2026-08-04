import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminFormLayout from "@/components/admin/AdminFormLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { TTechnology } from "@/types";
import skillRoutes from '@/routes/admin/skills';
import { toUrl } from '@/lib/utils';

interface FormProps {
    skill?: TTechnology;
}

export default function SkillForm({ skill }: FormProps) {
    const isEditing = !!skill;
    
    const { data, setData, post, put, processing, errors } = useForm({
        name: skill?.name || "",
        icon: skill?.icon || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(toUrl(skillRoutes.update(skill.id!)));
        } else {
            post(toUrl(skillRoutes.store()));
        }
    };

    return (
        <AdminFormLayout
            title={isEditing ? "Edit Skill" : "Skill Baru"}
            subtitle={isEditing ? "Perbarui informasi teknologi kamu." : "Tambahkan keahlian teknis baru kamu."}
            backUrl={toUrl(skillRoutes.index())}
            onSubmit={handleSubmit}
            isSaving={processing}
        >
            <Head title={isEditing ? "Edit Skill" : "Skill Baru"} />
            <div className="grid grid-cols-1 gap-6 max-w-xl">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Nama Skill / Teknologi</label>
                    <input
                        type="text"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: React.js"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <ImageUpload 
                        label="Icon (SVG/PNG)"
                        value={data.icon || ""}
                        onChange={(val) => setData('icon', val)}
                        folder="skills"
                    />
                    {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
                </div>
            </div>
        </AdminFormLayout>
    );
}
