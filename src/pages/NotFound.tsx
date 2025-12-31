import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
        </div>
        <h1 className="font-heading text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/dashboard">
          <Button className="bg-primary-gradient gap-2">
            <Home className="h-4 w-4" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
