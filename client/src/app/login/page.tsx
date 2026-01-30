import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="flex items-center space-x-2 mb-8">
        <Building className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold font-headline">Civix Solutions</span>
      </div>
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className={cn("text-2xl font-headline")}>Admin Login</CardTitle>
          <CardDescription>Enter your password to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Welcome back! Click below to access the dashboard.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate('/admin')}
            >
              Enter Admin Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
      <Link to="/" className="mt-6 text-sm text-muted-foreground hover:text-primary transition-colors">
        &larr; Back to Home
      </Link>
    </div>
  );
}
