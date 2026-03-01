import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { useLanguage } from '../../contexts/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nameText, setNameText] = useState(resumeData.personal.name.split(' ')[0]);

  const scrambleText = (finalText: string) => {
    let iterations = 0;
    const interval = setInterval(() => {
      setNameText(
        finalText
          .split("")
          .map((_letter, index) => {
            if (index < iterations) {
              return finalText[index];
            }
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iterations >= finalText.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    // Initial scramble
    scrambleText(resumeData.personal.name.split(' ')[0]);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches) return;

    let raf: number | null = null;
    let next = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      next = {
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20
      };

      if (raf != null) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        setMousePosition(next);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (raf != null) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    // Lazy load GSAP for better initial load performance
    let ctx: any = null;
    let cancelled = false;

    const initAnimation = async () => {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;
      }

      const gsap = (await import('gsap')).default;
      if (cancelled) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Staggered reveal animation
        tl.fromTo(".hero-line",
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }
        )
          .fromTo(".hero-subtitle",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            "-=0.6"
          )
          .fromTo(".hero-cta",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
            "-=0.4"
          )
          .fromTo(".hero-scroll",
            { opacity: 0 },
            { opacity: 1, duration: 1 },
            "-=0.2"
          );
      }, containerRef);
    };

    initAnimation();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden pt-16 sm:pt-20"
    >
      {/* Animated gradient orbs - Subtle Monochrome */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-[120px] transition-transform duration-1000"
        style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gray-400/5 rounded-full blur-[120px] transition-transform duration-1000"
        style={{ transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-start">

          {/* Text Content */}
          <div className="col-span-8 sm:col-span-7 lg:col-span-8">
            {/* Status indicator */}
            <div className="hero-line flex items-center gap-3 mb-6 sm:mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-mono text-green-400 tracking-wider">
                {t('hero.available')}
              </span>
            </div>

            {/* Main heading - Large and impactful */}
            <div className="mb-6 sm:mb-8">
              <div className="overflow-hidden">
                {/* Mobile: Photo on right, name inline */}
                <div className="lg:hidden flex items-center gap-2 sm:gap-3 justify-between w-full pr-0">
                  <h1
                    className="hero-line text-xl sm:text-2xl md:text-3xl font-bold tracking-tight cursor-default leading-tight flex-1 min-w-0 pr-2"
                    onMouseEnter={() => scrambleText(resumeData.personal.name.split(' ')[0])}
                  >
                    <span className="text-gray-900">{t('hero.greeting')} </span>
                    <span className="text-gray-900 min-w-[3ch] inline-block">{nameText}</span>
                    {' '}
                    <span className="text-gray-900">{resumeData.personal.name.split(' ')[1]}</span>
                    <span className="text-gray-900">.</span>
                  </h1>
                  
                  <div className="flex-shrink-0">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                      <img 
                        src="/images/ismail.png" 
                        alt="Ismail Budak"
                        className="w-full h-full rounded-full object-cover aspect-square border-2 border-gray-200 shadow-md"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Desktop: Normal layout */}
                <div className="hidden lg:block">
                  <h1
                    className="hero-line text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tighter cursor-default leading-tight"
                    onMouseEnter={() => scrambleText(resumeData.personal.name.split(' ')[0])}
                  >
                    <span className="text-gray-900">{t('hero.greeting')} </span>
                    <span className="text-gray-900 min-w-[3ch] inline-block">{nameText}</span>
                    {' '}
                    <span className="text-gray-900">{resumeData.personal.name.split(' ')[1]}</span>
                    <span className="text-gray-900">.</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl mb-8 sm:mb-12 leading-relaxed">
              CS @ <span className="text-gray-900 font-medium">Sam Houston State</span> · Building
              <span className="text-gray-900"> Scalable Apps</span> · Research in
              <span className="text-gray-800"> Medical Imaging AI</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={scrollToProjects}
                className="hero-cta btn-primary bg-gray-900 text-white hover:bg-gray-800 border-none text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3"
              >
                <span>{t('hero.viewWork')}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={scrollToContact}
                className="hero-cta inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 font-medium rounded-lg bg-white border border-gray-400 text-gray-900 hover:bg-white hover:border-gray-400 transition-all text-sm sm:text-base"
              >
                <span>{t('hero.getInTouch')}</span>
              </button>

              <a
                href="https://drive.google.com/uc?export=download&id=1Lu_JHp-o9TtoF8pKECf44wAXuNmEtBID"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="hero-cta flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">{t('hero.resume')}</span>
              </a>
            </div>
          </div>

          {/* Profile Photo - Desktop Only (Right Side) */}
          <div className="hidden lg:flex col-span-4 items-center justify-center">
            <div className="relative hero-cta w-full h-auto">
              <img 
                src="/images/ismail.png" 
                alt="Ismail Budak"
                className="w-full h-full rounded-full object-cover aspect-square border-4 border-gray-200 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3">
        <span className="text-[10px] sm:text-xs font-mono text-gray-700 tracking-widest uppercase">{t('hero.scroll')}</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-gray-400 flex items-start justify-center p-1.5 sm:p-2">
          <ArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-700 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
