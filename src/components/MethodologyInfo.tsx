import { Info, Database, Brain, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MethodologyInfo() {
  return (
    <Card className="card-professional mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-heading text-lg">
          <Info className="h-5 w-5 text-primary" />
          Methodology & System Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="datasource">
            <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span>Data Source</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              This system utilizes the <strong>UCI Machine Learning Repository</strong> datasets (e.g., Cleveland Heart Disease, Parkinsons Voice Dataset, Pima Indians Diabetes). These validated clinical datasets provide the foundation for our predictive models, ensuring high-quality and research-backed inputs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="algorithm">
            <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-muted-foreground" />
                <span>Algorithm & Model</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Our predictions are powered by <strong>Supervised Learning Classification</strong> algorithms. The system analyzes input features against historical patterns in the training data to classify risk levels. The AI explanation layer uses advanced Large Language Models (LLM) to interpret these classification results in plain English.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ethics">
            <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                <span>Ethics, Limitations & Recommendations</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              <div className="space-y-2">
                <p>
                  <strong>Limitations:</strong> This tool is a decision support system, not a diagnostic device. It operates based on statistical probabilities from specific datasets and may not account for all individual health variables or recent medical advancements.
                </p>
                <p>
                  <strong>Ethics:</strong> We prioritize data privacy and transparency. User data is processed for real-time analysis and is not permanently stored for training purposes without explicit consent.
                </p>
                <p>
                  <strong>Recommendation:</strong> Always consult with a qualified healthcare professional. Do not disregard professional medical advice or delay seeking it because of information provided by this system.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-4 pt-4 border-t border-border/50 text-center">
             <p className="text-xs text-muted-foreground">Version 2.0.0 | Patria & Co. Data, AI and Strategy Consultant</p>
        </div>
      </CardContent>
    </Card>
  );
}
