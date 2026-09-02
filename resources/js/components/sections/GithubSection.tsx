import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { GitCommit, Star, GitPullRequest, Flame, ExternalLink, Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const GithubSection = () => {
  const { t } = useTranslation();
  const githubUsername = "IlhamHattaManggala";

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

          {/* Interactive Contribution Matrix SVG */}
          <div className="w-full overflow-x-auto py-2 flex justify-center bg-black/40 rounded-2xl border border-white/5 p-4">
            <img
              src={`https://ghchart.rshah.org/4682B4/${githubUsername}`}
              alt={`${githubUsername}'s GitHub Contribution Chart`}
              className="w-full max-w-4xl object-contain min-w-[700px] filter drop-shadow"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* GitHub Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{t("github.stats_title", "Overview Stats")}</span>
              <Star size={16} className="text-amber-400" />
            </div>
            <div className="flex justify-center items-center py-2">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&text_color=999999&title_color=ffffff&icon_color=4682B4`}
                alt="GitHub Overview Stats"
                className="w-full object-contain max-h-[170px]"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Top Languages Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{t("github.langs_title", "Most Used Languages")}</span>
              <Code2 size={16} className="text-emerald-400" />
            </div>
            <div className="flex justify-center items-center py-2">
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=dark&hide_border=true&bg_color=00000000&text_color=999999&title_color=ffffff`}
                alt="GitHub Top Languages"
                className="w-full object-contain max-h-[170px]"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Streak Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{t("github.streak_title", "Commit Streak")}</span>
              <Flame size={16} className="text-orange-500" />
            </div>
            <div className="flex justify-center items-center py-2">
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&hide_border=true&background=00000000&stroke=ffffff20&ring=4682B4&fire=FF4500&currStreakLabel=ffffff`}
                alt="GitHub Commit Streak Stats"
                className="w-full object-contain max-h-[170px]"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GithubSection;
