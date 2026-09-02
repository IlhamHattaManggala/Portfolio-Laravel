import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumePath: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, resumePath }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        {/* Backdrop click to close */}
        <div 
          className="absolute inset-0" 
          onClick={onClose} 
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl h-[85vh] bg-[#0d0d0d] border border-white/10 rounded-3xl flex flex-col shadow-2xl overflow-hidden z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <FileText size={18} />
              </div>
              <div>
                <h3 id="resume-modal-title" className="text-base font-bold text-white leading-tight">
                  {t("resume.modal_title", "Curriculum Vitae — Ilham Hatta Manggala")}
                </h3>
                <p className="text-xs text-gray-400">
                  {t("resume.modal_subtitle", "Preview & Download PDF Document")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={resumePath}
                download
                aria-label={t("resume.download_cv", "Download CV PDF")}
                className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("resume.open_new_tab", "Open CV PDF in new tab")}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={16} />
              </a>

              <button
                onClick={onClose}
                aria-label={t("common.close", "Close modal")}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Content - Iframe PDF Viewer */}
          <div className="flex-1 bg-black/40 relative">
            <iframe
              src={`${resumePath}#toolbar=1`}
              className="w-full h-full border-0"
              title="Curriculum Vitae PDF Preview"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
