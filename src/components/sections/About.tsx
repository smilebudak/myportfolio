import { useRef, useEffect, useState } from 'react';
import { resumeData } from '../../data/resume';
import { Rocket, Server, Brain, GraduationCap, Layers, Cpu, Code2, BookOpen } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const statCards = [
  { 
    icon: Rocket, 
    titleKey: "about.stat1.title",
    descriptionKey: "about.stat1.description"
  },
  { 
    icon: Server, 
    titleKey: "about.stat2.title",
    descriptionKey: "about.stat2.description"
  },
  { 
    icon: Brain, 
    titleKey: "about.stat3.title",
    descriptionKey: "about.stat3.description"
  },
];

const featureCards = [
  {
    icon: Layers,
    titleKey: "about.feature1.title",
    descriptionKey: "about.feature1.description"
  },
  {
    icon: Cpu,
    titleKey: "about.feature2.title",
    descriptionKey: "about.feature2.description"
  },
  {
    icon: Code2,
    titleKey: "about.feature3.title",
    descriptionKey: "about.feature3.description"
  },
  {
    icon: BookOpen,
    titleKey: "about.feature4.title",
    descriptionKey: "about.feature4.description"
  }
];

export const About = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const productionCardRef = useRef<HTMLDivElement>(null);
  const [matterText, setMatterText] = useState('matter');
  const [userCount, setUserCount] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);

  const scrambleText = (finalText: string) => {
    let iterations = 0;
    const interval = setInterval(() => {
      setMatterText(
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
    const matterText = t('about.matter');
    setMatterText(matterText);
    scrambleText(matterText);
  }, [t]);

  useEffect(() => {
    // Counter animation for user count - starts when card is visible
    if (!productionCardRef.current || hasCounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted) {
            setHasCounted(true);
            
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = 1000 / steps;
            const stepDuration = duration / steps;

            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= 1000) {
                setUserCount(1000);
                clearInterval(timer);
              } else {
                setUserCount(Math.floor(current));
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(productionCardRef.current);

    return () => observer.disconnect();
  }, [hasCounted]);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      if (reduceMotion || coarsePointer) return;
    }

    type GsapContext = { revert: () => void };
    let ctx: GsapContext | null = null;
    let cancelled = false;

    (async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".about-fade", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out"
        });
      }, containerRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="about-fade max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <p className="text-gray-700 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6">
            {t('about.title')}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            {t('about.heading')}{' '}
            <span 
              className="text-gray-900 min-w-[6ch] inline-block cursor-default"
              onMouseEnter={() => scrambleText(t('about.matter'))}
            >
              {matterText}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
            {t('about.summary')}
          </p>
        </div>

        {/* Stats Row - 3 Cards */}
        <div className="about-fade grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {statCards.map((item) => (
            <div 
              key={item.titleKey}
              ref={item.titleKey === "about.stat1.title" ? productionCardRef : null}
              className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl group hover:scale-[1.02] transition-transform duration-300 border border-gray-300 bg-white/80"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-gray-100 border border-gray-300"
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-900" />
                </div>
                {item.titleKey === "about.stat1.title" && (
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">+{userCount.toLocaleString()}</span>
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{t('about.users')}</p>
                  </div>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{t(item.titleKey)}</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {t(item.descriptionKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Grid - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {featureCards.map((item, index) => (
            <div 
              key={item.titleKey}
              className="about-fade p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl group border border-gray-300 bg-white/80 hover:border-gray-400 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3 sm:gap-4 lg:gap-5">
                <div 
                  className="p-3 sm:p-4 rounded-lg sm:rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110 bg-gray-100 border border-gray-300"
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-gray-800 transition-all duration-300">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Card */}
        <div className="about-fade mt-8 sm:mt-12 p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-gray-300 bg-white/80">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-100 border border-gray-300">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-900" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{resumeData.education.school}</h3>
                <p className="text-sm sm:text-base text-gray-700">{resumeData.education.degree}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{resumeData.education.gpa}</p>
                <p className="text-xs sm:text-sm text-gray-700">GPA</p>
              </div>
              <div className="text-center">
                <p className="text-base sm:text-lg font-semibold text-gray-900">{resumeData.education.graduation}</p>
                <p className="text-xs sm:text-sm text-gray-700">Expected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
