
import { motion } from "framer-motion";
import Image from "@/components/Image";
import { TTechnology, TProject } from "@/types";

import { Code2, Globe, Sparkles, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AboutSectionProps {
  technologies: TTechnology[];
  projects: TProject[];
}


const AboutSection = ({ technologies: initialTech, projects: initialProjects }: AboutSectionProps) => {
  const { t } = useTranslation();
  const displayTech = initialTech;
  const projectCount = initialProjects.length;



  return (
    <section className="py-32 relative overflow-hidden" id="about">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-12">
          
          <div className="text-center md:text-left mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4"
            >
              {t('about.title_1')} <span className="text-gray-500">{t('about.title_2')}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-400 max-w-2xl"
            >
              {t('about.subtitle')}
            </motion.p>
          </div>

          {/* Premium Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            
            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-4 lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">{t('about.vision_title')}</h3>
              </div>
              
              <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                <p>
                  {t('about.vision_desc_1_start')}<span className="text-white font-medium">{t('about.vision_desc_1_highlight')}</span>{t('about.vision_desc_1_end')}
                </p>

                <p>
                  {t('about.vision_desc_2_start')}<span className="text-primary font-medium">{t('about.vision_desc_2_highlight')}</span>{t('about.vision_desc_2_end')}
                </p>
              </div>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.03] mix-blend-overlay"></div>

              <h4 className="text-7xl font-bold text-white mb-2 tracking-tighter">2+</h4>
              <p className="text-primary font-medium text-sm" dangerouslySetInnerHTML={{ __html: t('about.years_exp').replace(' ', '<br/>') }}></p>
            </motion.div>

            {/* Tech Stack Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-4 lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">{t('about.core_tech')}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {displayTech.map((tech) => (
                  <div 
                    key={tech.name}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-full border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 group cursor-default"
                  >
                    <div className="relative w-4 h-4 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                      <Image src={tech.icon} alt={tech.name} fill sizes="16px" className="object-contain" />

                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Projects Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-1 bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6 text-gray-300" />
              </div>
              <h4 className="text-5xl font-bold text-white mb-2">{projectCount}+</h4>

              <p className="text-gray-500 font-medium text-sm" dangerouslySetInnerHTML={{ __html: t('about.projects_completed').replace(' ', '<br/>') }}></p>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/[0.04] transition-colors"
            >
              <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-white/10 transition-colors transform group-hover:rotate-12 duration-500">
                <Globe size={120} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  {t('about.remote')}
                </div>
                <div className="mt-8">
                  <h4 className="text-2xl font-bold text-white">Indonesia</h4>
                  <p className="text-gray-500 font-medium mt-1">{t('about.timezone')}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

