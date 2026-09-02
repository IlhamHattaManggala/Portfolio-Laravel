import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";
import { Package, ExternalLink, Github, Download, Star, Check, Copy, Terminal, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TPackage } from "@/types";
import Pagination from "../Pagination";

interface PackagesSectionProps {
  packages?: TPackage[];
}

const ITEMS_PER_PAGE = 4;

const defaultPackages: TPackage[] = [
  {
    name: "manggala/laravel-dashboard-builder",
    description: "Production-ready open-source dashboard builder package for Laravel applications.",
    url: "https://packagist.org/packages/manggala/laravel-dashboard-builder",
    repository: "https://github.com/IlhamHattaManggala/laravel-dashboard-builder",
    downloads: 5,
    favers: 1,
  },
  {
    name: "manggala/laravel-manifest",
    description: "Production-ready, schema-driven, UI-agnostic configuration platform for Laravel applications.",
    url: "https://packagist.org/packages/manggala/laravel-manifest",
    repository: "https://github.com/IlhamHattaManggala/laravel-settings",
    downloads: 1,
    favers: 1,
  },
];

const PackagesSection = ({ packages = defaultPackages }: PackagesSectionProps) => {
  const { t } = useTranslation();
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<'all' | 'composer' | 'npm'>('all');

  const displayPackages = packages && packages.length > 0 ? packages : defaultPackages;

  const filteredPackages = displayPackages.filter((pkg) => {
    const isNpm = pkg.type === 'npm' || pkg.name.startsWith('@');
    if (activeFilter === 'composer') return !isNpm;
    if (activeFilter === 'npm') return isNpm;
    return true;
  });

  const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPackages = filteredPackages.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCopy = (packageName: string, isNpm: boolean) => {
    const command = isNpm ? `npm i ${packageName}` : `composer require ${packageName}`;
    navigator.clipboard.writeText(command);
    setCopiedName(packageName);
    setTimeout(() => setCopiedName(null), 2000);
  };

  const handleFilterChange = (filter: 'all' | 'composer' | 'npm') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="packages">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium mb-6 text-gray-300"
          >
            <Package size={14} className="text-primary" />
            <span>{t("packages.tag", "Open Source Packages")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            {t("packages.title_1", "Open Source")} <span className="text-gray-500">{t("packages.title_2", "Packages.")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-base mb-8"
          >
            {t("packages.subtitle", "Reusable open-source PHP/Laravel & NPM JavaScript packages published for developers.")}
          </motion.p>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { id: 'all', label: t("packages.filter_all", "Semua Package") },
              { id: 'composer', label: "PHP / Laravel" },
              { id: 'npm', label: "NPM / React" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id as 'all' | 'composer' | 'npm')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                  activeFilter === tab.id
                    ? "bg-white text-black border-white shadow-lg"
                    : "bg-white/5 text-white hover:bg-white/10 border-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${currentPage}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {paginatedPackages.map((pkg, index) => {
                const isNpm = pkg.type === 'npm' || pkg.name.startsWith('@');
                const installCmd = isNpm ? `npm i ${pkg.name}` : `composer require ${pkg.name}`;
                const isCopied = copiedName === pkg.name;

                return (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-[#0D0D0D] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl"
                  >
                    {/* Ambient Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />

                    <div>
                      {/* Top Metadata & Stats */}
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-semibold ${
                          isNpm 
                            ? "bg-red-500/10 border-red-500/20 text-red-400"
                            : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                        }`}>
                          <Package size={12} className={isNpm ? "text-red-400" : "text-blue-400"} />
                          <span>{isNpm ? "NPM Registry" : "Packagist"}</span>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                          <div className="flex items-center gap-1.5" title="Total Downloads">
                            <Download size={14} className="text-gray-500" />
                            <span>{pkg.downloads ?? 0}</span>
                          </div>
                          {!isNpm && (
                            <div className="flex items-center gap-1.5" title="Favorites">
                              <Star size={14} className="text-amber-400 fill-amber-400/20" />
                              <span>{pkg.favers ?? 0}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Package Title & Description */}
                      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors font-mono">
                        {pkg.name}
                      </h3>

                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {pkg.description || t("packages.no_desc", "No description provided.")}
                      </p>
                    </div>

                    <div>
                      {/* Command Line Box */}
                      <div className="mb-6 bg-black/60 border border-white/10 rounded-xl p-3.5 flex items-center justify-between gap-3 font-mono text-xs text-gray-300">
                        <div className="flex items-center gap-2 overflow-x-auto select-all">
                          <Terminal size={14} className="text-primary shrink-0" />
                          <span className="whitespace-nowrap">{installCmd}</span>
                        </div>

                        <button
                          onClick={() => handleCopy(pkg.name, isNpm)}
                          aria-label={`Copy install command for ${pkg.name}`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0 flex items-center gap-1.5 text-[11px]"
                          title="Copy install command"
                        >
                          {isCopied ? (
                            <>
                              <Check size={14} className="text-emerald-400" />
                              <span className="text-emerald-400 font-sans font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span className="font-sans">Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={`/packages/${pkg.name}`}
                          className="w-full py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg"
                        >
                          <BookOpen size={14} />
                          {t("packages.view_docs", "View Documentation →")}
                        </Link>

                        {pkg.url && (
                          <a
                            href={pkg.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                          >
                            <ExternalLink size={14} />
                            {isNpm ? "NPM JS" : "Packagist"}
                          </a>
                        )}

                        {pkg.repository && (
                          <a
                            href={pkg.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                          >
                            <Github size={14} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesSection;
