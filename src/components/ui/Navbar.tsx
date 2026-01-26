import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Cpu, Layers, User, Mail } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '../../contexts/LanguageContext';

const navItems = [
  { nameKey: 'nav.about', href: '#about', icon: User },
  { nameKey: 'nav.skills', href: '#skills', icon: Cpu },
  { nameKey: 'nav.projects', href: '#projects', icon: Layers },
  { nameKey: 'nav.contact', href: '#contact', icon: Mail },
];

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={clsx(
      "fixed top-0 w-full z-50 transition-all duration-500",
      scrolled 
        ? "bg-white/80 backdrop-blur-xl border-b border-gray-300/30" 
        : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-3 group" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="w-10 h-10 bg-gray-200/30 rounded-xl border border-gray-400/30 flex items-center justify-center group-hover:bg-gray-300/40 group-hover:border-gray-500/40 transition-all duration-300">
              <Terminal className="w-5 h-5 text-gray-900" />
            </div>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.nameKey}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  activeSection === item.href.substring(1) 
                    ? "text-gray-900 bg-gray-200/50" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                )}
              >
                {t(item.nameKey)}
              </a>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              className="ml-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-300 flex items-center gap-2"
              title={language === 'en' ? 'Türkçe\'ye geç' : 'Switch to English'}
            >
              <span>{language === 'en' ? '🇹🇷' : '🇬🇧'}</span>
              <span>{language === 'en' ? 'TR' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={clsx(
        "md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-300/30 transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.nameKey}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                activeSection === item.href.substring(1)
                  ? "text-gray-900 bg-gray-200/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
              )}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
            >
              <item.icon className="w-5 h-5" />
              <span>{t(item.nameKey)}</span>
            </a>
          ))}
          
          {/* Mobile Language Toggle */}
          <button
            onClick={() => {
              setLanguage(language === 'en' ? 'tr' : 'en');
              setIsOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-300 w-full"
          >
            <span className="text-xl">{language === 'en' ? '🇹🇷' : '🇬🇧'}</span>
            <span>{language === 'en' ? 'Türkçe' : 'English'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
