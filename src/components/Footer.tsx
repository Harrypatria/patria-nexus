import { Activity, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-professional py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="h-4 w-4 text-primary" />
          <span>AI Health Copilot Pro</span>
          <span className="hidden sm:inline mx-2">|</span>
          <span className="hidden sm:inline">Agentic AI Masterclass Project</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Copyright {currentYear} Harry Patria - Patria & Co.</span>
          <a 
            href="https://www.patriaco.co.uk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            patriaco.co.uk
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
