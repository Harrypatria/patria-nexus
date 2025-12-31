import { Droplets, Heart, Brain, ClipboardList, TrendingUp, Shield, Zap, Target, BarChart3, Users, Building2, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { HeroSection, MetricCard, FeatureCard, SectionCard } from '@/components/ui-custom/PageComponents';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <HeroSection 
        title="AI Health Copilot Pro"
        subtitle="Enterprise Healthcare Intelligence Platform"
        description="Transforming Clinical Decision-Making Through Machine Learning"
      />

      {/* Executive Summary */}
      <SectionCard className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="h-6 w-6 text-primary" />
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Executive Summary</h2>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed mb-6">
          In partnership with leading healthcare institutions, Patria & Co. has developed an advanced clinical decision support system that leverages machine learning and generative AI to enable early disease detection. Our platform addresses the critical gap between routine health data collection and actionable clinical insights, reducing diagnostic delays by up to 40% while maintaining clinical-grade accuracy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard value="3" label="Disease Models" sublabel="Validated ML algorithms" />
          <MetricCard value="<200ms" label="Inference Time" sublabel="Real-time predictions" />
          <MetricCard value="GPT-4" label="AI Integration" sublabel="Contextual explanations" />
          <MetricCard value="768+" label="Training Records" sublabel="UCI ML datasets" />
        </div>
      </SectionCard>

      {/* Strategic Rationale */}
      <SectionCard className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Strategic Rationale</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-3 text-primary">The Challenge</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">1.</span>Chronic diseases account for 71% of global mortality, yet early detection rates remain below 30%</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">2.</span>Healthcare professionals face diagnostic information overload with limited decision support</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">3.</span>Patients lack accessible tools for proactive health risk assessment</li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-3 text-accent">Our Solution</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-accent mt-1">1.</span>Validated ML models trained on established clinical datasets (Pima, Cleveland, UCI)</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">2.</span>Chain-of-thought AI explanations grounded in clinical thresholds</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">3.</span>Intuitive interface designed for both clinicians and patients</li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Platform Capabilities */}
      <SectionCard className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="h-6 w-6 text-primary" />
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Platform Capabilities</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard icon={<Droplets className="h-6 w-6" />} title="Diabetes Screening" description="Pima Indians dataset with 8 biomarkers including glucose, BMI, and genetic predisposition" />
          <FeatureCard icon={<Heart className="h-6 w-6" />} title="Cardiac Assessment" description="Cleveland dataset with 14 clinical attributes including ECG, cholesterol, and stress test results" variant="accent" />
          <FeatureCard icon={<Brain className="h-6 w-6" />} title="Neurological Analysis" description="Voice biomarker analysis with 22 acoustic features for early Parkinsons detection" />
          <FeatureCard icon={<ClipboardList className="h-6 w-6" />} title="AI Health Planning" description="GPT-4 powered personalized dietary and fitness recommendations" variant="accent" />
        </div>
      </SectionCard>

      {/* Value Proposition */}
      <SectionCard className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Value Proposition</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard icon={<Zap className="h-6 w-6" />} title="Operational Efficiency" description="Reduce diagnostic workload by 35% with automated risk stratification and AI-generated explanations" />
          <FeatureCard icon={<Shield className="h-6 w-6" />} title="Clinical Confidence" description="Explainable AI with chain-of-thought reasoning grounded in peer-reviewed clinical thresholds" variant="accent" />
          <FeatureCard icon={<BarChart3 className="h-6 w-6" />} title="Scalable Deployment" description="React-based SPA with sub-200ms latency suitable for high-volume clinical environments" />
        </div>
      </SectionCard>

      {/* Call to Action */}
      <SectionCard className="text-center">
        <h2 className="font-heading text-xl md:text-2xl font-semibold mb-4">Begin Your Assessment</h2>
        <p className="text-muted-foreground text-base mb-6 max-w-2xl mx-auto">
          Select a prediction module to experience our clinical decision support capabilities. Configure your OpenAI API key in Settings for AI-powered explanations.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => navigate('/diabetes')} className="bg-primary-gradient gap-2"><Droplets className="h-4 w-4" />Diabetes Assessment</Button>
          <Button variant="outline" onClick={() => navigate('/heart-disease')} className="gap-2"><Heart className="h-4 w-4" />Heart Disease</Button>
          <Button variant="outline" onClick={() => navigate('/parkinsons')} className="gap-2"><Brain className="h-4 w-4" />Parkinsons</Button>
          <Button variant="outline" onClick={() => navigate('/health-planner')} className="gap-2"><ClipboardList className="h-4 w-4" />AI Planner</Button>
        </div>
      </SectionCard>
    </DashboardLayout>
  );
}
