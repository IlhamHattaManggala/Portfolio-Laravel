
import { motion } from "framer-motion";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import { Link } from "@inertiajs/react";

interface AdminFormLayoutProps {
  title: string;
  subtitle?: string;
  backUrl: string;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isSaving?: boolean;
  children: React.ReactNode;
}

export default function AdminFormLayout({
  title,
  subtitle,
  backUrl,
  onSubmit,
  isLoading = false,
  isSaving = false,
  children
}: AdminFormLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link 
            href={backUrl}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2"
          >
            <ChevronLeft size={16} />
            Kembali
          </Link>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-[2.5rem] border border-border p-8 shadow-sm relative overflow-hidden"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {children}

          <div className="pt-6 border-t border-border flex justify-end">
            <button
              type="submit"
              disabled={isSaving || isLoading}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              {isSaving ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
