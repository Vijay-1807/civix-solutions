import { useState } from 'react';
import { createSubscriber } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Newsletter() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await createSubscriber(data);
      toast({
        title: 'Subscribed!',
        description: 'Thank you for subscribing!',
      });
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Subscription failed.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="w-full py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h2 className={cn("text-4xl md:text-5xl font-bold tracking-tight font-headline text-foreground")}>
              Subscribe to Our Newsletter
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground leading-relaxed">
              Stay updated with our latest projects, news, and insights in the world of civil engineering. Join our community today.
            </p>
          </div>
          <div className="w-full max-w-md bg-background p-2 rounded-xl shadow-lg border">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-12"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 rounded-lg"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
          <p className="text-xs text-muted-foreground/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
