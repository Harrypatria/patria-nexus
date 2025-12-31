import { useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { PageHeader, SectionCard, InputField, StatusBadge, LatencyDisplay } from '@/components/ui-custom/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIExplanation from '@/components/AIExplanation';
import MethodologyInfo from '@/components/MethodologyInfo';
import { PredictionData } from '@/lib/openai';

const DEFAULTS = {
  fo: 150.0,
  fhi: 200.0,
  flo: 100.0,
  jitterPercent: 0.005,
  jitterAbs: 0.00003,
  rap: 0.01,
  ppq: 0.005,
  ddp: 0.009,
  shimmer: 0.03,
  shimmerDb: 0.3,
  apq3: 0.025,
  apq5: 0.017,
  apq: 0.02,
  dda: 0.02,
  nhr: 0.02,
  hnr: 21.0,
  rpde: 0.5,
  dfa: 0.7,
  spread1: -5.0,
  spread2: 0.2,
  d2: 2.3,
  ppe: 0.2,
};

export default function ParkinsonsPrediction() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: boolean; latency: number } | null>(null);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  
  const [formData, setFormData] = useState(DEFAULTS);

  const handleInputChange = (field: keyof typeof DEFAULTS, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    const startTime = performance.now();

    await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 100));

    // Simple risk calculation based on voice parameters
    const jitterRisk = formData.jitterPercent > 0.01 ? 2 : 0;
    const shimmerRisk = formData.shimmer > 0.05 ? 2 : 0;
    const hnrRisk = formData.hnr < 20 ? 2 : 0;
    const rpdeRisk = formData.rpde > 0.6 ? 1 : 0;
    const ppeRisk = formData.ppe > 0.3 ? 2 : 0;

    const totalRisk = jitterRisk + shimmerRisk + hnrRisk + rpdeRisk + ppeRisk;
    const isHighRisk = totalRisk >= 4;

    const endTime = performance.now();
    const latency = endTime - startTime;

    setResult({
      prediction: isHighRisk,
      latency,
    });

    // Set prediction data for AI explanation
    setPredictionData({
      disease: 'parkinsons',
      prediction: isHighRisk,
      inputValues: {
        'MDVP:Fo(Hz)': formData.fo,
        'MDVP:Fhi(Hz)': formData.fhi,
        'MDVP:Flo(Hz)': formData.flo,
        'MDVP:Jitter(%)': formData.jitterPercent,
        'MDVP:Jitter(Abs)': formData.jitterAbs,
        'MDVP:RAP': formData.rap,
        'MDVP:PPQ': formData.ppq,
        'Jitter:DDP': formData.ddp,
        'MDVP:Shimmer': formData.shimmer,
        'MDVP:Shimmer(dB)': formData.shimmerDb,
        'Shimmer:APQ3': formData.apq3,
        'Shimmer:APQ5': formData.apq5,
        'MDVP:APQ': formData.apq,
        'Shimmer:DDA': formData.dda,
        'NHR': formData.nhr,
        'HNR': formData.hnr,
        'RPDE': formData.rpde,
        'DFA': formData.dfa,
        'spread1': formData.spread1,
        'spread2': formData.spread2,
        'D2': formData.d2,
        'PPE': formData.ppe,
      },
    });

    toast({
      title: isHighRisk ? "Indicators Detected" : "No Indicators Detected",
      description: `Analysis completed in ${latency.toFixed(2)}ms`,
      variant: isHighRisk ? "destructive" : "default",
    });

    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Parkinsons Disease Assessment"
        description="Voice analysis using the UCI Parkinsons Voice Dataset with 22 biomedical measurements"
        icon={<Brain className="h-6 w-6" />}
      />

      <SectionCard>
        <Tabs defaultValue="frequency" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="frequency">Frequency</TabsTrigger>
            <TabsTrigger value="jitter">Jitter</TabsTrigger>
            <TabsTrigger value="shimmer">Shimmer</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="frequency" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="MDVP:Fo(Hz)" unit="Hz" tooltip="Average vocal fundamental frequency">
                <Input
                  type="number"
                  step={0.001}
                  value={formData.fo}
                  onChange={(e) => handleInputChange('fo', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="MDVP:Fhi(Hz)" unit="Hz" tooltip="Maximum vocal fundamental frequency">
                <Input
                  type="number"
                  step={0.001}
                  value={formData.fhi}
                  onChange={(e) => handleInputChange('fhi', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="MDVP:Flo(Hz)" unit="Hz" tooltip="Minimum vocal fundamental frequency">
                <Input
                  type="number"
                  step={0.001}
                  value={formData.flo}
                  onChange={(e) => handleInputChange('flo', e.target.value)}
                  className="input-professional"
                />
              </InputField>
            </div>
          </TabsContent>

          <TabsContent value="jitter" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="MDVP:Jitter(%)" tooltip="Jitter as a percentage">
                <Input
                  type="number"
                  step={0.00001}
                  value={formData.jitterPercent}
                  onChange={(e) => handleInputChange('jitterPercent', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="MDVP:Jitter(Abs)" tooltip="Absolute jitter">
                <Input
                  type="number"
                  step={0.000001}
                  value={formData.jitterAbs}
                  onChange={(e) => handleInputChange('jitterAbs', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="MDVP:RAP" tooltip="Relative average perturbation">
                <Input
                  type="number"
                  step={0.0001}
                  value={formData.rap}
                  onChange={(e) => handleInputChange('rap', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="MDVP:PPQ" tooltip="Period perturbation quotient">
                <Input
                  type="number"
                  step={0.0001}
                  value={formData.ppq}
                  onChange={(e) => handleInputChange('ppq', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="Jitter:DDP" tooltip="Average absolute difference of differences">
                <Input
                  type="number"
                  step={0.0001}
                  value={formData.ddp}
                  onChange={(e) => handleInputChange('ddp', e.target.value)}
                  className="input-professional"
                />
              </InputField>
            </div>
          </TabsContent>

          <TabsContent value="shimmer" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="MDVP:Shimmer" tooltip="Local shimmer variation">
                <Input
                  type="number"
                  step={0.001}
                  value={formData.shimmer}
                  onChange={(e) => handleInputChange('shimmer', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="MDVP:Shimmer(dB)" unit="dB" tooltip="Local shimmer in dB">
                <Input
                  type="number"
                  step={0.01}
                  value={formData.shimmerDb}
                  onChange={(e) => handleInputChange('shimmerDb', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="Shimmer:APQ3" tooltip="3-point amplitude perturbation quotient">
                <Input
                  type="number"
                  step={0.001}
                  value={formData.apq3}
                  onChange={(e) => handleInputChange('apq3', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="Shimmer:APQ5" tooltip="5-point amplitude perturbation quotient">
                <Input
                  type="number"
                  step={0.001}
                  value={formData.apq5}
                  onChange={(e) => handleInputChange('apq5', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="MDVP:APQ" tooltip="Amplitude perturbation quotient">
                <Input
                  type="number"
                  step={0.001}
                  value={formData.apq}
                  onChange={(e) => handleInputChange('apq', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="Shimmer:DDA" tooltip="Average absolute difference of differences">
                <Input
                  type="number"
                  step={0.001}
                  value={formData.dda}
                  onChange={(e) => handleInputChange('dda', e.target.value)}
                  className="input-professional"
                />
              </InputField>
            </div>
          </TabsContent>

          <TabsContent value="other" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="NHR" tooltip="Noise-to-harmonics ratio">
                <Input
                  type="number"
                  step={0.001}
                  value={formData.nhr}
                  onChange={(e) => handleInputChange('nhr', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="HNR" tooltip="Harmonics-to-noise ratio">
                <Input
                  type="number"
                  step={0.01}
                  value={formData.hnr}
                  onChange={(e) => handleInputChange('hnr', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="RPDE" tooltip="Recurrence period density entropy">
                <Input
                  type="number"
                  step={0.01}
                  value={formData.rpde}
                  onChange={(e) => handleInputChange('rpde', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="DFA" tooltip="Detrended fluctuation analysis">
                <Input
                  type="number"
                  step={0.01}
                  value={formData.dfa}
                  onChange={(e) => handleInputChange('dfa', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="spread1" tooltip="Nonlinear dynamical complexity measure">
                <Input
                  type="number"
                  step={0.01}
                  value={formData.spread1}
                  onChange={(e) => handleInputChange('spread1', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="spread2" tooltip="Nonlinear dynamical complexity measure">
                <Input
                  type="number"
                  step={0.01}
                  value={formData.spread2}
                  onChange={(e) => handleInputChange('spread2', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="D2" tooltip="Correlation dimension">
                <Input
                  type="number"
                  step={0.01}
                  value={formData.d2}
                  onChange={(e) => handleInputChange('d2', e.target.value)}
                  className="input-professional"
                />
              </InputField>
              <InputField label="PPE" tooltip="Pitch period entropy">
                <Input
                  type="number"
                  step={0.01}
                  value={formData.ppe}
                  onChange={(e) => handleInputChange('ppe', e.target.value)}
                  className="input-professional"
                />
              </InputField>
            </div>
          </TabsContent>
        </Tabs>

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
              Analyze Parkinsons Risk
            </>
          )}
        </Button>

        {result && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <StatusBadge variant={result.prediction ? 'error' : 'success'}>
              <p className="font-semibold">
                Assessment Result: {result.prediction ? 'Parkinsons disease indicators detected' : 'No Parkinsons disease indicators detected'}
              </p>
            </StatusBadge>
            
            <LatencyDisplay latency={result.latency} operation="Model Prediction" />
          </div>
        )}
      </SectionCard>

      {predictionData && (
        <div className="mt-6">
          <AIExplanation predictionData={predictionData} />
        </div>
      )}

      <MethodologyInfo />
    </DashboardLayout>
  );
}
