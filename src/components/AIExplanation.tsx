import { useState } from 'react';
import { Bot, Sparkles, AlertCircle, Key, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKey } from '@/contexts/ApiKeyContext';
import { useNavigate } from 'react-router-dom';
import { getAIExplanation, PredictionData } from '@/lib/openai';
import { LatencyDisplay } from '@/components/ui-custom/PageComponents';
import { cn } from '@/lib/utils';

interface AIExplanationProps {
  predictionData: PredictionData;
  className?: string;
}

export default function AIExplanation({ predictionData, className }: AIExplanationProps) {
  const { apiKey, isApiKeySet } = useApiKey();
  const navigate = useNavigate();
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetExplanation = async () => {
    if (!isApiKeySet) return;
    
    setIsLoading(true);
    setError(null);
    setExplanation('');
    
    try {
      const result = await getAIExplanation(
        apiKey,
        predictionData,
        (chunk) => {
          setExplanation(prev => prev + chunk);
        }
      );
      setLatency(result.latency);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get AI explanation');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isApiKeySet) {
    return (
      <Card className={cn("card-professional border-warning/20 bg-warning/5", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 font-heading text-lg">
            <Key className="h-5 w-5 text-warning" />
            API Key Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Configure your OpenAI API key in Settings to enable AI-powered explanations for your health assessments.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/settings')}
            className="gap-2"
          >
            <Key className="h-4 w-4" />
            Configure API Key
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("card-professional", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-heading text-lg">
          <Bot className="h-5 w-5 text-primary" />
          AI-Powered Explanation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!explanation && !isLoading && !error && (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm mb-4">
              Get a detailed, context-aware explanation of your prediction results powered by OpenAI GPT-4.
            </p>
            <Button
              onClick={handleGetExplanation}
              className="bg-primary-gradient gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate AI Explanation
            </Button>
          </div>
        )}

        {isLoading && !explanation && (
          <div className="flex items-center justify-center gap-3 py-8">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Analyzing with AI...</span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">Error</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGetExplanation}
                className="mt-3"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {explanation && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none text-foreground">
              <div className="whitespace-pre-wrap leading-relaxed text-sm">
                {explanation.split('\n').map((line, i) => {
                  // Skip empty lines or render them as spacers
                  if (!line.trim()) return <div key={i} className="h-2" />;

                  // Check if line looks like a header (all caps or previously markdown)
                  const isHeader = line === line.toUpperCase() && line.length > 5 && !line.includes('.');

                  // Strip any lingering markdown just in case (bold, bullets, headers)
                  const cleanLine = line.replace(/\*\*/g, '').replace(/^-\s/, '').replace(/^#+\s/, '');

                  return (
                    <p 
                      key={i} 
                      className={cn(
                        "py-1",
                        isHeader ? "font-semibold text-primary mt-4 mb-1" : "text-muted-foreground"
                      )}
                    >
                      {cleanLine}
                    </p>
                  );
                })}
              </div>
            </div>
            
            {isLoading && (
              <div className="flex items-center gap-2 text-primary">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Generating...</span>
              </div>
            )}

            {latency && !isLoading && (
              <div className="pt-2 border-t border-border/50">
                <LatencyDisplay latency={latency} operation="AI Explanation Generation" />
              </div>
            )}

            {!isLoading && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleGetExplanation}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Regenerate
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
