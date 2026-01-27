import { Analytics } from "@vercel/analytics/react"
import { useEffect, useMemo, useRef, useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { CustomCursor } from './components/ui/CustomCursor';
import { ArrowUp, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { resumeData } from './data/resume';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const lastShowRef = useRef(false);

  const shouldShowCustomCursor = useMemo(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    // Only show on desktop-like pointers.
    return window.matchMedia('(pointer: fine)').matches;
  }, []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const raw = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      const progress = Math.max(0, Math.min(1, raw));

      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }

      const shouldShow = window.scrollY > 500;
      if (shouldShow !== lastShowRef.current) {
        lastShowRef.current = shouldShow;
        setShowBackToTop(shouldShow);
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        id="scroll-progress" 
        ref={scrollProgressRef}
      />

      {shouldShowCustomCursor && <CustomCursor />}
      
      <Analytics />
      
      <MainLayout>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        
        {/* Footer */}
        <footer className="py-10 sm:py-12 lg:py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
              {/* Brand */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {t('footer.portfolio')}<span className="text-gradient">.</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {t('footer.description')}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4">
                  {t('footer.quickLinks')}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    { key: 'nav.about', href: 'about' },
                    { key: 'nav.skills', href: 'skills' },
                    { key: 'nav.projects', href: 'projects' },
                    { key: 'nav.contact', href: 'contact' }
                  ].map((item) => (
                    <li key={item.href}>
                      <a 
                        href={`#${item.href}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(`#${item.href}`)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors link-underline"
                      >
                        {t(item.key)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4">
                  {t('footer.connect')}
                </h4>
                <div className="flex gap-3 sm:gap-4">
                  <a 
                    href={`mailto:${resumeData.personal.email}`}
                    className="p-2.5 sm:p-3 rounded-lg bg-white/5 text-gray-600 hover:text-neon-blue hover:bg-neon-blue/10 transition-all"
                    title="Email"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a 
                    href={resumeData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-lg bg-white/5 text-gray-600 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a 
                    href={resumeData.personal.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-lg bg-white/5 text-gray-600 hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-all"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a 
                    href="https://github.com/smilebudak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-lg bg-white/5 text-gray-600 hover:text-gray-900 hover:bg-white/10 transition-all"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="text-gray-600 text-xs sm:text-sm text-center md:text-left">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
              <p className="text-gray-700 text-[10px] sm:text-xs font-mono text-center md:text-right">
                {t('footer.builtWith')}
              </p>
            </div>
          </div>
        </footer>
      </MainLayout>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 p-2.5 sm:p-3 rounded-full bg-neon-blue text-cyber-black transition-all duration-300 z-50 hover:scale-110 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)' }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </>
  );
}

export default App;
