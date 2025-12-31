// Dataset feature descriptions for grounding AI responses
export const DATASET_CONTEXT = {
  diabetes: {
    name: 'Pima Indians Diabetes Database',
    description: 'Originally from the National Institute of Diabetes and Digestive and Kidney Diseases. Contains 768 records of female patients of Pima Indian heritage.',
    features: {
      pregnancies: 'Number of times pregnant (0-17)',
      glucose: 'Plasma glucose concentration after 2-hour oral glucose tolerance test (0-199 mg/dL)',
      bloodPressure: 'Diastolic blood pressure (0-122 mm Hg)',
      skinThickness: 'Triceps skin fold thickness (0-99 mm)',
      insulin: '2-Hour serum insulin (0-846 mu U/ml)',
      bmi: 'Body mass index - weight in kg/(height in m)^2 (0-67.1)',
      pedigree: 'Diabetes pedigree function - genetic predisposition score (0.078-2.42)',
      age: 'Age in years (21-81)',
    },
    thresholds: {
      glucose: { normal: '<140', prediabetes: '140-199', diabetes: '>=200' },
      bmi: { underweight: '<18.5', normal: '18.5-24.9', overweight: '25-29.9', obese: '>=30' },
      bloodPressure: { normal: '<80', elevated: '80-89', high: '>=90' },
    },
  },
  heart: {
    name: 'Cleveland Heart Disease Dataset',
    description: 'From the UCI Machine Learning Repository. Contains 303 records with 14 attributes for heart disease prediction.',
    features: {
      age: 'Age in years (29-77)',
      sex: 'Sex (0 = female, 1 = male)',
      cp: 'Chest pain type (0=typical angina, 1=atypical, 2=non-anginal, 3=asymptomatic)',
      trestbps: 'Resting blood pressure in mm Hg (94-200)',
      chol: 'Serum cholesterol in mg/dl (126-564)',
      fbs: 'Fasting blood sugar > 120 mg/dl (0 = false, 1 = true)',
      restecg: 'Resting ECG results (0=normal, 1=ST-T abnormality, 2=LV hypertrophy)',
      thalach: 'Maximum heart rate achieved (71-202 bpm)',
      exang: 'Exercise induced angina (0 = no, 1 = yes)',
      oldpeak: 'ST depression induced by exercise relative to rest (0-6.2)',
      slope: 'Slope of peak exercise ST segment (0=downsloping, 1=flat, 2=upsloping)',
      ca: 'Number of major vessels colored by fluoroscopy (0-4)',
      thal: 'Thalassemia (0=normal, 1=fixed defect, 2=reversible defect, 3=unknown)',
    },
    thresholds: {
      cholesterol: { desirable: '<200', borderline: '200-239', high: '>=240' },
      bloodPressure: { normal: '<120', elevated: '120-129', high: '>=130' },
      heartRate: { low: '<60', normal: '60-100', high: '>100' },
    },
  },
  parkinsons: {
    name: 'Parkinsons Voice Dataset',
    description: 'From UCI ML Repository. Contains 195 voice recordings from 31 people, 23 with Parkinsons disease. Uses biomedical voice measurements.',
    features: {
      fo: 'MDVP:Fo(Hz) - Average vocal fundamental frequency',
      fhi: 'MDVP:Fhi(Hz) - Maximum vocal fundamental frequency',
      flo: 'MDVP:Flo(Hz) - Minimum vocal fundamental frequency',
      jitterPercent: 'MDVP:Jitter(%) - Frequency variation percentage',
      jitterAbs: 'MDVP:Jitter(Abs) - Absolute jitter in microseconds',
      rap: 'MDVP:RAP - Relative average perturbation',
      ppq: 'MDVP:PPQ - Five-point period perturbation quotient',
      shimmer: 'MDVP:Shimmer - Amplitude variation',
      shimmerDb: 'MDVP:Shimmer(dB) - Shimmer in decibels',
      nhr: 'NHR - Noise-to-harmonics ratio',
      hnr: 'HNR - Harmonics-to-noise ratio',
      rpde: 'RPDE - Recurrence period density entropy',
      dfa: 'DFA - Detrended fluctuation analysis',
      spread1: 'spread1 - Nonlinear dynamical complexity',
      spread2: 'spread2 - Nonlinear dynamical complexity',
      d2: 'D2 - Correlation dimension',
      ppe: 'PPE - Pitch period entropy',
    },
    thresholds: {
      hnr: { healthy: '>20', concerning: '15-20', abnormal: '<15' },
      jitter: { healthy: '<0.01', concerning: '0.01-0.02', abnormal: '>0.02' },
      shimmer: { healthy: '<0.04', concerning: '0.04-0.08', abnormal: '>0.08' },
    },
  },
};

export interface PredictionData {
  disease: 'diabetes' | 'heart' | 'parkinsons';
  prediction: boolean;
  inputValues: Record<string, number | string>;
}

function buildSystemPrompt(disease: 'diabetes' | 'heart' | 'parkinsons'): string {
  const context = DATASET_CONTEXT[disease];
  
  return `You are an expert medical AI assistant providing explanations for health risk assessments. You MUST base your explanations ONLY on the dataset context and input values provided. Do NOT hallucinate or make up information.

DATASET CONTEXT:
- Name: ${context.name}
- Description: ${context.description}

FEATURES AND THEIR MEANINGS:
${Object.entries(context.features).map(([key, desc]) => `- ${key}: ${desc}`).join('\n')}

CLINICAL THRESHOLDS:
${Object.entries(context.thresholds).map(([key, vals]) => `- ${key}: ${JSON.stringify(vals)}`).join('\n')}

RESPONSE GUIDELINES:
1. Write in CLEAR, PLAIN TEXT PARAGRAPHS.
2. DO NOT use any markdown formatting symbols like asterisks (**), bullet points (-), or bolding.
3. Structure your response into clear paragraphs separated by blank lines.
4. Provide a cohesive narrative rather than a list.
5. Identify the DATA SOURCE as "UCI Machine Learning Repository" and the ALGORITHM as "Supervised Learning (Classification)".
6. Always include a section on ETHICS AND LIMITATIONS.
7. Be concise but thorough (150-250 words).

FORMAT YOUR RESPONSE AS:
[Paragraph 1: Analysis Summary and Key Findings. Discuss the assessment result and significant values.]

[Paragraph 2: Risk Factors. Explain the contributing factors identified in the data.]

[Paragraph 3: Recommendations. Provide actionable next steps.]

[Paragraph 4: Methodology and Ethics. Mention the UCI Machine Learning Repository, Supervised Learning algorithm, and the educational nature of this tool (Ethics/Disclaimer).]`;
}

function buildUserPrompt(data: PredictionData): string {
  const predictionResult = data.prediction ? 'HIGH RISK' : 'LOW RISK';
  const diseaseNames = {
    diabetes: 'Diabetes',
    heart: 'Heart Disease',
    parkinsons: 'Parkinsons Disease',
  };
  
  return `The patient has been assessed for ${diseaseNames[data.disease]} risk.

PREDICTION RESULT: ${predictionResult}

INPUT VALUES PROVIDED:
${Object.entries(data.inputValues).map(([key, val]) => `${key}: ${val}`).join(', ')}

Please provide a detailed explanation of this prediction based on the input values and clinical thresholds. Remember to use PLAIN TEXT PARAGRAPHS only, NO markdown.`;
}

export async function getAIExplanation(
  apiKey: string,
  data: PredictionData,
  onChunk?: (chunk: string) => void
): Promise<{ text: string; latency: number }> {
  const startTime = performance.now();
  
  const systemPrompt = buildSystemPrompt(data.disease);
  const userPrompt = buildUserPrompt(data);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 800,
        stream: !!onChunk,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get AI response');
    }

    let text = '';
    
    if (onChunk && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                text += content;
                onChunk(content);
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }
    } else {
      const result = await response.json();
      text = result.choices[0].message.content;
    }

    const endTime = performance.now();
    return { text, latency: endTime - startTime };
  } catch (error) {
    throw error;
  }
}

export async function getHealthPlanWithAI(
  apiKey: string,
  profileData: {
    age: number;
    weight: number;
    height: number;
    sex: string;
    activityLevel: string;
    dietaryPreferences: string;
    fitnessGoals: string;
    bmi: number;
    bmiCategory: string;
  },
  onChunk?: (chunk: string) => void
): Promise<{ text: string; latency: number }> {
  const startTime = performance.now();

  const systemPrompt = `You are an expert health and fitness consultant. Create personalized, evidence-based health plans.

RESPONSE GUIDELINES:
1. Write in CLEAR, PLAIN TEXT PARAGRAPHS.
2. DO NOT use any markdown formatting symbols like asterisks (**), bullet points (-), or bolding.
3. Structure your response into clear paragraphs separated by blank lines.
4. Use CAPITALS for section headers if needed, but NO markdown.
5. Identify the DATA SOURCE as "UCI Machine Learning Repository" and the ALGORITHM as "Supervised Learning (Classification)".
6. Always include a section on ETHICS AND LIMITATIONS.

FORMAT YOUR RESPONSE AS:

PROFILE ANALYSIS
[Brief analysis of BMI, activity level, and goals]

PERSONALIZED DIETARY PLAN
[Daily caloric target, meal timing, food recommendations, hydration]

WEEKLY FITNESS SCHEDULE
[Day-by-day workout plan, exercise types, duration, intensity]

KEY SUCCESS FACTORS
[Top 3-5 actionable tips for success]

MEDICAL DISCLAIMER
Always consult a healthcare provider before starting any new diet or exercise program.`;

  const userPrompt = `Create a personalized health and fitness plan for the following profile:

- Age: ${profileData.age} years
- Weight: ${profileData.weight} kg
- Height: ${profileData.height} cm
- Sex: ${profileData.sex}
- BMI: ${profileData.bmi.toFixed(1)} (${profileData.bmiCategory})
- Activity Level: ${profileData.activityLevel}
- Dietary Preference: ${profileData.dietaryPreferences}
- Fitness Goal: ${profileData.fitnessGoals}

Generate a comprehensive, personalized health plan that considers all these factors.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 1500,
        stream: !!onChunk,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get AI response');
    }

    let text = '';
    
    if (onChunk && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                text += content;
                onChunk(content);
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }
    } else {
      const result = await response.json();
      text = result.choices[0].message.content;
    }

    const endTime = performance.now();
    return { text, latency: endTime - startTime };
  } catch (error) {
    throw error;
  }
}
