
import { motion } from "framer-motion";
import Image from "@/components/Image";
import { ExternalLink, Play } from "lucide-react";
import { TProject } from "@/types";
import { useTranslation } from "react-i18next";

const ProjectCard = ({ project }: { project: TProject }) => {
  const { i18n } = useTranslation();
  
  const getLocalized = (field: any) => {
    if (typeof field === 'object' && field !== null) {
      const currentLang = i18n.language?.startsWith('id') ? 'id' : 'en';
      return field[currentLang] || field['id'] || '';
    }
    return field || '';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:border-white/10"
    >
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={project.image || "/assets/placeholder.png"}
          alt={getLocalized(project.name)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"

        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
          <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${getLocalized(project.name)}`}
                className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <ExternalLink size={20} />
              </a>
            )}
            {project.video && (
              <a
                href={project.video}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch video preview of ${getLocalized(project.name)}`}
                className="w-12 h-12 flex items-center justify-center bg-white/[0.05] border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                <Play size={20} fill="currentColor" />
              </a>
            )}
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-white">
            {getLocalized(project.tipe)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors tracking-tight">
          {getLocalized(project.name)}
        </h3>
        
        <p className="text-white text-sm font-medium leading-relaxed line-clamp-2 mb-6">
          {getLocalized(project.descriptions)}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.library.slice(0, 4).map((lib) => (
            <span
              key={lib}
              className="text-xs font-semibold px-3 py-1.5 bg-white/10 border border-white/20 text-white rounded-full"
            >
              {lib}
            </span>
          ))}
          {project.library.length > 4 && (
             <span className="text-xs font-semibold px-3 py-1.5 bg-white/10 border border-white/20 text-white rounded-full">
               +{project.library.length - 4}
             </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

