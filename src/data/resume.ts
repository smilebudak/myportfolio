import type { ResumeData } from '../types';

export const resumeData: ResumeData = {
  personal: {
    name: "Ismail Budak",
    title: "Full-Stack Developer & Data Analyst",
    email: "isml-bdk@hotmail.com",
    location: "Huntsville, TX",
    linkedin: "https://www.linkedin.com/in/ismail-budak-30880a201/",
    x: "",
    instagram: "https://www.instagram.com/isml_bdk?igsh=cXQzbWlmZ3J1b3Bz&utm_source=qr",
    phone: "+1 936 714 1000",
    summary: "Full-stack developer passionate about building scalable applications and AI-powered solutions. Currently pursuing Computer Science at Sam Houston State University while working on production-grade projects. I specialize in Go, React, and cloud technologies, with hands-on experience in medical imaging research and enterprise platforms."
  },
  education: {
    school: "Sam Houston State University",
    degree: "Bachelor of Science in Computer Science, Software Engineering",
    graduation: "May 2026",
    gpa: "3.8"
  },
  experience: [
    {
      role: "Co-Founder & Lead Software Engineer",
      company: "Lokal Kafe",
      period: "July 2025 - Present",
      description: [
        "Cofound and lead a production mobile loyalty platform serving 70+ cafés and 1000+ users.",
        "Architect and maintain backend services for users, cafés, and campaigns.",
        "Lead development of a Flutter-based mobile app and café management panel.",
        "Manage production deployment and feature iteration on the App Store and Google Play."
      ]
    },
    {
      role: "Volunteer Research Assistant - Medical Imaging",
      company: "Sam Houston State University",
      period: "September 2025 - Present",
      description: [
        "Conducted research on contrast-enhanced angiographic imaging (DSA) using AI-based methods.",
        "Trained and evaluated machine learning models to reduce blur and noise using image abstraction and reconstruction techniques.",
        "Performed preprocessing and analysis of medical imaging data."
      ]
    }
  ],
  projects: [
    {
      title: "TaskFlow",
      description: "AI-driven task and project management system that converts high-level goals into structured tasks. Built a modular backend in Go with clear separation of concerns and scalable API design. Features JWT-based authentication, role management, and PostgreSQL schemas.",
      tech: ["Go", "PostgreSQL", "REST APIs", "JWT", "Docker"],
      category: "Full Stack",
      featured: true,
      link: "https://github.com/smilebudak",
      github: "https://github.com/smilebudak"
    },
    {
      title: "TirGO",
      description: "End-to-end logistics and fleet management platform for shippers, fleet owners, and drivers. Developed a scalable backend in Go with REST APIs and role-based access control. Integrated AWS S3 for secure document storage and verification workflows.",
      tech: ["Go", "PostgreSQL", "Redis", "AWS S3", "REST APIs"],
      category: "Full Stack",
      featured: true,
      link: "https://github.com/smilebudak",
      github: "https://github.com/smilebudak"
    },
    {
      title: "Lokal Kafe",
      description: "Cofounded and built a production mobile loyalty platform. Led development of a Flutter mobile app and café management panel. Live app on the App Store and Google Play used by 70+ cafés and 1000+ users.",
      tech: ["Flutter"],
      category: "Mobile",
      featured: true,
      link: "https://lokalkafe.com/qr.html",
      github: "https://github.com/smilebudak"
    },
    {
      title: "Mind2Motion",
      description: "Built an EEG-based motor intent decoding system using deep learning for brain-computer interface applications at Rice University Datathon 2026.",
      tech: ["Python", "TensorFlow", "EEG", "Deep Learning"],
      category: "AI/ML",
      featured: true,
      link: "https://github.com/smilebudak/Neurotech",
      github: "https://github.com/smilebudak/Neurotech"
    },
    {
      title: "Medical Imaging AI",
      description: "Research project on contrast-enhanced angiographic imaging using AI-based methods for image enhancement and noise reduction in medical scans.",
      tech: ["Python", "PyTorch", "OpenCV", "Medical Imaging"],
      category: "Research",
      featured: false,
      link: "https://github.com/smilebudak",
      github: "https://github.com/smilebudak"
    }
  ],
  skills: [
    // Programming Languages
    { name: "Go", level: 92, category: "Programming Languages" },
    { name: "Python", level: 90, category: "Programming Languages" },
    { name: "JavaScript", level: 88, category: "Programming Languages" },
    { name: "TypeScript", level: 88, category: "Programming Languages" },
    { name: "SQL", level: 90, category: "Programming Languages" },

    // Backend & Data
    { name: "REST APIs", level: 95, category: "Backend & Data" },
    { name: "WebSockets", level: 85, category: "Backend & Data" },
    { name: "JWT Authentication", level: 90, category: "Backend & Data" },
    { name: "Role-Based Access Control", level: 88, category: "Backend & Data" },
    { name: "PostgreSQL", level: 92, category: "Backend & Data" },
    { name: "Redis", level: 85, category: "Backend & Data" },

    // Frontend & Mobile
    { name: "React", level: 90, category: "Frontend & Mobile" },
    { name: "Next.js", level: 88, category: "Frontend & Mobile" },
    { name: "Tailwind CSS", level: 92, category: "Frontend & Mobile" },
    { name: "Flutter", level: 85, category: "Frontend & Mobile" },

    // Cloud, DevOps & Systems
    { name: "AWS (S3, IAM)", level: 85, category: "Cloud, DevOps & Systems" },
    { name: "Docker", level: 88, category: "Cloud, DevOps & Systems" },
    { name: "Git/GitHub", level: 95, category: "Cloud, DevOps & Systems" },
    { name: "Postman", level: 90, category: "Cloud, DevOps & Systems" },
    { name: "System Design", level: 85, category: "Cloud, DevOps & Systems" },
    { name: "Scalable Architectures", level: 85, category: "Cloud, DevOps & Systems" },
    { name: "AI Integration", level: 82, category: "Cloud, DevOps & Systems" }
  ]
};
