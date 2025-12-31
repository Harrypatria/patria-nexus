import { useState, useRef, useEffect } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LatencyDisplay } from '@/components/ui-custom/PageComponents';
import { cn } from '@/lib/utils';

interface AIChatOutputProps {
  content: string;
  isLoading: boolean;
  latency?: number | null;
  title?: string;
  className?: string;
}

export default function AIChatOutput({ 
  content, 
  isLoading, 
  latency, 
  title = "AI Health Plan",
  className 
}: AIChatOutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [displayedContent, setDisplayedContent] = useState('');
  const contentRef = useRef('');

  // Smooth content update for streaming
  useEffect(() => {
    if (content !== contentRef.current) {
      contentRef.current = content;
      setDisplayedContent(content);
    }
  }, [content]);

  // Auto-scroll to bottom during streaming
  useEffect(() => {
    if (scrollRef.current && isLoading) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedContent, isLoading]);

  const renderFormattedContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Skip empty lines that are just whitespace
      if (!line.trim()) return null;

      // Render everything as a clean paragraph
      return (
        <p key={i} className="text-muted-foreground py-2 leading-relaxed text-justify">
          {line.trim()}
        </p>
      );
    });
  };

  if (!content && !isLoading) {
    return null;
  }

  return (
    <Card className={cn("card-professional", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-heading text-lg">
          <Bot className="h-5 w-5 text-primary" />
          {title}
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin text-primary ml-2" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea 
          className="h-[500px] pr-4" 
          ref={scrollRef as any}
        >
          <div className="prose prose-sm max-w-none">
            {renderFormattedContent(displayedContent)}
            
            {isLoading && (
              <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
            )}
          </div>
        </ScrollArea>

        {latency && !isLoading && (
          <div className="pt-4 mt-4 border-t border-border/50">
            <LatencyDisplay latency={latency} operation="AI Generation" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
