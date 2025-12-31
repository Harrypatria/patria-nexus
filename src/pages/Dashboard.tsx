import { Home, Droplets, Heart, Brain, ClipboardList, Users, FlaskConical, Building2, AlertTriangle, Timer, ShieldOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { HeroSection, MetricCard, FeatureCard, SectionCard } from '@/components/ui-custom/PageComponents';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <HeroSection 
        title="AI Health Copilot Pro"
        subtitle="Transforming Healthcare Through Intelligent Disease Prediction"
        description="Enterprise-Grade Health Analytics Platform"
      />

      {/* Problem Statement */}
      <SectionCard className="mb-8">
        <h2 className="font-heading text-xl md:text-2xl font-semibold mb-4">The Challenge</h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-6">
          Healthcare systems worldwide face critical challenges in early disease detection and risk assessment.
          Traditional diagnostic approaches often identify conditions at advanced stages, resulting in:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            icon={<AlertTriangle className="h-6 w-6" />}
            title="Delayed Diagnosis"
            description="Late-stage disease identification increases treatment complexity and costs"
            variant="warning"
          />
          <FeatureCard
            icon={<ShieldOff className="h-6 w-6" />}
            title="Limited Accessibility"
            description="Geographic and economic barriers restrict access to preventive health screening"
            variant="accent"
          />
          <FeatureCard
            icon={<Timer className="h-6 w-6" />}
            title="Resource Constraints"
            description="Healthcare professionals face overwhelming patient volumes and limited diagnostic tools"
          />
        </div>
      </SectionCard>

      {/* Solution Metrics */}
      <SectionCard className="mb-8">
        <h2 className="font-heading text-xl md:text-2xl font-semibold mb-6">Our Solution</h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          AI Health Copilot Pro leverages advanced machine learning algorithms and generative AI to provide
          rapid, accurate disease risk assessment and personalized health recommendations.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <MetricCard
            value="3"
            label="Disease Predictions"
            sublabel="Diabetes, Heart Disease, Parkinsons"
          />
          <MetricCard
            value="<50ms"
            label="Prediction Latency"
            sublabel="Real-time risk assessment"
          />
          <MetricCard
            value="AI-Powered"
            label="Health Insights"
            sublabel="Personalized recommendations"
          />
        </div>
      </SectionCard>

      {/* Technology Stack */}
      <SectionCard className="mb-8">
        <h2 className="font-heading text-xl md:text-2xl font-semibold mb-6">Technology Architecture</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon={<FlaskConical className="h-6 w-6" />}
            title="Machine Learning Engine"
            description="Scikit-learn framework with multiple algorithm ensemble, cross-validated models, and real-time inference optimization"
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="AI Integration"
            description="OpenAI GPT-4 API with natural language insights, personalized health plans, and contextual recommendations"
            variant="accent"
          />
        </div>
      </SectionCard>

      {/* Target Users */}
      <SectionCard className="mb-8">
        <h2 className="font-heading text-xl md:text-2xl font-semibold mb-6">Who Benefits</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            title="Healthcare Professionals"
            description="Clinical decision support and rapid screening tools"
          />
          <FeatureCard
            title="Patients"
            description="Accessible preventive health screening and personalized guidance"
            variant="accent"
          />
          <FeatureCard
            title="Researchers"
            description="Disease pattern analysis and predictive modeling insights"
          />
          <FeatureCard
            title="Health Systems"
            description="Population health management and resource optimization"
            variant="accent"
          />
        </div>
      </SectionCard>

      {/* Call to Action */}
      <SectionCard className="text-center">
        <h2 className="font-heading text-xl md:text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-muted-foreground text-base mb-6">
          Select a prediction module from the sidebar to begin your health assessment
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Button 
            onClick={() => navigate('/diabetes')}
            className="bg-primary-gradient gap-2"
          >
            <Droplets className="h-4 w-4" />
            Diabetes Assessment
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/heart-disease')}
            className="gap-2"
          >
            <Heart className="h-4 w-4" />
            Heart Disease
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/parkinsons')}
            className="gap-2"
          >
            <Brain className="h-4 w-4" />
            Parkinsons
          </Button>
        </div>
      </SectionCard>
    </DashboardLayout>
  );
}
