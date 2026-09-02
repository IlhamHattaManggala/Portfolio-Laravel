import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { GitCommit, Star, ExternalLink, Code2, FolderGit2, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TGithubStats } from "@/types";

interface GithubSectionProps {
  stats?: TGithubStats;
}

const defaultStats: TGithubStats = {
  public_repos: 25,
  followers: 12,
  total_stars: 8,
  top_languages: [
    { name: "TypeScript", percentage: 45, color: "#3178c6" },
    { name: "PHP", percentage: 30, color: "#4F5D95" },
    { name: "Dart", percentage: 15, color: "#00B4AB" },
    { name: "JavaScript", percentage: 10, color: "#f1e05a" },
  ],
};

const GithubSection = ({ stats = defaultStats }: GithubSectionProps) => {
  const { t } = useTranslation();
  const githubUsername = "IlhamHattaManggala";
  const displayStats = stats || defaultStats;

  return (
    <section className="py-24 relative overflow-hidden" id="github">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium mb-6 text-gray-300"
          >
            <FaGithub size={14} className="text-white" />
            <span>{t("github.tag", "GitHub Ecosystem")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            {t("github.title_1", "Contribution &")} <span className="text-gray-500">{t("github.title_2", "Coding Activity.")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-base"
          >
            {t("github.subtitle", "Real-time snapshot of my daily commits, open-source activity, and code contributions.")}
          </motion.p>
        </div>

        {/* GitHub Contribution Calendar Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-8 mb-8 hover:border-white/20 transition-colors shadow-2xl overflow-hidden relative"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <GitCommit size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-mono">
                  {t("github.matrix_title", "Contribution Calendar")}
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  @{githubUsername} on GitHub
                </p>
              </div>
            </div>

            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Ilham Hatta Manggala's GitHub Profile"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span>{t("github.view_profile", "View Profile")}</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Contribution Matrix Graphic */}
          <div className="w-full overflow-x-auto py-2 flex justify-center bg-black/40 rounded-2xl border border-white/5 p-4">
            <img
              src={`https://ghchart.rshah.org/4682B4/${githubUsername}`}
              alt={`${githubUsername}'s GitHub Contribution Chart`}
              className="w-full max-w-4xl object-contain min-w-[700px] filter drop-shadow"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* GitHub Stats Native Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{t("github.stats_title", "Overview Stats")}</span>
              <FolderGit2 size={16} className="text-primary" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <FolderGit2 size={14} className="text-primary" />
                  <span>Public Repositories</span>
                </div>
                <span className="text-base font-bold font-mono text-white">{displayStats.public_repos}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Star size={14} className="text-amber-400 fill-amber-400/20" />
                  <span>Total Stars Earned</span>
                </div>
                <span className="text-base font-bold font-mono text-amber-400">{displayStats.total_stars}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Users size={14} className="text-emerald-400" />
                  <span>Followers</span>
                </div>
                <span className="text-base font-bold font-mono text-emerald-400">{displayStats.followers}</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Top Languages Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{t("github.langs_title", "Most Used Languages")}</span>
              <Code2 size={16} className="text-emerald-400" />
            </div>

            <div className="space-y-3.5">
              {displayStats.top_languages.map((lang) => (
                <div key={lang.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                      {lang.name}
                    </span>
                    <span className="text-gray-400 font-bold">{lang.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Developer Profile Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-primary/10 via-[#0D0D0D] to-transparent border border-primary/20 rounded-3xl p-6 hover:border-primary/40 transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">GitHub Developer</span>
              <FaGithub size={20} className="text-white" />
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Developer
              </div>

              <h4 className="text-2xl font-bold text-white tracking-tight">
                Ilham Hatta Manggala
              </h4>

              <p className="text-gray-400 text-xs leading-relaxed">
                Full-Stack Web & Mobile Developer actively contributing to open-source software and modern web applications.
              </p>
            </div>

            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub Profile Page"
              className="mt-6 w-full py-3 px-4 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg"
            >
              <FaGithub size={16} />
              Visit GitHub Profile →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GithubSection;
