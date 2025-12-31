import { ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AppSidebar from '@/components/AppSidebar';
import Footer from '@/components/Footer';
import { useMediaQuery } from '@/hooks/use-media-query';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
      />
      
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          sidebarOpen && !isMobile ? "lg:ml-64" : "lg:ml-16"
        )}
      >
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
