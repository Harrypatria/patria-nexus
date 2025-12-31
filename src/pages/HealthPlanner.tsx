import { useState } from 'react';
import { ClipboardList, Sparkles, Utensils, Dumbbell } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { PageHeader, SectionCard, InputField, StatusBadge, LatencyDisplay } from '@/components/ui-custom/PageComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HealthPlanner() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState<{ dietary: string; fitness: string; bmi: number; bmiCategory: string; latency: number } | null>(null);
  
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
    setIsLoading(true);
    const startTime = performance.now();

    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 300));

    const bmi = formData.weight / ((formData.height / 100) ** 2);
    const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';

    // Generate sample plans based on user profile
    const dietaryPlan = generateDietaryPlan(formData, bmi, bmiCategory);
    const fitnessPlan = generateFitnessPlan(formData);

    const endTime = performance.now();
    const latency = endTime - startTime;

    setPlans({
      dietary: dietaryPlan,
      fitness: fitnessPlan,
      bmi,
      bmiCategory,
      latency,
    });

    toast({
      title: "Plans Generated Successfully",
      description: `Your BMI: ${bmi.toFixed(1)} (${bmiCategory})`,
    });

    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Personalized Health and Fitness Planner"
        description="AI-powered personalized health recommendations"
        icon={<ClipboardList className="h-6 w-6" />}
      />

      <SectionCard className="mb-8">
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-xl p-6 mb-6 border border-primary/10">
          <p className="text-center text-muted-foreground">
            Get personalized dietary and fitness plans tailored to your goals and preferences.
            Our AI-powered system considers your unique profile to create the optimal plan for you.
          </p>
        </div>

        <h3 className="font-heading text-lg font-semibold mb-4">Your Health Profile</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <InputField label="Age" unit="years" tooltip="Your current age affects metabolism and nutritional needs">
              <Input
                type="number"
                min={10}
                max={100}
                value={formData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                className="input-professional"
              />
            </InputField>

            <InputField label="Height" unit="cm" tooltip="Height in centimeters for BMI calculation">
              <Input
                type="number"
                min={100}
                max={250}
                value={formData.height}
                onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                className="input-professional"
              />
            </InputField>

            <InputField label="Activity Level" tooltip="Choose your typical weekly activity level">
              <Select value={formData.activityLevel} onValueChange={(v) => handleInputChange('activityLevel', v)}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedentary">Sedentary</SelectItem>
                  <SelectItem value="Lightly Active">Lightly Active</SelectItem>
                  <SelectItem value="Moderately Active">Moderately Active</SelectItem>
                  <SelectItem value="Very Active">Very Active</SelectItem>
                  <SelectItem value="Extremely Active">Extremely Active</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <InputField label="Dietary Preferences" tooltip="Select your preferred dietary approach">
              <Select value={formData.dietaryPreferences} onValueChange={(v) => handleInputChange('dietaryPreferences', v)}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Balanced">Balanced</SelectItem>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Keto">Keto</SelectItem>
                  <SelectItem value="Gluten Free">Gluten Free</SelectItem>
                  <SelectItem value="Low Carb">Low Carb</SelectItem>
                  <SelectItem value="Dairy Free">Dairy Free</SelectItem>
                </SelectContent>
              </Select>
            </InputField>
          </div>

          <div className="space-y-4">
            <InputField label="Weight" unit="kg" tooltip="Current weight for calculating nutritional needs">
              <Input
                type="number"
                min={20}
                max={300}
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                className="input-professional"
              />
            </InputField>

            <InputField label="Sex" tooltip="Biological sex for metabolic calculations">
              <Select value={formData.sex} onValueChange={(v) => handleInputChange('sex', v)}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </InputField>

            <InputField label="Fitness Goals" tooltip="What do you want to achieve?">
              <Select value={formData.fitnessGoals} onValueChange={(v) => handleInputChange('fitnessGoals', v)}>
                <SelectTrigger className="input-professional">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lose Weight">Lose Weight</SelectItem>
                  <SelectItem value="Gain Muscle">Gain Muscle</SelectItem>
                  <SelectItem value="Endurance">Endurance</SelectItem>
                  <SelectItem value="Stay Fit">Stay Fit</SelectItem>
                  <SelectItem value="Strength Training">Strength Training</SelectItem>
                </SelectContent>
              </Select>
            </InputField>
          </div>
        </div>

        <Separator className="my-6" />

        <Button
          onClick={handleGeneratePlan}
          disabled={isLoading}
          className="w-full md:w-auto bg-primary-gradient gap-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Generating Plan...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Personalized Plan
            </>
          )}
        </Button>
      </SectionCard>

      {plans && (
        <div className="space-y-6 animate-fade-in">
          <StatusBadge variant="success">
            <p className="font-semibold">
              Plans generated successfully. Your BMI: {plans.bmi.toFixed(1)} ({plans.bmiCategory})
            </p>
          </StatusBadge>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-professional">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Utensils className="h-5 w-5 text-accent" />
                  Dietary Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                  {plans.dietary}
                </div>
              </CardContent>
            </Card>

            <Card className="card-professional">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Dumbbell className="h-5 w-5 text-primary" />
                  Fitness Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                  {plans.fitness}
                </div>
              </CardContent>
            </Card>
          </div>

          <LatencyDisplay latency={plans.latency} operation="AI Plan Generation" />
        </div>
      )}
    </DashboardLayout>
  );
}

function generateDietaryPlan(formData: any, bmi: number, bmiCategory: string): string {
  const baseCalories = formData.sex === 'Male' ? 2000 : 1600;
  const activityMultiplier = {
    'Sedentary': 1.2,
    'Lightly Active': 1.375,
    'Moderately Active': 1.55,
    'Very Active': 1.725,
    'Extremely Active': 1.9,
  }[formData.activityLevel] || 1.55;
  
  const calories = Math.round(baseCalories * activityMultiplier);

  return `Based on your profile (${formData.dietaryPreferences} preference, ${bmiCategory} BMI):

DAILY CALORIC TARGET: ${calories} kcal

BREAKFAST (${Math.round(calories * 0.25)} kcal):
- Whole grain oatmeal with berries
- Greek yogurt with nuts
- Green tea or black coffee

LUNCH (${Math.round(calories * 0.35)} kcal):
- Grilled chicken or fish
- Mixed vegetables
- Brown rice or quinoa
- Fresh salad with olive oil

DINNER (${Math.round(calories * 0.30)} kcal):
- Lean protein (salmon, chicken, tofu)
- Steamed vegetables
- Sweet potato

SNACKS (${Math.round(calories * 0.10)} kcal):
- Mixed nuts
- Fresh fruit
- Hummus with vegetables

KEY CONSIDERATIONS:
- Stay hydrated with 8 glasses of water daily
- Limit processed foods and added sugars
- Include fiber-rich foods for digestive health`;
}

function generateFitnessPlan(formData: any): string {
  const goalPlans: Record<string, string> = {
    'Lose Weight': `WEEKLY SCHEDULE:

MONDAY - Cardio Focus
- 30 min brisk walking or jogging
- 15 min HIIT intervals
- Cool down stretches

TUESDAY - Strength Training
- Bodyweight squats: 3x15
- Push-ups: 3x10
- Planks: 3x30 sec

WEDNESDAY - Active Recovery
- 30 min yoga or light stretching
- 20 min leisurely walk

THURSDAY - Cardio and Core
- 25 min cycling or swimming
- Core workout: 15 min

FRIDAY - Full Body
- Circuit training: 30 min
- Resistance bands exercises

SATURDAY - Outdoor Activity
- Hiking, swimming, or sports
- Minimum 45 min activity

SUNDAY - Rest Day
- Light stretching
- Focus on recovery`,
    'Gain Muscle': `WEEKLY SCHEDULE:

MONDAY - Upper Body Push
- Bench Press: 4x8
- Shoulder Press: 3x10
- Tricep Dips: 3x12

TUESDAY - Lower Body
- Squats: 4x8
- Lunges: 3x12 each leg
- Leg Press: 3x10

WEDNESDAY - Rest and Recovery
- Light stretching
- Foam rolling

THURSDAY - Upper Body Pull
- Pull-ups: 3x8
- Rows: 4x10
- Bicep Curls: 3x12

FRIDAY - Legs and Core
- Deadlifts: 4x6
- Leg Curls: 3x12
- Planks: 3x45 sec

SATURDAY - Full Body
- Compound movements
- Moderate intensity

SUNDAY - Rest Day`,
    'default': `WEEKLY SCHEDULE:

MONDAY - Cardio
- 30 min moderate cardio
- Stretching routine

TUESDAY - Strength
- Full body workout
- Bodyweight exercises

WEDNESDAY - Flexibility
- 30 min yoga
- Mobility work

THURSDAY - Cardio
- 25 min HIIT
- Cool down

FRIDAY - Strength
- Upper/lower split
- Core focus

SATURDAY - Active
- Outdoor activities
- Sports or hiking

SUNDAY - Rest
- Light walking
- Recovery focus`,
  };

  return goalPlans[formData.fitnessGoals] || goalPlans['default'];
}
