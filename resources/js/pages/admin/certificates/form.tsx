import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminFormLayout from "@/components/admin/AdminFormLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { TCertificate } from "@/types";
import certificateRoutes from '@/routes/admin/certificates';
import { toUrl } from '@/lib/utils';

interface FormProps {
    certificate?: TCertificate;
}

export default function CertificateForm({ certificate }: FormProps) {
    const isEditing = !!certificate;
    
    const { data, setData, post, put, processing, errors } = useForm({
        title: typeof certificate?.title === 'object' && certificate?.title ? certificate.title : { id: certificate?.title || "", en: certificate?.title || "" },
        issuer: typeof certificate?.issuer === 'object' && certificate?.issuer ? certificate.issuer : { id: certificate?.issuer || "", en: certificate?.issuer || "" },
        image: certificate?.image || "",
        date_issued: certificate?.date_issued || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(toUrl(certificateRoutes.update(certificate.id!)));
        } else {
            post(toUrl(certificateRoutes.store()));
        }
    };

    return (
        <AdminFormLayout
            title={isEditing ? "Edit Sertifikat" : "Sertifikat Baru"}
            subtitle={isEditing ? "Perbarui informasi pencapaian kamu." : "Tambahkan bukti keahlian baru kamu."}
            backUrl={toUrl(certificateRoutes.index())}
            onSubmit={handleSubmit}
            isSaving={processing}
        >
            <Head title={isEditing ? "Edit Sertifikat" : "Sertifikat Baru"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Nama Sertifikat (Indonesia) <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">ID</span></label>
                    <input
                        type="text"
                        required
                        value={data.title.id}
                        onChange={(e) => setData('title', { ...data.title, id: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Pengembang AWS Tersertifikasi"
                    />
                    {errors['title.id'] && <p className="text-red-500 text-xs mt-1">{errors['title.id']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Nama Sertifikat (English) <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">EN</span></label>
                    <input
                        type="text"
                        required
                        value={data.title.en}
                        onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: AWS Certified Developer"
                    />
                    {errors['title.en'] && <p className="text-red-500 text-xs mt-1">{errors['title.en']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Penerbit / Issuer (Indonesia) <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">ID</span></label>
                    <input
                        type="text"
                        required
                        value={data.issuer.id}
                        onChange={(e) => setData('issuer', { ...data.issuer, id: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Amazon Web Services"
                    />
                    {errors['issuer.id'] && <p className="text-red-500 text-xs mt-1">{errors['issuer.id']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">Penerbit / Issuer (English) <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">EN</span></label>
                    <input
                        type="text"
                        required
                        value={data.issuer.en}
                        onChange={(e) => setData('issuer', { ...data.issuer, en: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border outline-none focus:border-blue-600 transition-all text-foreground"
                        placeholder="Contoh: Amazon Web Services"
                    />
                    {errors['issuer.en'] && <p className="text-red-500 text-xs mt-1">{errors['issuer.en']}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Tanggal Terbit / Perolehan</label>
                    <input
                        type="text"
                        required
                        value={data.date_issued}
                        onChange={(e) => setData('date_issued', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 outline-none focus:border-blue-600 transition-all"
                        placeholder="Contoh: 15 Mar 2024"
                    />
                    {errors.date_issued && <p className="text-red-500 text-xs mt-1">{errors.date_issued}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                    <ImageUpload 
                        label="Gambar Sertifikat (WebP, Max 3MB)"
                        value={data.image || ""}
                        onChange={(val) => setData('image', val)}
                        folder="assets/certificates"
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                </div>
            </div>
        </AdminFormLayout>
    );
}
