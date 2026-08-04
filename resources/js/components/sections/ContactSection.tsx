import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";


interface ContactSectionProps {
  contactEmail: string;
  location: string;
}

const ContactSection = ({ contactEmail, location: contactLocation }: ContactSectionProps) => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ""
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Contact Info - Terminal Style */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 text-primary font-mono text-sm mb-4">
                <span className="text-secondary">$</span>
                <span>system.get_contact_info()</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tight">

                {t('contact.title_1')} <br />
                <span className="text-gradient">{t('contact.title_2')}</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-md">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: "Email", value: contactEmail, icon: Mail },
                { label: "Location", value: contactLocation, icon: MapPin },
                { label: "Availability", value: "Open for Projects", icon: MessageSquare }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{item.label}</p>
                    <p className="font-bold text-base md:text-lg break-all">{item.value}</p>

                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: CLI Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500/50"></div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Terminal size={14} />
                  <span className="text-[11px] font-mono tracking-wider">~/contact/send_message.sh</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-primary uppercase tracking-widest ml-1">visitor_name=&quot;<span className="animate-pulse">_</span>&quot;</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-mono text-sm">❯</span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.placeholder_name')}
                      className="w-full pl-10 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 transition-all font-mono text-sm text-white placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-primary uppercase tracking-widest ml-1">visitor_email=&quot;<span className="animate-pulse">_</span>&quot;</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-mono text-sm">❯</span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.placeholder_email')}
                      className="w-full pl-10 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 transition-all font-mono text-sm text-white placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-primary uppercase tracking-widest ml-1">payload_content=&quot;<span className="animate-pulse">_</span>&quot;</label>
                  <div className="relative">
                    <span className="absolute left-4 top-6 -translate-y-1/2 text-secondary font-mono text-sm">❯</span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.placeholder_message')}
                      className="w-full pl-10 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 transition-all font-mono text-sm text-white placeholder-gray-600 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full group relative flex items-center justify-center gap-3 py-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl font-mono font-bold overflow-hidden transition-all disabled:opacity-50"
              >
                {formState === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    {t('contact.executing')}
                  </>
                ) : (
                  <>
                    <span>./EXECUTE_SEND</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {formState === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-green-500/10 text-green-500 rounded-2xl flex items-center gap-4 border border-green-500/20"
                  >
                    <CheckCircle2 size={24} />
                    <span className="font-bold">{t('contact.success')}</span>
                  </motion.div>
                )}

                {formState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-red-500/10 text-red-500 rounded-2xl flex items-center gap-4 border border-red-500/20"
                  >
                    <AlertCircle size={24} />
                    <span className="font-bold">{t('contact.error')}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

