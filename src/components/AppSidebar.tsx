import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Activity,
  Home,
  Droplets,
  Heart,
  Brain,
  ClipboardList,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { useState } from 'react';

const navigationItems = [
  { name: 'Welcome', href: '/dashboard', icon: Home },
  { name: 'Diabetes', href: '/diabetes', icon: Droplets },
  { name: 'Heart Disease', href: '/heart-disease', icon: Heart },
  { name: 'Parkinsons', href: '/parkinsons', icon: Brain },
  { name: 'Health Planner', href: '/health-planner', icon: ClipboardList },
];

const secondaryItems = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

export default function AppSidebar({ isOpen, onToggle, isMobile = false }: AppSidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ item, collapsed }: { item: typeof navigationItems[0]; collapsed: boolean }) => {
    const active = isActive(item.href);
    
    const linkContent = (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
          active
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        )}
      >
        <item.icon className={cn(
          "h-5 w-5 flex-shrink-0 transition-transform duration-200",
          !active && "group-hover:scale-110"
        )} />
        {!collapsed && (
          <span className="font-medium text-sm truncate">{item.name}</span>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.name}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-16",
          isMobile && !isOpen && "-translate-x-full lg:translate-x-0"
        )}
        style={{ background: 'var(--gradient-sidebar)' }}
      >
        {/* Logo Section */}
        <div className={cn(
          "flex items-center gap-3 p-4 border-b border-sidebar-border",
          !isOpen && "justify-center"
        )}>
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white flex-shrink-0 overflow-hidden">
            <img src="/Logo.png" alt="Patria & Co." className="w-full h-full object-contain" />
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <h1 className="font-heading font-bold text-sidebar-foreground text-sm leading-tight truncate">
                Patria & Co.
              </h1>
              <p className="text-sidebar-foreground/60 text-xs truncate">Harry Patria 2026</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-3 space-y-1">
            {navigationItems.map((item) => (
              <NavItem key={item.href} item={item} collapsed={!isOpen} />
            ))}
          </nav>

          <div className="px-3 mt-6 pt-6 border-t border-sidebar-border space-y-1">
            {secondaryItems.map((item) => (
              <NavItem key={item.href} item={item} collapsed={!isOpen} />
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          {isOpen ? (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  onClick={logout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Sign Out</TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={cn(
            "absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm transition-all hover:bg-sidebar-accent",
            isMobile && "hidden lg:flex"
          )}
        >
          {isOpen ? (
            <ChevronLeft className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
        </button>
      </aside>

      {/* Mobile Menu Button */}
      {isMobile && !isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-40 lg:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border shadow-sm"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
