import { useState } from 'react';
import { Settings as SettingsIcon, Key, Bell, Shield, ExternalLink } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { PageHeader, SectionCard } from '@/components/ui-custom/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

export default function Settings() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySaved, setIsApiKeySaved] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      setIsApiKeySaved(true);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been configured successfully.",
      });
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Settings"
        description="Configure your application preferences and API integrations"
        icon={<SettingsIcon className="h-6 w-6" />}
      />

      {/* API Configuration */}
      <SectionCard className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Key className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold">API Configuration</h2>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">
          Enter your OpenAI API key to enable AI-powered health insights and personalized recommendations.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input-professional"
            />
          </div>
          <Button 
            onClick={handleSaveApiKey}
            className="bg-primary-gradient"
            disabled={!apiKey.trim()}
          >
            Save API Key
          </Button>
        </div>

        {isApiKeySaved && (
          <p className="text-sm text-success mt-3 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            API Key configured successfully
          </p>
        )}
      </SectionCard>

      {/* Preferences */}
      <SectionCard className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold">Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for health assessments and recommendations
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Data Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Share anonymized data to improve prediction accuracy
              </p>
            </div>
            <Switch
              checked={dataSharing}
              onCheckedChange={setDataSharing}
            />
          </div>
        </div>
      </SectionCard>

      {/* About Section */}
      <SectionCard>
        <h2 className="font-heading text-lg font-semibold mb-4">About</h2>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">AI Health Copilot Pro</strong> - Advanced Multi-Disease Prediction System
          </p>
          <p>Version 1.0.0 - Agentic AI Masterclass Project</p>
          <p>Copyright 2026 Harry Patria - Patria & Co.</p>
          
          <Separator className="my-4" />
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://www.patriaco.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Visit Website
              <ExternalLink className="h-3 w-3" />
            </a>

            <Dialog>
              <DialogTrigger asChild>
                <button className="text-primary hover:underline">
                  Privacy Policy
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-heading">Privacy Policy</DialogTitle>
                  <DialogDescription>
                    Last updated: January 2026
                  </DialogDescription>
                </DialogHeader>
                <div className="text-sm text-muted-foreground space-y-3 max-h-[400px] overflow-y-auto">
                  <p>
                    AI Health Copilot Pro is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
                  </p>
                  <p>
                    <strong>Data Collection:</strong> We collect health data you provide for predictions. This data is processed locally and not stored permanently.
                  </p>
                  <p>
                    <strong>API Usage:</strong> When using AI features, your data is sent to OpenAI for processing. No personal identifiers are included.
                  </p>
                  <p>
                    <strong>Security:</strong> All data transmissions are encrypted. We do not sell or share your personal information.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="text-primary hover:underline">
                  Terms of Service
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-heading">Terms of Service</DialogTitle>
                  <DialogDescription>
                    Last updated: January 2026
                  </DialogDescription>
                </DialogHeader>
                <div className="text-sm text-muted-foreground space-y-3 max-h-[400px] overflow-y-auto">
                  <p>
                    By using AI Health Copilot Pro, you agree to these terms of service.
                  </p>
                  <p>
                    <strong>Medical Disclaimer:</strong> This application provides health risk assessments for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
                  </p>
                  <p>
                    <strong>Usage:</strong> You agree to use this application responsibly and not rely solely on its predictions for medical decisions.
                  </p>
                  <p>
                    <strong>Liability:</strong> Patria & Co. is not liable for any health outcomes resulting from the use of this application.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SectionCard>
    </DashboardLayout>
  );
}
