
import { motion } from "framer-motion";
import { TExperience } from "@/types";
import Image from "@/components/Image";
import { Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ExperienceSectionProps {
  experiences: TExperience[];
}

const ExperienceSection = ({ experiences: initialExperiences }: ExperienceSectionProps) => {
  const { t, i18n } = useTranslation();
  const displayExperiences = initialExperiences;
  
  const getLocalized = (field: any) => {
    if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
      const currentLang = i18n.language?.startsWith('id') ? 'id' : 'en';
      return field[currentLang] || field['id'] || '';
    }
    return field || '';
  };
  
  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="experience">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium mb-6 text-gray-300"
          >
            <Briefcase size={14} className="text-primary" />
            <span>{t('experience.tag')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            {t('experience.title_1')} <span className="text-gray-500">{t('experience.title_2')}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayExperiences.map((exp, i) => (
            <motion.div
              key={exp.id || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Background Glow on Hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              <div className="relative h-full bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 flex flex-col">
                <div className="flex flex-col gap-6 flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0 rounded-2xl overflow-hidden p-2 sm:p-2.5 bg-white/5 border border-white/10 group-hover:border-primary/30 transition-colors">
                        <Image src={exp.icon} alt={getLocalized(exp.company_name)} fill sizes="56px" className="object-contain" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight">{getLocalized(exp.title)}</h3>
                        <p className="text-xs sm:text-sm font-medium text-gray-400 mt-0.5 sm:mt-1">{getLocalized(exp.company_name)}</p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary whitespace-nowrap">
                      {getLocalized(exp.date_range)}
                    </span>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <ul className="space-y-4">
                    {(Array.isArray(getLocalized(exp.points)) ? getLocalized(exp.points) : []).map((point: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-400 flex gap-3 leading-relaxed">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 group-hover:bg-primary transition-colors" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

