import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { 
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  FileText,
  Loader2,
  Upload,
  CheckCircle,
  ExternalLink,
  Search,
  Image as ImageIcon,
  User,
  Tag
} from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram 
} from "react-icons/fa";
import { motion } from "framer-motion";
import AppLayout from '@/layouts/app-layout';
import { toast } from 'sonner';

interface IndexProps {
    settings: Record<string, string>;
}

export default function Index({ settings }: IndexProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ogInputRef = useRef<HTMLInputElement>(null);
  
  const { data, setData, post, processing, errors } = useForm({
    updates: [
      { key: "contact_email", value: settings['contact_email'] || "" },
      { key: "contact_phone", value: settings['contact_phone'] || "" },
      { key: "location", value: settings['location'] || "" },
      { key: "github_url", value: settings['github_url'] || "" },
      { key: "linkedin_url", value: settings['linkedin_url'] || "" },
      { key: "instagram_url", value: settings['instagram_url'] || "" },
      { key: "resume_path", value: settings['resume_path'] || "" },
      { key: "meta_title", value: settings['meta_title'] || "Ilham Hatta Manggala | Portofolio & Personal Website" },
      { key: "meta_description", value: settings['meta_description'] || "Portofolio profesional Ilham Hatta Manggala - Full Stack Web & Mobile Developer. Temukan proyek unggulan, riwayat pengalaman kerja, sertifikasi, dan blog artikel teknologi terbaru." },
      { key: "meta_keywords", value: settings['meta_keywords'] || "Ilham Hatta Manggala, IHM, Portofolio Ilham Hatta Manggala, Full Stack Developer, Flutter Developer, Laravel Developer, Web Developer, Mobile Developer, Indonesia" },
      { key: "meta_author", value: settings['meta_author'] || "Ilham Hatta Manggala" },
      { key: "og_image", value: settings['og_image'] || "" },
    ]
  });

  const updateValue = (key: string, value: string) => {
    setData('updates', data.updates.map(u => u.key === key ? { ...u, value } : u));
  };

  const getValue = (key: string) => {
    return data.updates.find(u => u.key === key)?.value || "";
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.warning('Format Salah', {
          description: 'Hanya file PDF yang diperbolehkan.'
      });
      return;
    }

    // Batasi ukuran file (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.warning('File Terlalu Besar', {
          description: 'Ukuran file PDF maksimal adalah 5MB.'
      });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('/admin/settings/upload-resume', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        }
      });
      const result = await response.json();
      if (result.success) {
        updateValue("resume_path", result.path);
        toast.success('Berhasil!', {
            description: 'Resume berhasil diunggah.'
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Gagal!', {
          description: 'Terjadi kesalahan saat mengunggah.'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warning('Format Salah', {
          description: 'Hanya file gambar (JPG, PNG, WEBP, GIF) yang diperbolehkan.'
      });
      return;
    }

    const maxSize = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSize) {
      toast.warning('File Terlalu Besar', {
          description: 'Ukuran file gambar maksimal adalah 3MB.'
      });
      return;
    }

    setUploadingOg(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('/admin/settings/upload-og-image', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        }
      });
      const result = await response.json();
      if (result.success) {
        updateValue("og_image", result.path);
        toast.success('Berhasil!', {
            description: 'Gambar Open Graph berhasil diunggah.'
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Gagal!', {
          description: 'Terjadi kesalahan saat mengunggah gambar.'
      });
    } finally {
      setUploadingOg(false);
    }
  };

  const handleBulkSave = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/settings', {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil!', {
            description: 'Semua pengaturan berhasil disimpan.'
          });
        }
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Pengaturan', href: '/admin/settings' }]}>
      <Head title="Pengaturan Situs" />
      <div className="space-y-8 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Pengaturan <span className="text-blue-600">Situs</span></h1>
            <p className="text-gray-600 dark:text-gray-400">Konfigurasi informasi umum, media sosial, dan SEO meta tags kamu.</p>
          </div>
          <button 
            onClick={handleBulkSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
            disabled={processing}
          >
            {processing ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            Simpan Perubahan
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-[2.5rem] border border-border p-10 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all"
          >
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shadow-inner">
                <Globe size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black">Informasi Umum</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Website Identity</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Kontak</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input 
                    type="email" 
                    value={getValue('contact_email')}
                    onChange={(e) => updateValue('contact_email', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={getValue('contact_phone')}
                    onChange={(e) => updateValue('contact_phone', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Lokasi</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={getValue('location')}
                    onChange={(e) => updateValue('location', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Curriculum Vitae (PDF)</label>
                <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-800/30 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all flex flex-col items-center justify-center text-center gap-4">
                  {getValue('resume_path') ? (
                    <div className="flex flex-col items-center gap-2 w-full">
                      <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 text-green-600 rounded-xl border border-green-500/20 w-full justify-center">
                        <CheckCircle size={18} />
                        <span className="text-sm font-bold truncate max-w-[200px]">
                          {getValue('resume_path').split('/').pop()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 w-full">
                        <a 
                          href={getValue('resume_path')} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-bold text-sm transition-all"
                        >
                          <ExternalLink size={16} />
                          Lihat PDF
                        </a>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl font-bold text-sm transition-all"
                        >
                          <Upload size={16} />
                          Ganti File
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-2">
                        <FileText size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white">Belum ada file diunggah</p>
                        <p className="text-xs text-gray-500">Klik tombol di bawah untuk mengunggah CV Anda dalam format PDF.</p>
                      </div>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                      >
                        {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                        {uploading ? "Mengunggah..." : "Unggah Resume"}
                      </button>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept=".pdf"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-[2.5rem] border border-border p-10 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all"
          >
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center shadow-inner">
                <FaGithub size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black">Media Sosial</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Connect with you</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">GitHub URL</label>
                <div className="relative group">
                  <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={getValue('github_url')}
                    onChange={(e) => updateValue('github_url', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-purple-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">LinkedIn URL</label>
                <div className="relative group">
                  <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={getValue('linkedin_url')}
                    onChange={(e) => updateValue('linkedin_url', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Instagram URL</label>
                <div className="relative group">
                  <FaInstagram className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={getValue('instagram_url')}
                    onChange={(e) => updateValue('instagram_url', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-pink-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* SEO & Meta Tags (Full Width / Span 2 Columns on Large Screens) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-card rounded-[2.5rem] border border-border p-10 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
          >
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shadow-inner">
                <Search size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black">Pengaturan SEO & Meta Tags</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Search Engine & Social Media Optimization</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Meta Title */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Meta Title</label>
                  <span className="text-xs font-semibold text-gray-400">{getValue('meta_title').length} karakter</span>
                </div>
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={getValue('meta_title')}
                    onChange={(e) => updateValue('meta_title', e.target.value)}
                    placeholder="Ilham Hatta Manggala | Portofolio & Personal Website"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-emerald-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Meta Author */}
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Meta Author</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={getValue('meta_author')}
                    onChange={(e) => updateValue('meta_author', e.target.value)}
                    placeholder="Ilham Hatta Manggala"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-emerald-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Meta Keywords */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Meta Keywords (Pisahkan dengan koma)</label>
                <div className="relative group">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={getValue('meta_keywords')}
                    onChange={(e) => updateValue('meta_keywords', e.target.value)}
                    placeholder="Ilham Hatta Manggala, Full Stack Developer, Laravel, React, Flutter"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-emerald-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Meta Description */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Meta Description</label>
                  <span className="text-xs font-semibold text-gray-400">{getValue('meta_description').length} / 160 rekomendasi</span>
                </div>
                <textarea 
                  rows={3}
                  value={getValue('meta_description')}
                  onChange={(e) => updateValue('meta_description', e.target.value)}
                  placeholder="Portofolio profesional Ilham Hatta Manggala - Full Stack Web & Mobile Developer..."
                  className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800/50 border-2 border-gray-100 dark:border-transparent focus:border-emerald-600 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all font-medium shadow-sm resize-none"
                />
              </div>

              {/* Open Graph Image */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Gambar Open Graph / Social Sharing (OG Image)</label>
                <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-800/30 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 transition-all flex flex-col md:flex-row items-center justify-between gap-6">
                  {getValue('og_image') ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                      <div className="w-32 h-20 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative border border-border flex-shrink-0">
                        <img 
                          src={getValue('og_image')} 
                          alt="Open Graph Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-grow">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                          <CheckCircle size={16} />
                          Gambar Open Graph Aktif
                        </div>
                        <p className="text-xs text-gray-400 truncate max-w-[280px]">
                          {getValue('og_image')}
                        </p>
                      </div>
                      <button 
                        onClick={() => ogInputRef.current?.click()}
                        disabled={uploadingOg}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all text-sm flex-shrink-0"
                      >
                        {uploadingOg ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        Ganti Gambar
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center">
                          <ImageIcon size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">Unggah Gambar Preview Sosial Media</p>
                          <p className="text-xs text-gray-500">Rekomendasi rasio 1200 x 630 px (Format: JPG, PNG, WEBP max 3MB)</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => ogInputRef.current?.click()}
                        disabled={uploadingOg}
                        className="mt-2 flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50"
                      >
                        {uploadingOg ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                        {uploadingOg ? "Mengunggah..." : "Unggah OG Image"}
                      </button>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={ogInputRef} 
                    onChange={handleOgImageUpload} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

