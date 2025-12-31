import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  value: string | number;
  label: string;
  sublabel?: string;
  className?: string;
}

export function MetricCard({ value, label, sublabel, className }: MetricCardProps) {
  return (
    <div className={cn("metric-card", className)}>
      <p className="text-3xl font-heading font-bold text-primary">{value}</p>
      <p className="text-muted-foreground font-medium mt-2">{label}</p>
      {sublabel && (
        <p className="text-muted-foreground/70 text-sm mt-1">{sublabel}</p>
      )}
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  variant?: 'default' | 'warning' | 'accent';
  className?: string;
}

export function FeatureCard({ title, description, icon, variant = 'default', className }: FeatureCardProps) {
  const variantColors = {
    default: 'text-primary',
    warning: 'text-warning',
    accent: 'text-accent',
  };

  return (
    <div className={cn("feature-card", className)}>
      {icon && (
        <div className={cn("mb-3", variantColors[variant])}>
          {icon}
        </div>
      )}
      <h3 className={cn("font-heading font-semibold mb-2", variantColors[variant])}>
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface LatencyDisplayProps {
  latency: number;
  operation: string;
}

export function LatencyDisplay({ latency, operation }: LatencyDisplayProps) {
  return (
    <div className="latency-display">
      <p className="text-sm font-medium text-foreground">
        {operation} Runtime:{' '}
        <span className="text-primary font-semibold">{latency.toFixed(2)} ms</span>
      </p>
    </div>
  );
}

interface StatusBadgeProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  children: ReactNode;
}

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  const statusClasses = {
    success: 'status-success',
    error: 'status-error',
    warning: 'status-warning',
    info: 'status-info',
  };

  return (
    <div className={cn(statusClasses[variant], "animate-fade-in")}>
      {children}
    </div>
  );
}

interface InputFieldProps {
  label: string;
  unit?: string;
  tooltip?: string;
  children: ReactNode;
}

export function InputField({ label, unit, tooltip, children }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-foreground">
          {label}
          {unit && <span className="text-muted-foreground ml-1">({unit})</span>}
        </label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
}

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export function SectionCard({ children, className }: SectionCardProps) {
  return (
    <div className={cn("card-professional p-6 md:p-8", className)}>
      {children}
    </div>
  );
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
}

export function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  return (
    <div className="bg-hero-gradient rounded-2xl p-8 md:p-12 text-primary-foreground text-center mb-8 shadow-professional-lg">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
        {title}
      </h1>
      <p className="text-primary-foreground/95 text-lg md:text-xl mb-2">
        {subtitle}
      </p>
      {description && (
        <p className="text-primary-foreground/80 text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
