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
import { useApiKey } from '@/contexts/ApiKeyContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

export default function Settings() {
  const { toast } = useToast();
  const { apiKey, setApiKey, isApiKeySet } = useApiKey();
  const [inputKey, setInputKey] = useState(apiKey);
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleSaveApiKey = () => {
    if (inputKey.trim()) {
      setApiKey(inputKey.trim());
      toast({ title: "API Key Saved", description: "Your OpenAI API key has been configured successfully." });
    }
  };

  const handleClearApiKey = () => {
    setApiKey('');
    setInputKey('');
    toast({ title: "API Key Cleared", description: "Your API key has been removed." });
  };

  return (
    <DashboardLayout>
      <PageHeader title="Settings" description="Configure your application preferences and API integrations" icon={<SettingsIcon className="h-6 w-6" />} />

      <SectionCard className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Key className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold">OpenAI API Configuration</h2>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">
          Enter your OpenAI API key to enable AI-powered health insights, prediction explanations, and personalized recommendations using GPT-4.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input type="password" placeholder="sk-..." value={inputKey} onChange={(e) => setInputKey(e.target.value)} className="input-professional" />
          </div>
          <Button onClick={handleSaveApiKey} className="bg-primary-gradient" disabled={!inputKey.trim()}>Save API Key</Button>
          {isApiKeySet && <Button variant="outline" onClick={handleClearApiKey}>Clear</Button>}
        </div>

        {isApiKeySet && (
          <p className="text-sm text-success mt-3 flex items-center gap-2">
            <Shield className="h-4 w-4" />API Key configured successfully
          </p>
        )}
      </SectionCard>

      <SectionCard className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold">Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive alerts for health assessments</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Data Sharing</Label>
              <p className="text-sm text-muted-foreground">Share anonymized data to improve predictions</p>
            </div>
            <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="font-heading text-lg font-semibold mb-4">About</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p><strong className="text-foreground">AI Health Copilot Pro</strong> - Advanced Multi-Disease Prediction System</p>
          <p>Version 1.0.0 - Agentic AI Masterclass Project</p>
          <p>Copyright 2026 Harry Patria - Patria & Co.</p>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-4">
            <a href="https://www.patriaco.co.uk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">Visit Website<ExternalLink className="h-3 w-3" /></a>
            <Dialog>
              <DialogTrigger asChild><button className="text-primary hover:underline">Privacy Policy</button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle className="font-heading">Privacy Policy</DialogTitle><DialogDescription>Last updated: January 2026</DialogDescription></DialogHeader>
                <div className="text-sm text-muted-foreground space-y-3 max-h-[400px] overflow-y-auto">
                  <p>AI Health Copilot Pro is committed to protecting your privacy.</p>
                  <p><strong>Data Collection:</strong> Health data is processed locally and sent to OpenAI for AI features only.</p>
                  <p><strong>Security:</strong> All transmissions are encrypted. We do not sell your data.</p>
                </div>
                <DialogFooter><Button variant="outline">Close</Button></DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild><button className="text-primary hover:underline">Terms of Service</button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle className="font-heading">Terms of Service</DialogTitle><DialogDescription>Last updated: January 2026</DialogDescription></DialogHeader>
                <div className="text-sm text-muted-foreground space-y-3 max-h-[400px] overflow-y-auto">
                  <p><strong>Medical Disclaimer:</strong> This application provides health risk assessments for educational purposes only.</p>
                  <p><strong>Liability:</strong> Patria & Co. is not liable for health outcomes from using this application.</p>
                </div>
                <DialogFooter><Button variant="outline">Close</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SectionCard>
    </DashboardLayout>
  );
}
