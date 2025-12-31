import { useState } from 'react';
import { Droplets, Sparkles } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { PageHeader, SectionCard, InputField, StatusBadge, LatencyDisplay } from '@/components/ui-custom/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Default values for normal health conditions
const DEFAULTS = {
  pregnancies: 2,
  glucose: 120,
  bloodPressure: 80,
  skinThickness: 20,
  insulin: 80,
  bmi: 25.0,
  pedigree: 0.5,
  age: 50,
};

export default function DiabetesPrediction() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: boolean; latency: number } | null>(null);
  
  const [formData, setFormData] = useState(DEFAULTS);

  const handleInputChange = (field: keyof typeof DEFAULTS, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    const startTime = performance.now();

    // Simulate ML prediction with realistic delay
    await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 100));

    // Simple risk calculation based on key factors
    const glucoseRisk = formData.glucose > 140 ? 2 : formData.glucose > 100 ? 1 : 0;
    const bmiRisk = formData.bmi > 30 ? 2 : formData.bmi > 25 ? 1 : 0;
    const ageRisk = formData.age > 45 ? 1 : 0;
    const pedigreeRisk = formData.pedigree > 0.5 ? 1 : 0;
    const insulinRisk = formData.insulin < 16 || formData.insulin > 166 ? 1 : 0;

    const totalRisk = glucoseRisk + bmiRisk + ageRisk + pedigreeRisk + insulinRisk;
    const isHighRisk = totalRisk >= 4;

    const endTime = performance.now();
    const latency = endTime - startTime;

    setResult({
      prediction: isHighRisk,
      latency,
    });

    toast({
      title: isHighRisk ? "High Risk Detected" : "Low Risk Detected",
      description: `Analysis completed in ${latency.toFixed(2)}ms`,
      variant: isHighRisk ? "destructive" : "default",
    });

    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Diabetes Risk Assessment"
        description="Machine learning-based analysis for diabetes prediction"
        icon={<Droplets className="h-6 w-6" />}
      />

      <SectionCard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <InputField
              label="Pregnancies"
              tooltip="Number of times pregnant (0 for never pregnant)"
            >
              <Input
                type="number"
                min={0}
                max={17}
                value={formData.pregnancies}
                onChange={(e) => handleInputChange('pregnancies', e.target.value)}
                className="input-professional"
              />
            </InputField>

            <InputField
              label="Skin Thickness"
              unit="mm"
              tooltip="Triceps skin fold thickness (normal: 12-23mm)"
            >
              <Input
                type="number"
                min={0}
                max={99}
                value={formData.skinThickness}
                onChange={(e) => handleInputChange('skinThickness', e.target.value)}
                className="input-professional"
              />
            </InputField>

            <InputField
              label="Diabetes Pedigree Function"
              tooltip="Genetic predisposition score (higher = more family history)"
            >
              <Input
                type="number"
                step={0.01}
                min={0}
                max={2.42}
                value={formData.pedigree}
                onChange={(e) => handleInputChange('pedigree', e.target.value)}
                className="input-professional"
              />
            </InputField>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <InputField
              label="Glucose Level"
              unit="mg/dL"
              tooltip="Plasma glucose after 2hr oral glucose tolerance test (normal: <140)"
            >
              <Input
                type="number"
                min={0}
                max={199}
                value={formData.glucose}
                onChange={(e) => handleInputChange('glucose', e.target.value)}
                className="input-professional"
              />
            </InputField>

            <InputField
              label="Insulin Level"
              unit="mu U/ml"
              tooltip="2-Hour serum insulin level (normal: 16-166)"
            >
              <Input
                type="number"
                min={0}
                max={846}
                value={formData.insulin}
                onChange={(e) => handleInputChange('insulin', e.target.value)}
                className="input-professional"
              />
            </InputField>

            <InputField
              label="Age"
              unit="years"
              tooltip="Age in years (diabetes risk increases with age)"
            >
              <Input
                type="number"
                min={21}
                max={81}
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="input-professional"
              />
            </InputField>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <InputField
              label="Blood Pressure"
              unit="mmHg"
              tooltip="Diastolic blood pressure (normal: <80)"
            >
              <Input
                type="number"
                min={0}
                max={122}
                value={formData.bloodPressure}
                onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                className="input-professional"
              />
            </InputField>

            <InputField
              label="BMI"
              unit="kg/m2"
              tooltip="Body Mass Index (normal: 18.5-24.9, overweight: 25-29.9)"
            >
              <Input
                type="number"
                step={0.1}
                min={0}
                max={67.1}
                value={formData.bmi}
                onChange={(e) => handleInputChange('bmi', e.target.value)}
                className="input-professional"
              />
            </InputField>
          </div>
        </div>

        <Separator className="my-6" />

        <Button
          onClick={handlePredict}
          disabled={isLoading}
          className="w-full md:w-auto bg-primary-gradient gap-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Analyze Diabetes Risk
            </>
          )}
        </Button>

        {result && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <StatusBadge variant={result.prediction ? 'error' : 'success'}>
              <p className="font-semibold">
                Assessment Result: {result.prediction ? 'High diabetes risk detected' : 'Low diabetes risk'}
              </p>
            </StatusBadge>
            
            <LatencyDisplay latency={result.latency} operation="Model Prediction" />
          </div>
        )}
      </SectionCard>
    </DashboardLayout>
  );
}
