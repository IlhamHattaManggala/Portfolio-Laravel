import { toUrl } from '@/lib/utils';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  resumePath?: string;
}

const Navbar = ({ resumePath = "#" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.experience"), href: "/#experience" },
    { name: t("nav.projects"), href: "/#project" },
    { name: t("nav.packages"), href: "/#packages" },
    { name: t("nav.certificates"), href: "/#certificate" },
    { name: t("nav.blog"), href: "/#blog" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none p-6 transition-all duration-500">
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between backdrop-blur-2xl border border-white/5 ${
          scrolled
            ? "bg-black/40 rounded-full px-5 md:px-8 py-3 w-[calc(100%-1rem)] md:w-full max-w-5xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent rounded-full px-5 md:px-8 py-4 w-full max-w-7xl"
        }`}
      >
        <motion.a
          href="/"
          className="flex items-center gap-3 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 relative">
            <Image src="/images/profile.webp" alt="Profile" fill sizes="32px" className="object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            IHM.
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={toUrl(link.href)}
              className="px-3 lg:px-5 py-2 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition border border-white/10 flex items-center justify-center">
                <img 
                  src={i18n.language?.startsWith('id') ? "https://flagcdn.com/w20/id.png" : "https://flagcdn.com/w20/gb.png"} 
                  srcSet={i18n.language?.startsWith('id') ? "https://flagcdn.com/w40/id.png 2x" : "https://flagcdn.com/w40/gb.png 2x"}
                  width="20" 
                  alt="Flag" 
                  className="rounded-[2px]"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#121212] border-white/10 text-white">
              <DropdownMenuItem onClick={() => changeLanguage('en')} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="16" alt="English" />
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('id')} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                <img src="https://flagcdn.com/w20/id.png" srcSet="https://flagcdn.com/w40/id.png 2x" width="16" alt="Indonesia" />
                Indonesia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href={resumePath}
            download
            className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 transition-colors text-xs font-bold rounded-full flex items-center gap-2"
          >
            <Download size={14} />
            CV
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 flex items-center justify-center bg-white/5 text-gray-300 rounded-full border border-white/10">
                <img 
                  src={i18n.language?.startsWith('id') ? "https://flagcdn.com/w20/id.png" : "https://flagcdn.com/w20/gb.png"} 
                  srcSet={i18n.language?.startsWith('id') ? "https://flagcdn.com/w40/id.png 2x" : "https://flagcdn.com/w40/gb.png 2x"}
                  width="20" 
                  alt="Flag" 
                  className="rounded-[2px]"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#121212] border-white/10 text-white">
              <DropdownMenuItem onClick={() => changeLanguage('en')} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="16" alt="English" />
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('id')} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                <img src="https://flagcdn.com/w20/id.png" srcSet="https://flagcdn.com/w40/id.png 2x" width="16" alt="Indonesia" />
                Indonesia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 z-40 md:hidden pointer-events-auto"
          >
            <div className="bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-2 shadow-2xl">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.href}
                  href={toUrl(link.href)}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href={resumePath}
                download
                className="mt-4 w-full py-4 bg-white text-black text-center font-bold rounded-2xl flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
