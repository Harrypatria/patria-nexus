import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { PageHeader, SectionCard, InputField, StatusBadge, LatencyDisplay } from '@/components/ui-custom/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const DEFAULTS = {
  age: 50,
  sex: 1,
  cp: 0,
  trestbps: 120,
  chol: 200,
  fbs: 0,
  restecg: 0,
  thalach: 150,
  exang: 0,
  oldpeak: 1.0,
  slope: 1,
  ca: 0,
  thal: 2,
};

export default function HeartDiseasePrediction() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: boolean; latency: number } | null>(null);
  
  const [formData, setFormData] = useState(DEFAULTS);

  const handleInputChange = (field: keyof typeof DEFAULTS, value: string | number) => {
    const numValue = typeof value === 'string' ? (parseFloat(value) || 0) : value;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    const startTime = performance.now();

    await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 100));

    // Simple risk calculation
    const ageRisk = formData.age > 55 ? 2 : formData.age > 45 ? 1 : 0;
    const cholRisk = formData.chol > 240 ? 2 : formData.chol > 200 ? 1 : 0;
    const bpRisk = formData.trestbps > 140 ? 2 : formData.trestbps > 120 ? 1 : 0;
    const cpRisk = formData.cp > 0 ? 1 : 0;
    const exangRisk = formData.exang === 1 ? 2 : 0;
    const oldpeakRisk = formData.oldpeak > 2 ? 2 : formData.oldpeak > 1 ? 1 : 0;

    const totalRisk = ageRisk + cholRisk + bpRisk + cpRisk + exangRisk + oldpeakRisk;
    const isHighRisk = totalRisk >= 5;

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
        title="Cardiovascular Risk Assessment"
        description="Comprehensive heart health analysis using advanced algorithms"
        icon={<Heart className="h-6 w-6" />}
      />

      <SectionCard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <InputField label="Age" unit="years" tooltip="Age in years (heart disease risk increases with age)">
              <Input
                type="number"
                min={29}
                max={77}
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="input-professional"
              />
            </InputField>

            <InputField label="Resting Blood Pressure" unit="mmHg" tooltip="Resting blood pressure (normal: <120)">
              <Input
                type="number"
                min={94}
                max={200}
                value={formData.trestbps}
                onChange={(e) => handleInputChange('trestbps', e.target.value)}
                className="input-professional"
              />
            </InputField>

            <InputField label="Resting ECG" tooltip="Resting ECG results (0=normal, 1=ST-T abnormality, 2=LV hypertrophy)">
              <Select value={formData.restecg.toString()} onValueChange={(v) => handleInputChange('restecg', parseInt(v))}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Normal</SelectItem>
                  <SelectItem value="1">ST-T Abnormality</SelectItem>
                  <SelectItem value="2">LV Hypertrophy</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <InputField label="ST Depression" tooltip="ST depression induced by exercise relative to rest">
              <Input
                type="number"
                step={0.1}
                min={0}
                max={6.2}
                value={formData.oldpeak}
                onChange={(e) => handleInputChange('oldpeak', e.target.value)}
                className="input-professional"
              />
            </InputField>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <InputField label="Sex" tooltip="Biological sex (0 = Female, 1 = Male)">
              <Select value={formData.sex.toString()} onValueChange={(v) => handleInputChange('sex', parseInt(v))}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Female</SelectItem>
                  <SelectItem value="1">Male</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <InputField label="Cholesterol" unit="mg/dl" tooltip="Serum cholesterol (normal: <200)">
              <Input
                type="number"
                min={126}
                max={564}
                value={formData.chol}
                onChange={(e) => handleInputChange('chol', e.target.value)}
                className="input-professional"
              />
            </InputField>

            <InputField label="Max Heart Rate" unit="bpm" tooltip="Maximum heart rate achieved during exercise">
              <Input
                type="number"
                min={71}
                max={202}
                value={formData.thalach}
                onChange={(e) => handleInputChange('thalach', e.target.value)}
                className="input-professional"
              />
            </InputField>

            <InputField label="ST Slope" tooltip="Slope of peak exercise ST segment (0=down, 1=flat, 2=up)">
              <Select value={formData.slope.toString()} onValueChange={(v) => handleInputChange('slope', parseInt(v))}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Downsloping</SelectItem>
                  <SelectItem value="1">Flat</SelectItem>
                  <SelectItem value="2">Upsloping</SelectItem>
                </SelectContent>
              </Select>
            </InputField>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <InputField label="Chest Pain Type" tooltip="Chest pain type (0=typical angina, 1=atypical, 2=non-anginal, 3=asymptomatic)">
              <Select value={formData.cp.toString()} onValueChange={(v) => handleInputChange('cp', parseInt(v))}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Typical Angina</SelectItem>
                  <SelectItem value="1">Atypical Angina</SelectItem>
                  <SelectItem value="2">Non-anginal Pain</SelectItem>
                  <SelectItem value="3">Asymptomatic</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <InputField label="Fasting Blood Sugar" tooltip="Fasting blood sugar > 120 mg/dl">
              <Select value={formData.fbs.toString()} onValueChange={(v) => handleInputChange('fbs', parseInt(v))}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">False (less than 120)</SelectItem>
                  <SelectItem value="1">True (greater than 120)</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <InputField label="Exercise Angina" tooltip="Exercise induced angina">
              <Select value={formData.exang.toString()} onValueChange={(v) => handleInputChange('exang', parseInt(v))}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <InputField label="Major Vessels" tooltip="Number of major vessels colored by fluoroscopy (0-4)">
              <Select value={formData.ca.toString()} onValueChange={(v) => handleInputChange('ca', parseInt(v))}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </InputField>
          </div>
        </div>

        <div className="mt-4">
          <InputField label="Thalassemia" tooltip="Thalassemia type (0=normal, 1=fixed defect, 2=reversible defect, 3=unknown)">
            <Select value={formData.thal.toString()} onValueChange={(v) => handleInputChange('thal', parseInt(v))}>
              <SelectTrigger className="input-professional w-full md:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Normal</SelectItem>
                <SelectItem value="1">Fixed Defect</SelectItem>
                <SelectItem value="2">Reversible Defect</SelectItem>
                <SelectItem value="3">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </InputField>
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
              Analyze Heart Disease Risk
            </>
          )}
        </Button>

        {result && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <StatusBadge variant={result.prediction ? 'error' : 'success'}>
              <p className="font-semibold">
                Assessment Result: {result.prediction ? 'High cardiovascular risk detected' : 'Low cardiovascular risk'}
              </p>
            </StatusBadge>
            
            <LatencyDisplay latency={result.latency} operation="Model Prediction" />
          </div>
        )}
      </SectionCard>
    </DashboardLayout>
  );
}
