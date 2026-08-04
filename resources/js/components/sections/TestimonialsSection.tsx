import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/Image";
import { TTestimonial } from "@/types";
import { Quote, Star, Plus, X, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TestimonialsSectionProps {
  testimonials: TTestimonial[];
}

const TestimonialsSection = ({ testimonials: initialTestimonials }: TestimonialsSectionProps) => {
    const { t, i18n } = useTranslation();
    const displayTestimonials = initialTestimonials;
    
    const getLocalized = (field: any) => {
      if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
        const currentLang = i18n.language?.startsWith('id') ? 'id' : 'en';
        return field[currentLang] || field['id'] || '';
      }
      return field || '';
    };
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
      name: "",
      company: "",
      designation: "",
      testimonial: "",
      image: null as File | null
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState("loading");

      try {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("company", formData.company);
        formDataObj.append("designation", formData.designation);
        formDataObj.append("testimonial", formData.testimonial);
        if (formData.image) {
            formDataObj.append("image", formData.image);
        }

        const res = await fetch("/testimonials", {
          method: "POST",
          headers: { 
            "Accept": "application/json",
            "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ""
          },
          body: formDataObj,
        });

        if (res.ok) {
          setFormState("success");
          setFormData({ name: "", company: "", designation: "", testimonial: "", image: null });
          setTimeout(() => {
            setFormState("idle");
            setIsModalOpen(false);
          }, 3000);
        } else {
          setFormState("error");
        }
      } catch {
        setFormState("error");
      }
    };

  return (
    <section className="py-32 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium mb-6 text-gray-300"
          >
            <Star size={14} className="text-primary" />
            <span>{t('testimonials.tag')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8"
          >
            {t('testimonials.title_1')} <span className="text-gray-500">{t('testimonials.title_2')}</span>
          </motion.h2>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-xl font-semibold transition-all"
          >
            <Plus size={18} />
            <span>{t('testimonials.write_btn')}</span>
          </motion.button>
        </div>

        {displayTestimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white/[0.02] border border-white/5 max-w-md mx-auto relative group hover:bg-white/[0.04] transition-all duration-300"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative z-10 flex flex-col items-center">
              <Quote className="w-12 h-12 text-white/10 group-hover:text-primary/20 transition-all duration-300 mb-6 rotate-180" />
              <p className="text-gray-300 text-lg font-bold mb-2">{t('testimonials.no_testimonials')}</p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{t('testimonials.be_first')}</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTestimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-all duration-300 relative group"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-primary/10 transition-colors rotate-180" />
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-white/10">
                    <Image 
                      src={testimonial.image || "/assets/placeholder.png"} 
                      alt={testimonial.name} 
                      fill 
                      sizes="56px"
                      className="object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{getLocalized(testimonial.designation)} di {getLocalized(testimonial.company)}</p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <p className="text-gray-400 text-base leading-relaxed">
                    &quot;{getLocalized(testimonial.testimonial)}&quot;
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className="fill-yellow-500/80 text-yellow-500/80" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-white/10 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{t('testimonials.modal_title')}</h3>
                <p className="text-gray-400 text-sm">{t('testimonials.modal_subtitle')}</p>
              </div>

              {formState === "success" ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 size={48} className="text-green-500 mb-4" />
                  <p className="text-green-500 font-medium">{t('testimonials.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">{t('testimonials.name_lbl')}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder={t('testimonials.name_pl')}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-white placeholder-gray-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">{t('testimonials.company_lbl')}</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder={t('testimonials.company_pl')}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-white placeholder-gray-600 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">{t('testimonials.role_lbl')}</label>
                      <input
                        type="text"
                        required
                        value={formData.designation}
                        onChange={(e) => setFormData({...formData, designation: e.target.value})}
                        placeholder={t('testimonials.role_pl')}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-white placeholder-gray-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">{t('testimonials.profile_lbl')}</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setFormData({...formData, image: e.target.files[0]})
                          }
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('testimonials.msg_lbl')}</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.testimonial}
                      onChange={(e) => setFormData({...formData, testimonial: e.target.value})}
                      placeholder={t('testimonials.msg_pl')}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-white placeholder-gray-600 resize-none transition-colors"
                    ></textarea>
                  </div>
                  
                  {formState === "error" && (
                    <div className="p-4 bg-red-500/10 text-red-500 rounded-xl flex items-center gap-3 text-sm">
                      <AlertCircle size={16} />
                      <span>{t('testimonials.error')}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formState === "loading" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        {t('testimonials.submitting')}
                      </>
                    ) : (
                      <>
                        <span>{t('testimonials.submit')}</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;
