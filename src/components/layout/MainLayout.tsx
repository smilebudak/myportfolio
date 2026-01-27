import { type ReactNode, useEffect } from 'react';
import { Navbar } from '../ui/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  useEffect(() => {
    // Lazy load Lenis for better initial load performance
    let lenis: any = null;
    let rafId: number | null = null;

    const initLenis = async () => {
      // Only load on non-mobile devices for better performance
      if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default;
        
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
        });

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      }
    };

    initLenis();

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F5E6D3] text-gray-900 overflow-x-hidden">
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
