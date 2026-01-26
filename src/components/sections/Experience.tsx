import { useRef, useEffect } from 'react';
import { resumeData } from '../../data/resume';
import { Briefcase, Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Experience = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

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
        gsap.from(".exp-header", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });

        gsap.from(".exp-card", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        });

        gsap.from(".timeline-line", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.5,
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
    <section ref={containerRef} className="relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="exp-header text-center mb-20">
          <p className="text-gray-700 font-mono text-sm tracking-widest uppercase mb-6">
            {t('experience.careerPath')}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('experience.title')} & 
            <span className="text-gray-900"> {t('experience.researches')}</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {t('experience.description')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div 
            className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gray-300"
          />

          <div className="space-y-12">
            {resumeData.experience.map((exp, idx) => (
              <div 
                key={idx} 
                className={`exp-card relative grid md:grid-cols-2 gap-8 ${
                  idx % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2 z-10">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-gray-400 bg-white/80"
                  />
                </div>

                {/* Date - Hidden on mobile, shown on desktop */}
                <div className={`hidden md:flex items-start ${idx % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12 md:order-2'}`}>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-300 text-gray-700 font-mono text-sm">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:order-1'}`}>
                  <div className="p-6 rounded-2xl bg-white/80 border border-gray-300 space-y-6">
                    {/* Mobile Date */}
                    <div className="md:hidden flex items-center gap-2 text-gray-700 font-mono text-sm">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>

                    {/* Role & Company */}
                    <div>
                      <p className="text-xs text-gray-700 uppercase tracking-wider mb-2">{t('experience.position')}</p>
                      <div className="flex items-center gap-3 text-gray-900">
                        <div className="p-2 rounded-lg bg-gray-100 border border-gray-300">
                          <Briefcase className="w-5 h-5 text-gray-900" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900">{exp.role}</p>
                          <p className="text-xs text-gray-600">{exp.company}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gray-800 text-white text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {t('experience.currentPosition')}
                    </span>

                    {/* Description */}
                    <div>
                      <p className="text-xs text-gray-700 uppercase tracking-wider mb-2">{t('experience.responsibilities')}</p>
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-sm text-gray-800 leading-relaxed">
                            {t(`experience.description.${exp.role.toLowerCase().replace(/[^a-z0-9]/g, '')}.${i}`) || item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
