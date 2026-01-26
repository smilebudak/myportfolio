import { useState, useRef, useEffect } from 'react';
import { resumeData } from '../../data/resume';
import { Mail, Linkedin, Github, Send, CheckCircle, Loader2, AlertCircle, ArrowUpRight, Copy, Check, Instagram } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [touchText, setTouchText] = useState('touch');

  const scrambleText = (finalText: string) => {
    let iterations = 0;
    const interval = setInterval(() => {
      setTouchText(
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
    const touchText = t('contact.touch');
    setTouchText(touchText);
    scrambleText(touchText);
  }, [t]);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      if (reduceMotion || coarsePointer) return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".contact-fade", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(resumeData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');
    
    try {
      const response = await fetch("https://formspree.io/f/mvzabzzg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: resumeData.personal.email,
      href: `mailto:${resumeData.personal.email}`,
      color: '#ffffff'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      value: t('contact.connectWithMe'),
      href: resumeData.personal.linkedin,
      color: '#0A66C2'
    },
    { 
      icon: Instagram, 
      label: 'Instagram', 
      value: t('contact.followMe'),
      href: resumeData.personal.instagram,
      color: '#E1306C'
    },
    { 
      icon: Github, 
      label: 'GitHub', 
      value: t('contact.viewMyCode'),
      href: 'https://github.com/smilebudak',
      color: '#ffffff'
    }
  ];

  return (
    <section id="contact" ref={containerRef} className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="contact-fade text-center mb-20">
          <p className="text-gray-700 font-mono text-sm tracking-widest uppercase mb-6">
            {t('contact.title')}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('contact.heading')}{' '}
            <span 
              className="text-gray-900 min-w-[5ch] inline-block cursor-default"
              onMouseEnter={() => scrambleText(t('contact.touch'))}
            >
              {touchText}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {/* Email Card - Prominent */}
            <div className="contact-fade p-8 rounded-2xl border border-gray-300 bg-white/80">
              <p className="text-sm text-gray-700 mb-2">{t('contact.reachMe')}</p>
              <div className="flex items-center justify-between gap-4">
                <a 
                  href={`mailto:${resumeData.personal.email}`}
                  className="text-lg md:text-xl font-medium text-gray-900 hover:text-gray-800 transition-colors truncate"
                >
                  {resumeData.personal.email}
                </a>
                <button 
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors shrink-0 border border-gray-300"
                  title={t('contact.copyEmail')}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-gray-900" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-700" />
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-fade space-y-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between p-5 rounded-xl border border-gray-300 bg-white/80 hover:border-gray-400 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-3 rounded-lg bg-gray-100 border border-gray-300"
                    >
                      <link.icon className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
                        {link.label}
                      </p>
                      <p className="text-sm text-gray-700">{link.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="contact-fade p-6 rounded-xl border border-gray-300 bg-white/80">
              <p className="text-sm text-gray-700 mb-1">{t('contact.basedIn')}</p>
              <p className="text-gray-900 font-medium">{resumeData.personal.location}</p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <form 
            ref={formRef} 
            onSubmit={handleSubmit}
            action="#"
            method="POST" 
            className="contact-fade p-8 md:p-10 rounded-2xl border border-gray-300 bg-white/80"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{t('contact.sendMessage')}</h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                    {t('contact.name')}
                  </label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required 
                    className="w-full px-5 py-4 rounded-xl bg-gray-100/50 border border-gray-300 text-gray-900 placeholder-gray-500 outline-none transition-all duration-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:bg-gray-100"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    {t('contact.email')}
                  </label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required 
                    className="w-full px-5 py-4 rounded-xl bg-gray-100/50 border border-gray-300 text-gray-900 placeholder-gray-500 outline-none transition-all duration-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:bg-gray-100"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                  {t('contact.message')}
                </label>
                <textarea 
                  id="message"
                  name="message"
                  rows={6}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-gray-100/50 border border-gray-300 text-gray-900 placeholder-gray-500 outline-none transition-all duration-300 resize-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:bg-gray-100"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  status === 'error' 
                    ? 'bg-red-500 hover:bg-red-600 text-gray-900' 
                    : 'bg-white hover:bg-zinc-200 text-black'
                }`}
              >
                {status === 'idle' && (
                  <>
                    <span>{t('contact.sendMessage')}</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t('contact.sending')}</span>
                  </>
                )}
                {status === 'success' && (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>{t('contact.success')}</span>
                  </>
                )}
                {status === 'error' && (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>{t('contact.tryAgain')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
