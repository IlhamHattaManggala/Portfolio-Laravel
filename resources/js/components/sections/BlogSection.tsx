import { motion } from "framer-motion";
import Image from "@/components/Image";
import { Link } from "@inertiajs/react";
import { TArticle } from "@/types";
import { ArrowRight, BookOpen, Clock, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";


interface BlogSectionProps {
  blogs: TArticle[];
}

const BlogSection = ({ blogs: initialBlogs }: BlogSectionProps) => {
    const { t, i18n } = useTranslation();
    const displayBlogs = initialBlogs ? initialBlogs.filter(b => b.is_published) : [];
  
  const getLocalized = (field: any) => {
    if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
      const currentLang = i18n.language?.startsWith('id') ? 'id' : 'en';
      return field[currentLang] || field['id'] || '';
    }
    return field || '';
  };
  
  return (
    <section className="py-32 relative overflow-hidden" id="blog">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium mb-6 text-gray-300"
          >
            <BookOpen size={14} className="text-primary" />
            <span>{t('blog.tag')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            {t('blog.title_1')} <span className="text-gray-500">{t('blog.title_2')}</span>
          </motion.h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBlogs.map((blog, i) => (
              <motion.div
                key={blog.id || i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={blog.featured_image || "/assets/placeholder.png"}
                    alt={getLocalized(blog.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>
                </div>

                <div className="p-8 flex flex-col flex-1 relative z-10 -mt-20">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                      Article
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-300 font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                      <Clock size={12} />
                      {new Date(blog.published_at).toLocaleDateString(i18n.language?.startsWith('id') ? 'id-ID' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-300 font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                      <Eye size={12} className="text-primary" />
                      {blog.views}
                    </span>
                  </div>


                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors tracking-tight line-clamp-2 mt-4">
                    {getLocalized(blog.title)}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                    {getLocalized(blog.excerpt)}
                  </p>
                  
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group/link"
                  >
                    <span className="text-sm font-semibold text-white group-hover/link:text-primary transition-colors">{t('blog.read_article')}</span>
                    <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-2 text-white group-hover/link:text-primary" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white font-semibold hover:bg-white/[0.08] hover:border-white/20 transition-all group"
            >
              <span>{t('blog.view_all')}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
