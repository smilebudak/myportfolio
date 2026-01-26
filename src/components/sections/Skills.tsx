import { useMemo, useRef, useEffect, useState } from 'react';
import { resumeData } from '../../data/resume';
import type { Skill } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  type LucideIcon, 
  Code2, 
  Globe, 
  Code,
  Database,
  FileCode,
  Network,
  Users,
  Brain,
  Cloud,
  Settings,
  GitBranch,
  Package,
  Server,
  Webhook,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

const categoryConfig: Record<string, { icon: LucideIcon; color: string; label: string }> = {
  'Programming Languages': { icon: Code2, color: '#ffffff', label: 'Programming Languages' },
  'Backend & Data': { icon: Server, color: '#e4e4e7', label: 'Backend & Data' },
  'Frontend & Mobile': { icon: Globe, color: '#d4d4d8', label: 'Frontend & Mobile' },
  'Cloud, DevOps & Systems': { icon: Cloud, color: '#a1a1aa', label: 'Cloud, DevOps & Systems' }
};

// Technology icon mapping
const getTechIcon = (name: string): LucideIcon | null => {
  const iconMap: Record<string, LucideIcon> = {
    'Go': Code,
    'Python': Code,
    'JavaScript': Code,
    'TypeScript': Code,
    'SQL': Database,
    'React': Sparkles,
    'Next.js': Layers,
    'Tailwind CSS': FileCode,
    'Flutter': Package,
    'PostgreSQL': Database,
    'Redis': Database,
    'AWS (S3, IAM)': Cloud,
    'Docker': Package,
    'Git': GitBranch,
    'Git/GitHub': GitBranch,
    'Role-Based Access Control': Users,
    'Scalable Architectures': Brain,
    'Postman': Settings,
    'REST APIs': Webhook,
    'WebSockets': Network,
    'JWT Authentication': Lock,
    'System Design': Brain,
    'AI Integration': Brain
  };
  
  return iconMap[name] || null;
};

export const Skills = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [useText, setUseText] = useState('use');

  const scrambleText = (finalText: string) => {
    let iterations = 0;
    const interval = setInterval(() => {
      setUseText(
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
    const useText = t('skills.use');
    setUseText(useText);
    scrambleText(useText);
  }, [t]);

  const categories = useMemo(() => {
    const cats: Record<string, Skill[]> = {};
    resumeData.skills.forEach(skill => {
      if (!cats[skill.category]) cats[skill.category] = [];
      cats[skill.category].push(skill);
    });
    return cats;
  }, []);

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
        gsap.from(".skill-header", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });

        gsap.from(".tech-group", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
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
    <section id="skills" ref={containerRef} className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="skill-header mb-20 md:text-center max-w-3xl mx-auto">
          <p className="text-gray-700 font-mono text-sm tracking-widest uppercase mb-4">
            {t('skills.title')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('skills.heading')}{' '}
            <span 
              className="text-gray-900 min-w-[3ch] inline-block cursor-default"
              onMouseEnter={() => scrambleText(t('skills.use'))}
            >
              {useText}
            </span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            {t('skills.description')}
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(categories).map(([category, skills]) => {
            const config = categoryConfig[category] || { icon: Code2, color: '#fff', label: category };
            const Icon = config.icon;

            return (
              <div key={category} className="tech-group flex flex-col h-full">
                {/* Category Title */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-300">
                  <Icon className="w-5 h-5 text-gray-900" />
                  <h3 className="text-lg font-bold text-gray-900">{config.label}</h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-col gap-3">
                  {skills.map((skill) => {
                    const TechIcon = getTechIcon(skill.name);
                    return (
                      <div 
                        key={skill.name}
                        className="group flex items-center justify-between p-4 rounded-xl bg-gray-100/50 hover:bg-gray-100 border border-gray-300 hover:border-gray-400 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          {TechIcon && (
                            <TechIcon className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors flex-shrink-0" />
                          )}
                          <span className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        
                        {/* Minimal proficiency dot indicator instead of bar */}
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i}
                              className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                                i < Math.floor(skill.level / 20) 
                                  ? 'bg-gray-900 opacity-100' 
                                  : 'bg-gray-300 opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer Note */}
        <div className="skill-header mt-20 text-center">
           <p className="text-sm font-mono text-gray-700">
             {t('skills.alwaysLearning')}
           </p>
        </div>

      </div>
    </section>
  );
};
