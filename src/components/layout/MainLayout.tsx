import { type ReactNode, useEffect } from 'react';
import { Navbar } from '../ui/Navbar';
import Lenis from 'lenis';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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
