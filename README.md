# Patria & Co. Data, AI and Strategy Consultant
### AI Health Copilot Pro (Harry Patria 2026)

Advanced Multi-Disease Prediction System powered by Machine Learning and Generative AI.

## Features
- **Multi-Disease Prediction**: Heart Disease, Parkinson's, and Diabetes risk assessment.
- **AI Explanations**: GPT-4o powered plain-text explanations for every prediction.
- **Interactive Health Planner**: Personalized health recommendations.
- **Professional UI**: "Big Four" consultant style design with responsive layouts.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: Shadcn/UI, Lucide React
- **AI Integration**: OpenAI API
- **Visualization**: Recharts

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd patria-nexus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (optional, or use UI for API key):
   ```env
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Version Control & Git Setup
1. Initialize a new git repository:
   ```bash
   git init
   ```

2. Add files to staging:
   ```bash
   git add .
   ```

3. Commit your changes:
   ```bash
   git commit -m "Initial commit of Patria & Co. Health AI"
   ```

4. Create a new repository on GitHub (or your preferred provider).

5. Link your local repo and push:
   ```bash
   git remote add origin <your-repository-url>
   git branch -M main
   git push -u origin main
   ```

## Deployment

### Vercel (Recommended)
This project is optimized for Vercel.
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Follow the prompts. The included `vercel.json` handles routing.

### Docker
Build and run the container locally:

```bash
# Build the image
docker build -t patria-health-ai .

# Run the container
docker run -p 8080:80 patria-health-ai
```
Access at `http://localhost:8080`.

## Methodology
- **Data Sources**: Validated datasets from the [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/index.php).
- **Algorithms**: Supervised Classification (Random Forest/Logistic Regression logic implemented in frontend for demo purposes).
- **Ethics**: Educational tool only. Not for medical diagnosis.

## Version
Version 2.0.0 - Harry Patria 2026
