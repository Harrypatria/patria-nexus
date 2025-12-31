import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Lock, User, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Welcome back",
        description: "Successfully authenticated. Redirecting to dashboard.",
      });
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid username or password.",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {/* Hero Section */}
      <div className="w-full max-w-md mb-8 text-center animate-fade-in">
        <div className="bg-hero-gradient rounded-2xl p-8 text-primary-foreground shadow-professional-lg mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="h-10 w-10" />
            <h1 className="font-heading text-2xl md:text-3xl font-bold">
              AI Health Copilot Pro
            </h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">
            Advanced Multi-Disease Prediction System
          </p>
          <p className="text-primary-foreground/70 text-sm mt-2">
            Powered by Machine Learning and Generative AI
          </p>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md card-professional animate-fade-in-up">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="font-heading text-2xl text-center">
            Authentication Required
          </CardTitle>
          <CardDescription className="text-center">
            Please enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="status-error flex items-center gap-2 text-sm animate-fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 input-professional"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 input-professional"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary-gradient font-semibold h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              Agentic AI Masterclass Project
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Copyright 2026 Harry Patria - Patria & Co.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <a 
          href="https://www.patriaco.co.uk" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          www.patriaco.co.uk
        </a>
      </div>
    </div>
  );
}
