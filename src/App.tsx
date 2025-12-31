import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DiabetesPrediction from "./pages/DiabetesPrediction";
import HeartDiseasePrediction from "./pages/HeartDiseasePrediction";
import ParkinsonsPrediction from "./pages/ParkinsonsPrediction";
import HealthPlanner from "./pages/HealthPlanner";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ApiKeyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/diabetes" element={<ProtectedRoute><DiabetesPrediction /></ProtectedRoute>} />
              <Route path="/heart-disease" element={<ProtectedRoute><HeartDiseasePrediction /></ProtectedRoute>} />
              <Route path="/parkinsons" element={<ProtectedRoute><ParkinsonsPrediction /></ProtectedRoute>} />
              <Route path="/health-planner" element={<ProtectedRoute><HealthPlanner /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ApiKeyProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
