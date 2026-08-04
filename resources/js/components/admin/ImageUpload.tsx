
import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

import Image from "@/components/Image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  folder: string;
  label?: string;
}

export default function ImageUpload({ value, onChange, folder, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Batasi ukuran file (misal 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast.error("Ukuran gambar terlalu besar. Maksimal 2MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onChange(data.path);
        toast.success("Gambar berhasil diunggah");
      } else {
        toast.error("Gagal mengunggah gambar: " + data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengunggah");
    } finally {

      setIsUploading(false);
    }
  };

  const removeImage = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>}
      
      <div 
        className={`relative group rounded-2xl border-2 border-dashed transition-all overflow-hidden ${
          value 
            ? "border-blue-500/50 bg-blue-50/10" 
            : "border-border hover:border-blue-500/50 hover:bg-blue-50/5"
        }`}
      >
        {value ? (
          <div className="relative aspect-video w-full group">
            <Image 
              src={value} 
              alt="Uploaded" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all shadow-lg"
              >
                <Upload size={20} />
              </button>
              <button
                type="button"
                onClick={removeImage}
                className="p-2 bg-white text-red-600 rounded-xl hover:bg-red-50 transition-all shadow-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full py-12 flex flex-col items-center justify-center gap-3 transition-all"
          >
            {isUploading ? (
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 transition-all">
                <ImageIcon size={28} />
              </div>
            )}
            <div className="space-y-1">
              <p className="font-bold text-foreground">
                {isUploading ? "Mengunggah..." : "Pilih Gambar"}
              </p>
              <p className="text-xs text-gray-500">Klik untuk memilih file gambar</p>
            </div>
          </button>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
          accept="image/*"
        />
      </div>

      {value && (
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl border border-border">
          <ImageIcon size={14} className="text-blue-600" />
          <span className="text-xs text-gray-500 truncate flex-grow font-mono">{value}</span>
        </div>
      )}
    </div>
  );
}
