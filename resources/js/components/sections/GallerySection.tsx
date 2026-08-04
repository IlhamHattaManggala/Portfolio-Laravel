
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/Image";
import Pagination from "../Pagination";
import { TCertificate } from "@/types";
import { X, Award, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

interface GallerySectionProps {
  certificates: TCertificate[];
}

const ITEMS_PER_PAGE = 6;

const GallerySection = ({ certificates: initialCertificates }: GallerySectionProps) => {
    const { t, i18n } = useTranslation();
    const displayCertificates = initialCertificates;
  
  const getLocalized = (field: any) => {
    if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
      const currentLang = i18n.language?.startsWith('id') ? 'id' : 'en';
      return field[currentLang] || field['id'] || '';
    }
    return field || '';
  };
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCert, setSelectedCert] = useState<TCertificate | null>(null);
  
  const totalPages = Math.ceil(displayCertificates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCertificates = displayCertificates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="py-32 relative overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium mb-6 text-gray-300"
          >
            <Award size={14} className="text-primary" />
            <span>{t('gallery.tag')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            {t('gallery.title_1')} <span className="text-gray-500">{t('gallery.title_2')}</span>
          </motion.h2>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedCertificates.map((cert, i) => (
                <motion.div
                  key={cert.id || i}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10"
                >
                  <div className="relative h-64 overflow-hidden p-6 flex items-center justify-center bg-black/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50 z-10"></div>
                    <Image
                      src={cert.image}
                      alt={getLocalized(cert.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-8 filter brightness-90 group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm z-20">
                      <button 
                        onClick={() => setSelectedCert(cert)}
                        className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110"
                      >
                        <Eye size={24} />
                      </button>
                    </div>
                  </div>
                  <div className="p-8 relative z-30 bg-gradient-to-b from-transparent to-[#0a0a0a]">
                    <div className="mb-3 text-primary text-xs font-semibold tracking-wide uppercase">{getLocalized(cert.issuer)}</div>
                    <h3 className="font-bold text-xl mb-2 text-white line-clamp-2 tracking-tight group-hover:text-primary transition-colors">{getLocalized(cert.title)}</h3>
                    <p className="text-gray-500 text-sm">{cert.date_issued}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl cursor-default flex flex-col lg:flex-row"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="relative w-full lg:w-[60%] h-[40vh] lg:h-[70vh] bg-black/50 p-8 flex items-center justify-center">
                <Image
                  src={selectedCert.image}
                  alt={getLocalized(selectedCert.title)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-4 md:p-8"
                />

              </div>
              <div className="p-8 md:p-12 lg:w-[40%] flex flex-col justify-center bg-gradient-to-b from-white/[0.02] to-transparent border-t lg:border-t-0 lg:border-l border-white/5">
                <span className="px-4 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-full w-fit mb-6 uppercase tracking-wider">
                  {getLocalized(selectedCert.issuer)}
                </span>
                <h2 className="text-3xl font-bold mb-6 tracking-tight text-white leading-tight">
                  {getLocalized(selectedCert.title)}
                </h2>
                <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                  <p>{t('gallery.official_cert')} <strong className="text-white">{getLocalized(selectedCert.issuer)}</strong>.</p>
                  <p>{t('gallery.obtained_on')} <strong className="text-white">{selectedCert.date_issued}</strong>{t('gallery.validation')}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="mt-10 w-full py-4 bg-white text-black font-semibold rounded-full hover:scale-[1.02] transition-transform"
                >
                  {t('gallery.close_view')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
