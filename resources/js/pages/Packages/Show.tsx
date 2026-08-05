import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Package, ExternalLink, Github, Download, Star, Copy, Check, Terminal, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TPackage } from "@/types";
import { useTranslation } from "react-i18next";

interface PackageShowProps {
  package: TPackage & { readme?: string; readme_id?: string };
  resumePath?: string;
}

export default function Show({ package: pkg, resumePath }: PackageShowProps) {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);

  const isIndonesian = i18n.language?.startsWith('id');
  const activeReadme = isIndonesian ? (pkg.readme_id || pkg.readme) : (pkg.readme || pkg.readme_id);

  const installCmd = `composer require ${pkg.name}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : `https://ilhamhatta.my.id/packages/${pkg.name}`;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Head title={`${pkg.name} | Package Documentation - Ilham Hatta Manggala`}>
        <meta name="description" content={pkg.description || `Documentation for ${pkg.name} PHP/Laravel Package by Ilham Hatta Manggala.`} />
        <meta name="keywords" content={`${pkg.name}, Laravel Package, Composer, Packagist, PHP Library, Ilham Hatta Manggala`} />
        <meta name="author" content="Ilham Hatta Manggala" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${pkg.name} | Package Documentation`} />
        <meta property="og:description" content={pkg.description || `Documentation for ${pkg.name} PHP/Laravel Package.`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={`${pkg.name} | Package Documentation`} />
        <meta name="twitter:description" content={pkg.description || `Documentation for ${pkg.name} PHP/Laravel Package.`} />
      </Head>

      <Navbar resumePath={resumePath} />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Back Button */}
          <Link
            href="/#packages"
            className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={20} />
            {t("packages.back_home", "Back to Packages")}
          </Link>

          {/* Package Header Card */}
          <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Package size={14} className="text-primary" />
                <span>{t("packages.open_source_badge", "Open Source Package")}</span>
              </div>

              <div className="flex items-center gap-6 text-sm font-mono text-gray-300">
                <div className="flex items-center gap-2" title="Total Downloads">
                  <Download size={16} className="text-gray-400" />
                  <span>{t("packages.downloads_count", "{{count}} downloads", { count: pkg.downloads ?? 0 })}</span>
                </div>
                <div className="flex items-center gap-2" title="Favorites">
                  <Star size={16} className="text-amber-400 fill-amber-400/20" />
                  <span>{t("packages.stars_count", "{{count}} stars", { count: pkg.favers ?? 0 })}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={16} />
                  <span>{t("packages.mit_license", "MIT License")}</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 tracking-tight">
              {pkg.name}
            </h1>

            <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed mb-8">
              {pkg.description}
            </p>

            {/* Install Command Box */}
            <div className="bg-black/70 border border-white/15 rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-sm shadow-inner">
              <div className="flex items-center gap-3 overflow-x-auto select-all text-gray-200">
                <Terminal size={18} className="text-primary shrink-0" />
                <span className="font-semibold text-white">{installCmd}</span>
              </div>

              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold transition-all flex items-center gap-2 shrink-0"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span className="text-emerald-400">{t("packages.copied_cmd", "Copied to Clipboard!")}</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>{t("packages.copy_cmd", "Copy Command")}</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4">
              {pkg.url && (
                <a
                  href={pkg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-xl bg-white text-black font-bold text-xs md:text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-lg"
                >
                  <ExternalLink size={16} />
                  {t("packages.view_packagist", "View on Packagist")}
                </a>
              )}

              {pkg.repository && (
                <a
                  href={pkg.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs md:text-sm flex items-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <Github size={16} />
                  {t("packages.github_repo", "GitHub Repository")}
                </a>
              )}
            </div>
          </div>

          {/* Documentation Container */}
          <div className="bg-[#090909] border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4">
              <h2 className="text-xl font-mono text-gray-400 flex items-center gap-3">
                <Terminal size={20} className="text-primary" />
                <span>{t("packages.readme_title", "README.md Documentation")}</span>
              </h2>

              {/* Language Selector for Docs */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-xl text-xs font-mono">
                <button
                  onClick={() => i18n.changeLanguage('id')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    isIndonesian ? 'bg-primary text-white font-bold shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <img src="https://flagcdn.com/w20/id.png" width="16" alt="ID" className="rounded-[2px]" />
                  <span>Bahasa Indonesia</span>
                </button>
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    !isIndonesian ? 'bg-primary text-white font-bold shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <img src="https://flagcdn.com/w20/gb.png" width="16" alt="EN" className="rounded-[2px]" />
                  <span>English</span>
                </button>
              </div>
            </div>

            {activeReadme ? (
              <div className="max-w-none text-gray-300">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ ...props }) => (
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-10 mb-6 border-b border-white/10 pb-3 leading-tight tracking-tight font-mono" {...props} />
                    ),
                    h2: ({ ...props }) => (
                      <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-5 leading-tight tracking-tight flex items-center gap-3 border-l-4 border-primary pl-4" {...props} />
                    ),
                    h3: ({ ...props }) => (
                      <h3 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 leading-tight" {...props} />
                    ),
                    p: ({ ...props }) => (
                      <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-6 text-justify" {...props} />
                    ),
                    ul: ({ ...props }) => (
                      <ul className="list-disc list-inside text-gray-300 mb-6 pl-4 space-y-2.5" {...props} />
                    ),
                    ol: ({ ...props }) => (
                      <ol className="list-decimal list-inside text-gray-300 mb-6 pl-4 space-y-2.5" {...props} />
                    ),
                    li: ({ ...props }) => (
                      <li className="text-gray-300 text-base md:text-lg leading-relaxed pl-1" {...props} />
                    ),
                    strong: ({ ...props }) => (
                      <strong className="text-white font-bold" {...props} />
                    ),
                    code: ({ className, children, ...props }: any) => {
                      const isLanguage = className && className.includes('language-');
                      if (isLanguage) {
                        return (
                          <code className={`${className} font-mono text-sm`} {...props}>
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-primary font-mono border border-white/10 font-semibold inline-block my-0.5" {...props}>
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children, ...props }: any) => (
                      <pre className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 my-6 overflow-x-auto text-sm text-gray-200 font-mono leading-relaxed shadow-2xl" {...props}>
                        {children}
                      </pre>
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote className="border-l-4 border-primary bg-white/5 px-6 py-4 rounded-r-2xl italic my-6 text-gray-300 text-lg" {...props} />
                    ),
                    a: ({ ...props }) => (
                      <a className="text-primary hover:underline hover:text-white font-semibold transition-colors duration-200" target="_blank" rel="noopener noreferrer" {...props} />
                    ),
                    hr: ({ ...props }) => (
                      <hr className="border-white/10 my-10" {...props} />
                    ),
                    table: ({ ...props }) => (
                      <div className="overflow-x-auto my-8 border border-white/10 rounded-2xl">
                        <table className="w-full text-left text-sm text-gray-300" {...props} />
                      </div>
                    ),
                    th: ({ ...props }) => (
                      <th className="bg-white/5 p-4 font-bold text-white border-b border-white/10" {...props} />
                    ),
                    td: ({ ...props }) => (
                      <td className="p-4 border-b border-white/5" {...props} />
                    ),
                    img: ({ ...props }) => (
                      <img className="max-w-full rounded-xl my-4 inline-block" {...props} />
                    ),
                  }}
                >
                  {activeReadme}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <Package size={48} className="mx-auto mb-4 opacity-50" />
                <p>{t("packages.no_readme", "Documentation README.md is currently unavailable for this package.")}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
