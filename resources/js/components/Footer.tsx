import { toUrl } from '@/lib/utils';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 overflow-hidden border-t border-white/5 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 relative">
                <Image src="/images/profile.webp" alt="Profile" fill sizes="32px" className="object-cover" />

              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                IHM.
              </span>
            </div>
            <p className="text-gray-300 text-sm max-w-sm mb-8 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: "https://github.com/IlhamHattaManggala", label: "GitHub Profile" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/ilham-hatta-manggala", label: "LinkedIn Profile" },
                { icon: FaInstagram, href: "https://www.instagram.com/runtahhhh__/", label: "Instagram Profile" },
                { icon: FaTwitter, href: "#", label: "Twitter Profile" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/[0.03] flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/5"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-8">{t('footer.nav_title')}</h4>
            <ul className="space-y-4 text-sm">
              {[
                { name: t('nav.home'), href: "#hero" },
                { name: t('nav.about'), href: "#about" },
                { name: t('nav.experience'), href: "#experience" },
                { name: t('nav.projects'), href: "#project" }
              ].map((link) => (
                <li key={link.name}>
                  <a href={toUrl(link.href)} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-8">{t('footer.links_title')}</h4>
            <ul className="space-y-4 text-sm">
              {[
                { name: t('nav.contact'), href: "#contact" },
                { name: t('nav.blog'), href: "#blog" },
                { name: t('nav.certificates'), href: "#certificate" },
                { name: t('nav.faq'), href: "/faq" }
              ].map((link) => (
                <li key={link.name}>
                  <a href={toUrl(link.href)} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-300 tracking-wide flex items-center gap-2">
            © {currentYear} Ilham Hatta Manggala. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

