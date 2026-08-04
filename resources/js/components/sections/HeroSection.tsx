
import { FaGithub } from "react-icons/fa";
import Terminal from "../Terminal";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-20"
      id="hero"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute w-[800px] h-[400px] bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-[150px] opacity-50"
        ></motion.div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.03]"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center mt-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium mb-8 text-gray-300 backdrop-blur-md">
            <Sparkles size={14} className="text-primary" />
            <span>{t('hero.available')}</span>
            <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
            <a href="#contact" className="text-white font-semibold flex items-center hover:text-primary transition-colors">
              {t('hero.hire_me')} <ChevronRight size={14} />
            </a>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] tracking-tighter mb-6 text-white">
            {t('hero.title_1')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
              {t('hero.title_2')}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            {t('hero.description')}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a
            href="#project"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            {t('hero.view_work')}
          </a>
          <a
            href="https://github.com/IlhamHattaManggala"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white/[0.03] border border-white/10 text-white hover:bg-white/10 rounded-full font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <FaGithub size={18} />
            GitHub
          </a>
        </motion.div>

        {/* Dashboard/Code Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 w-full relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50"></div>
          <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl">
            {/* Window Header */}
            <div className="flex items-center px-4 py-3 bg-white/[0.02] border-b border-white/5">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="mx-auto text-xs text-gray-500 font-medium">portfolio_v2.exe</div>
            </div>
            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-5 bg-gradient-to-br from-white/[0.02] to-transparent">
               {/* Profile Info */}
               <div className="lg:col-span-2 p-8 md:p-10 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 border-b lg:border-b-0 lg:border-r border-white/5">
                  <div className="w-28 h-28 md:w-32 md:h-32 relative rounded-full overflow-hidden border-4 border-white/10 shrink-0">
                     <Image src="/images/profile.webp" alt="Ilham Hatta" fill sizes="(max-width: 768px) 112px, 128px" className="object-cover" />

                  </div>
                  <div className="space-y-4">
                     <div className="text-lg font-medium text-gray-300 leading-relaxed italic">
                       {t('hero.quote')}
                     </div>
                     <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Web Developer</span>
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary"></div> Flutter Developer</span>
                     </div>
                  </div>
               </div>
               
               {/* Code Terminal */}
               <div className="lg:col-span-3 p-0 md:p-4 bg-black/20">
                  <Terminal />
               </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

