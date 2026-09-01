
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../ProjectCard";
import Pagination from "../Pagination";
import { TProject } from "@/types";
import { LayoutGrid } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProjectSectionProps {
  projects: TProject[];
}

const ITEMS_PER_PAGE = 6;

const ProjectSection = ({ projects: initialProjects }: ProjectSectionProps) => {
    const { t, i18n } = useTranslation();
    const displayProjects = initialProjects;
  
  const getLocalized = (field: any) => {
    if (typeof field === 'object' && field !== null) {
      const currentLang = i18n.language?.startsWith('id') ? 'id' : 'en';
      return field[currentLang] || field['id'] || '';
    }
    return field || '';
  };

  const [filter, setFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  
  const categories = useMemo(() => 
    ["Semua", ...Array.from(new Set(displayProjects.map((p) => getLocalized(p.tipe))))],
    [displayProjects, i18n.language]
  );

  const filteredProjects = useMemo(() => 
    filter === "Semua" 
      ? displayProjects 
      : displayProjects.filter((p) => getLocalized(p.tipe) === filter),
    [displayProjects, filter, i18n.language]
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setCurrentPage(1);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="project">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium mb-6 text-gray-300"
          >
            <LayoutGrid size={14} className="text-primary" />
            <span>{t('project.tag')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            {t('project.title_1')} <span className="text-gray-500">{t('project.title_2')}</span>
          </motion.h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                filter === cat
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              {cat === "Semua" ? t('project.filter_all') : cat}
            </button>
          ))}
        </div>

        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter + currentPage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {paginatedProjects.map((project) => (
                <ProjectCard key={project.id || getLocalized(project.name)} project={project} />
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
              document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;

