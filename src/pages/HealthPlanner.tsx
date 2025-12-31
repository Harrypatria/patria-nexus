import { useState } from 'react';
import { ClipboardList, Sparkles, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { PageHeader, SectionCard, InputField, StatusBadge } from '@/components/ui-custom/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKey } from '@/contexts/ApiKeyContext';
import { getHealthPlanWithAI } from '@/lib/openai';
import AIChatOutput from '@/components/AIChatOutput';

export default function HealthPlanner() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { apiKey, isApiKeySet } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState<string>('');
  const [latency, setLatency] = useState<number | null>(null);
  const [bmiInfo, setBmiInfo] = useState<{ bmi: number; category: string } | null>(null);
  
  const [formData, setFormData] = useState({
    age: 50,
    weight: 70,
    height: 175,
    sex: 'Male',
    activityLevel: 'Moderately Active',
    dietaryPreferences: 'Balanced',
    fitnessGoals: 'Stay Fit',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePlan = async () => {
    if (!isApiKeySet) {
      toast({
        title: "API Key Required",
        description: "Please configure your OpenAI API key in Settings.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAiPlan('');
    setLatency(null);

    const bmi = formData.weight / ((formData.height / 100) ** 2);
    const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
    setBmiInfo({ bmi, category: bmiCategory });

    try {
      const result = await getHealthPlanWithAI(
        apiKey,
        { ...formData, bmi, bmiCategory },
        (chunk) => setAiPlan(prev => prev + chunk)
      );
      setLatency(result.latency);
      toast({ title: "Plan Generated", description: `Your BMI: ${bmi.toFixed(1)} (${bmiCategory})` });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to generate plan',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="AI Health and Fitness Planner"
        description="GPT-4 powered personalized health recommendations with chain-of-thought reasoning"
        icon={<ClipboardList className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard>
          <h3 className="font-heading text-lg font-semibold mb-4">Your Health Profile</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Age" unit="years">
                <Input type="number" min={10} max={100} value={formData.age} onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)} className="input-professional" />
              </InputField>
              <InputField label="Weight" unit="kg">
                <Input type="number" min={20} max={300} value={formData.weight} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)} className="input-professional" />
              </InputField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Height" unit="cm">
                <Input type="number" min={100} max={250} value={formData.height} onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)} className="input-professional" />
              </InputField>
              <InputField label="Sex">
                <Select value={formData.sex} onValueChange={(v) => handleInputChange('sex', v)}>
                  <SelectTrigger className="input-professional"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </InputField>
            </div>

            <InputField label="Activity Level">
              <Select value={formData.activityLevel} onValueChange={(v) => handleInputChange('activityLevel', v)}>
                <SelectTrigger className="input-professional"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedentary">Sedentary</SelectItem>
                  <SelectItem value="Lightly Active">Lightly Active</SelectItem>
                  <SelectItem value="Moderately Active">Moderately Active</SelectItem>
                  <SelectItem value="Very Active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <InputField label="Dietary Preferences">
              <Select value={formData.dietaryPreferences} onValueChange={(v) => handleInputChange('dietaryPreferences', v)}>
                <SelectTrigger className="input-professional"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Balanced">Balanced</SelectItem>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Keto">Keto</SelectItem>
                  <SelectItem value="Low Carb">Low Carb</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <InputField label="Fitness Goals">
              <Select value={formData.fitnessGoals} onValueChange={(v) => handleInputChange('fitnessGoals', v)}>
                <SelectTrigger className="input-professional"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lose Weight">Lose Weight</SelectItem>
                  <SelectItem value="Gain Muscle">Gain Muscle</SelectItem>
                  <SelectItem value="Stay Fit">Stay Fit</SelectItem>
                  <SelectItem value="Endurance">Endurance</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <Separator className="my-4" />

            {!isApiKeySet ? (
              <Card className="border-warning/20 bg-warning/5">
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-3">Configure OpenAI API key to generate AI-powered health plans.</p>
                  <Button variant="outline" onClick={() => navigate('/settings')} className="gap-2">
                    <Key className="h-4 w-4" />Configure API Key
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Button onClick={handleGeneratePlan} disabled={isLoading} className="w-full bg-primary-gradient gap-2" size="lg">
                {isLoading ? <><span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Generating...</> : <><Sparkles className="h-4 w-4" />Generate AI Health Plan</>}
              </Button>
            )}
          </div>
        </SectionCard>

        <div className="space-y-4">
          {bmiInfo && (
            <StatusBadge variant={bmiInfo.category === 'Normal' ? 'success' : bmiInfo.category === 'Overweight' ? 'warning' : 'info'}>
              <p className="font-semibold">BMI: {bmiInfo.bmi.toFixed(1)} ({bmiInfo.category})</p>
            </StatusBadge>
          )}
          <AIChatOutput content={aiPlan} isLoading={isLoading} latency={latency} title="Your Personalized Health Plan" />
        </div>
      </div>
    </DashboardLayout>
  );
}
