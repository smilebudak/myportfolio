import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.available': 'Available for opportunities',
    'hero.getInTouch': 'Get in Touch',
    'hero.resume': 'Resume',
    'hero.scroll': 'Scroll',
    'hero.viewWork': 'View My Work',
    
    // About
    'about.title': 'About',
    'about.heading': 'I build things that',
    'about.matter': 'matter',
    'about.summary': 'Full-stack developer passionate about building scalable applications and AI-powered solutions. Currently pursuing Computer Science at Sam Houston State University while working on production-grade projects. I specialize in Go, React, and cloud technologies, with hands-on experience in medical imaging research and enterprise platforms.',
    'about.stat1.title': 'Production Experience',
    'about.stat1.description': 'Real-world applications deployed and actively used by real users.',
    'about.stat2.title': 'Backend-Oriented',
    'about.stat2.description': 'Strong focus on building reliable backend systems and APIs.',
    'about.stat3.title': 'Applied AI',
    'about.stat3.description': 'Hands-on experience applying AI to research and practical problems.',
    'about.feature1.title': 'System Building',
    'about.feature1.description': 'Designing and implementing backend systems that handle real users, data, and workflows from end to end.',
    'about.feature2.title': 'Applied Machine Learning',
    'about.feature2.description': 'Using machine learning for real problems, including medical imaging research and EEG signal analysis.',
    'about.feature3.title': 'Full-Stack Delivery',
    'about.feature3.description': 'Turning ideas into working products by connecting backend logic with clean, usable interfaces.',
    'about.feature4.title': 'Research Mindset',
    'about.feature4.description': 'Experience working in academic-style projects involving experimentation, evaluation, and iteration.',
    'about.users': 'users',
    
    // Skills
    'skills.title': 'Skills',
    'skills.heading': 'What I',
    'skills.use': 'use',
    'skills.description': 'Languages, frameworks, and tools I work with daily.',
    'skills.alwaysLearning': 'Always learning.',
    
    // Projects
    'projects.title': 'Projects',
    'projects.heading': 'Things I\'ve',
    'projects.built': 'built',
    'projects.description': 'Real projects, real users, real impact.',
    'projects.moreOnGitHub': 'More on GitHub',
    'projects.viewProfile': 'View GitHub Profile',
    'projects.viewArchive': 'View Repository Archive',
    'projects.featured': 'Featured',
    'projects.viewSource': 'View Source',
    'projects.liveDemo': 'Live Demo',
    'projects.category.fullStack': 'Full Stack',
    'projects.category.mobile': 'Mobile',
    'projects.category.aiMl': 'AI/ML',
    'projects.category.research': 'Research',
    'projects.taskflow.description': 'AI-driven task and project management system that converts high-level goals into structured tasks. Built a modular backend in Go with clear separation of concerns and scalable API design. Features JWT-based authentication, role management, and PostgreSQL schemas.',
    'projects.tirgo.description': 'End-to-end logistics and fleet management platform for shippers, fleet owners, and drivers. Developed a scalable backend in Go with REST APIs and role-based access control. Integrated AWS S3 for secure document storage and verification workflows.',
    'projects.lokalkafe.description': 'Cofounded and built a production mobile loyalty platform. Led development of a Flutter mobile app and café management panel. Live app on the App Store and Google Play used by 70+ cafés and 1000+ users.',
    'projects.mind2motion.description': 'Built an EEG-based motor intent decoding system using deep learning for brain-computer interface applications at Rice University Datathon 2026.',
    'projects.medicalimagingai.description': 'Research project on contrast-enhanced angiographic imaging using AI-based methods for image enhancement and noise reduction in medical scans.',
    
    // Experience
    'experience.title': 'Experience',
    'experience.heading': 'Where I\'ve',
    'experience.researched': 'Research',
    'experience.researches': 'Research',
    'experience.currentPosition': 'Current Position',
    'experience.careerPath': 'Career Path',
    'experience.description': 'My journey through cutting-edge research and development.',
    'experience.position': 'Position',
    'experience.responsibilities': 'Responsibilities',
    'experience.description.cofounderleadsoftwareengineer.0': 'Cofound and lead a production mobile loyalty platform serving 70+ cafés and 1000+ users.',
    'experience.description.cofounderleadsoftwareengineer.1': 'Architect and maintain backend services for users, cafés, and campaigns.',
    'experience.description.cofounderleadsoftwareengineer.2': 'Lead development of a Flutter-based mobile app and café management panel.',
    'experience.description.cofounderleadsoftwareengineer.3': 'Manage production deployment and feature iteration on the App Store and Google Play.',
    'experience.description.volunteerresearchassistantmedicalimaging.0': 'Conducted research on contrast-enhanced angiographic imaging (DSA) using AI-based methods.',
    'experience.description.volunteerresearchassistantmedicalimaging.1': 'Trained and evaluated machine learning models to reduce blur and noise using image abstraction and reconstruction techniques.',
    'experience.description.volunteerresearchassistantmedicalimaging.2': 'Performed preprocessing and analysis of medical imaging data.',
    
    // Contact
    'contact.title': 'Contact',
    'contact.heading': 'Get in',
    'contact.touch': 'touch',
    'contact.subtitle': 'Internships, research opportunities, or interesting projects — I\'m listening.',
    'contact.sendMessage': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent!',
    'contact.error': 'Error sending message',
    'contact.tryAgain': 'Try Again',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.reachMe': 'Reach me directly at',
    'contact.copyEmail': 'Copy email',
    'contact.connectWithMe': 'Connect with me',
    'contact.followMe': 'Follow me',
    'contact.viewMyCode': 'View my code',
    'contact.basedIn': 'Based in',
    'contact.namePlaceholder': 'John Doe',
    'contact.emailPlaceholder': 'john@example.com',
    'contact.messagePlaceholder': 'Tell me about your project...',
    
    // Footer
    'footer.portfolio': 'Portfolio',
    'footer.description': 'Software Engineer & AI Researcher.',
    'footer.quickLinks': 'Quick Links',
    'footer.connect': 'Connect',
    'footer.copyright': '© {year} Ismail Budak. All rights reserved.',
    'footer.builtWith': 'Designed & Built with React, Three.js & GSAP',
  },
  tr: {
    // Navigation
    'nav.about': 'Hakkımda',
    'nav.skills': 'Yetenekler',
    'nav.projects': 'Projeler',
    'nav.contact': 'İletişim',
    
    // Hero
    'hero.greeting': 'Merhaba, Ben',
    'hero.available': 'Fırsatlar için müsait',
    'hero.getInTouch': 'İletişime Geç',
    'hero.resume': 'Özgeçmiş',
    'hero.scroll': 'Kaydır',
    'hero.viewWork': 'Çalışmalarımı Gör',
    
    // About
    'about.title': 'Hakkımda',
    'about.heading': 'Katma değerli',
    'about.matter': 'çözümler üretiyorum',
    'about.summary': 'Ölçeklenebilir uygulamalar ve AI destekli çözümler geliştirmeye tutkulu full-stack geliştirici. Sam Houston State University\'de Bilgisayar Bilimleri eğitimi alırken, üretim seviyesinde projeler üzerinde çalışıyorum. Go, React ve bulut teknolojilerinde uzmanlaşmış durumdayım, tıbbi görüntüleme araştırmaları ve kurumsal platformlarda uygulamalı deneyime sahibim.',
    'about.stat1.title': 'Üretim Deneyimi',
    'about.stat1.description': 'Gerçek kullanıcılar tarafından aktif olarak kullanılan gerçek dünya uygulamaları.',
    'about.stat2.title': 'Backend Odaklı',
    'about.stat2.description': 'Güvenilir backend sistemleri ve API\'ler oluşturmaya güçlü odaklanma.',
    'about.stat3.title': 'Uygulamalı AI',
    'about.stat3.description': 'AI\'yi araştırma ve pratik problemlere uygulama konusunda uygulamalı deneyim.',
    'about.feature1.title': 'Sistem İnşası',
    'about.feature1.description': 'Gerçek kullanıcıları, verileri ve iş akışlarını baştan sona yöneten backend sistemleri tasarlama ve uygulama.',
    'about.feature2.title': 'Uygulamalı Makine Öğrenmesi',
    'about.feature2.description': 'Tıbbi görüntüleme araştırması ve EEG sinyal analizi dahil gerçek problemler için makine öğrenmesi kullanma.',
    'about.feature3.title': 'Full-Stack Teslimat',
    'about.feature3.description': 'Backend mantığını temiz, kullanılabilir arayüzlerle bağlayarak fikirleri çalışan ürünlere dönüştürme.',
    'about.feature4.title': 'Araştırma Zihniyeti',
    'about.feature4.description': 'Deney, değerlendirme ve yineleme içeren akademik tarzı projelerde çalışma deneyimi.',
    'about.users': 'kullanıcı',
    
    // Skills
    'skills.title': 'Yetenekler',
    'skills.heading': 'Kullandığım',
    'skills.use': 'teknolojiler',
    'skills.description': 'Günlük olarak çalıştığım diller, framework\'ler ve araçlar.',
    'skills.alwaysLearning': 'Sürekli öğreniyorum.',
    
    // Projects
    'projects.title': 'Projeler',
    'projects.heading': 'Yaptığım',
    'projects.built': 'projeler',
    'projects.description': 'Gerçek projeler, gerçek kullanıcılar, gerçek etki.',
    'projects.moreOnGitHub': 'GitHub\'da Daha Fazlası',
    'projects.viewProfile': 'GitHub Profilini Görüntüle',
    'projects.viewArchive': 'Depo Arşivini Görüntüle',
    'projects.featured': 'Öne Çıkan',
    'projects.viewSource': 'Kaynağı Görüntüle',
    'projects.liveDemo': 'Canlı Demo',
    'projects.category.fullStack': 'Full Stack',
    'projects.category.mobile': 'Mobil',
    'projects.category.aiMl': 'AI/ML',
    'projects.category.research': 'Araştırma',
    'projects.taskflow.description': 'Yüksek seviyeli hedefleri yapılandırılmış görevlere dönüştüren AI destekli görev ve proje yönetim sistemi. Net sorumluluk ayrımı ve ölçeklenebilir API tasarımı ile Go\'da modüler bir backend oluşturdum. JWT tabanlı kimlik doğrulama, rol yönetimi ve PostgreSQL şemaları içerir.',
    'projects.tirgo.description': 'Nakliyeciler, filo sahipleri ve sürücüler için uçtan uca lojistik ve filo yönetim platformu. REST API\'ler ve rol tabanlı erişim kontrolü ile Go\'da ölçeklenebilir bir backend geliştirdim. Güvenli belge depolama ve doğrulama iş akışları için AWS S3 entegre ettim.',
    'projects.lokalkafe.description': 'Üretim seviyesinde bir mobil sadakat platformu kurduk ve geliştirdik. Flutter mobil uygulaması ve kafe yönetim panelinin geliştirilmesine öncülük ettim. App Store ve Google Play\'de yayında olan uygulama 70+ kafe ve 1000+ kullanıcı tarafından kullanılıyor.',
    'projects.mind2motion.description': 'Rice University Datathon 2026\'da beyin-bilgisayar arayüzü uygulamaları için derin öğrenme kullanarak EEG tabanlı motor niyet çözümleme sistemi oluşturdum.',
    'projects.medicalimagingai.description': 'Tıbbi taramalarda görüntü iyileştirme ve gürültü azaltma için AI tabanlı yöntemler kullanarak kontrast artırılmış anjiyografik görüntüleme üzerine araştırma projesi.',
    
    // Experience
    'experience.title': 'Deneyim',
    'experience.heading': 'Araştırma',
    'experience.researched': 'Yaptığım',
    'experience.researches': 'Araştırmalar',
    'experience.currentPosition': 'Mevcut Pozisyon',
    'experience.careerPath': 'Kariyer Yolu',
    'experience.description': 'En son teknoloji araştırma ve geliştirme yolculuğum.',
    'experience.position': 'Pozisyon',
    'experience.responsibilities': 'Sorumluluklar',
    'experience.description.cofounderleadsoftwareengineer.0': '70+ kafe ve 1000+ kullanıcıya hizmet veren üretim seviyesinde bir mobil sadakat platformunu kurduk ve yönetiyorum.',
    'experience.description.cofounderleadsoftwareengineer.1': 'Kullanıcılar, kafeler ve kampanyalar için backend servislerini tasarlıyorum ve sürdürüyorum.',
    'experience.description.cofounderleadsoftwareengineer.2': 'Flutter tabanlı mobil uygulama ve kafe yönetim panelinin geliştirilmesine öncülük ediyorum.',
    'experience.description.cofounderleadsoftwareengineer.3': 'App Store ve Google Play\'de üretim dağıtımını ve özellik yinelemelerini yönetiyorum.',
    'experience.description.volunteerresearchassistantmedicalimaging.0': 'AI tabanlı yöntemler kullanarak kontrast artırılmış anjiyografik görüntüleme (DSA) üzerine araştırma yaptım.',
    'experience.description.volunteerresearchassistantmedicalimaging.1': 'Görüntü soyutlama ve yeniden yapılandırma teknikleri kullanarak bulanıklığı ve gürültüyü azaltmak için makine öğrenmesi modelleri eğittim ve değerlendirdim.',
    'experience.description.volunteerresearchassistantmedicalimaging.2': 'Tıbbi görüntüleme verilerinin ön işleme ve analizini gerçekleştirdim.',
    
    // Contact
    'contact.title': 'İletişim',
    'contact.heading': 'İletişime',
    'contact.touch': 'geç',
    'contact.subtitle': 'Stajlar, araştırma fırsatları veya ilginç projeler — dinliyorum.',
    'contact.sendMessage': 'Mesaj Gönder',
    'contact.sending': 'Gönderiliyor...',
    'contact.success': 'Mesaj gönderildi!',
    'contact.error': 'Tekrar Dene',
    'contact.name': 'İsim',
    'contact.email': 'E-posta',
    'contact.message': 'Mesaj',
    'contact.reachMe': 'Bana doğrudan ulaşın',
    'contact.copyEmail': 'E-postayı kopyala',
    'contact.connectWithMe': 'Benimle bağlantı kur',
    'contact.followMe': 'Beni takip et',
    'contact.viewMyCode': 'Kodlarımı görüntüle',
    'contact.basedIn': 'Konum',
    'contact.namePlaceholder': 'Adınız',
    'contact.emailPlaceholder': 'e-posta@example.com',
    'contact.messagePlaceholder': 'Projeniz hakkında bana bilgi verin...',
    
    // Footer
    'footer.portfolio': 'Portfolio',
    'footer.description': 'Yazılım Mühendisi & AI Araştırmacısı.',
    'footer.quickLinks': 'Hızlı Bağlantılar',
    'footer.connect': 'Bağlantı',
    'footer.copyright': '© {year} Ismail Budak. Tüm hakları saklıdır.',
    'footer.builtWith': 'React, Three.js & GSAP ile Tasarlandı ve Geliştirildi',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'tr' || saved === 'en') ? saved : 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
