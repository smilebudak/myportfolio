# Ismail Budak - Portfolio Website

Modern and interactive portfolio website showcasing my projects, skills, and experience as a Full-Stack Developer & Data Analyst.

## 🚀 Features

- **Modern & Responsive Design**: Perfect appearance on all devices
- **3D Interactive Elements**: Visual effects created with Three.js and React Three Fiber
- **Smooth Animations**: Fluid transitions with GSAP and Lenis
- **Project Showcase**: Project display with detailed descriptions
- **Skills Visualization**: Categorized skill levels
- **Contact Form**: Working contact form with Formspree integration
- **Multi-language Support**: English and Turkish language support
- **Custom Cursor**: Custom cursor effect on desktop devices
- **Dark Theme**: Modern dark theme design

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Modern icon library

### 3D & Animations
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **GSAP** - Animation library
- **Lenis** - Smooth scroll library

### Other
- **Formspree** - Form submission service
- **Vercel Analytics** - Analytics tracking

## 📦 Installation

### Requirements

- **Node.js**: >= 18.0.0 (recommended: 18.x or 20.x)
- **npm**: >= 9.0.0 (comes with Node.js) or **yarn**: >= 1.22.0
- **Git**: For cloning the repository

> 💡 **Tip**: If you use `nvm`, you can run `nvm use` to automatically switch to the correct Node.js version specified in `.nvmrc`.

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/smilebudak/ismail-portfolio.git
cd ismail-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 🎨 Customization

All personal information is stored in `src/data/resume.ts`. You can add your own information by editing this file:

- **Personal Information**: Name, email, location, social media links
- **Education**: School, degree, graduation date, GPA
- **Work Experience**: Role, company, period, descriptions
- **Projects**: Title, description, technologies, links
- **Skills**: Skill name, level, category

### Formspree Endpoint

You need to use your own Formspree endpoint for the contact form:

1. Create a [Formspree](https://formspree.io/) account
2. Create a new form
3. Update the endpoint in `src/components/sections/Contact.tsx`:
```typescript
const response = await fetch("https://formspree.io/f/YOUR_ENDPOINT", {
```

## 📜 Scripts

```bash
# Start development server
npm run dev

# Create production build
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 📁 Project Structure

```
ismail-portfolio/
├── src/
│   ├── components/
│   │   ├── 3d/              # 3D components
│   │   ├── effects/         # Visual effects
│   │   ├── layout/          # Layout components
│   │   ├── sections/        # Page sections
│   │   └── ui/              # UI components
│   ├── contexts/            # React contexts
│   ├── data/                # Data files
│   ├── types/               # TypeScript type definitions
│   └── App.tsx              # Main application
├── public/                  # Static files
└── package.json
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Automatic deployment will be performed
3. Vercel Analytics works automatically

### Other Platforms

```bash
# Create build
npm run build

# dist/ folder is ready for production
```

## 📝 License

This project is for personal use.

## 🔗 Links

- **GitHub**: [@smilebudak](https://github.com/smilebudak)
- **Portfolio**: [Live Site](https://your-portfolio-url.com)

## 👨‍💻 Developer

**Ismail Budak**
- Full-Stack Developer & Data Analyst
- Sam Houston State University - Computer Science

---

⭐ If you liked this project, don't forget to give it a star!
