import { useEffect, useState } from 'react';
import { getClients } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Client {
  _id: string;
  name: string;
  designation: string;
  description: string;
  image: string;
}

export function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error("Failed to load clients", error);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  return (
    <section id="clients" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className={cn("text-3xl font-bold tracking-tighter sm:text-5xl font-headline")}>Happy Clients</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are proud to have partnered with a diverse range of clients. Here's what they have to say about our work.
            </p>
          </div>
        </div>
        {loading ? (
          <p className="text-center mt-12">Loading clients...</p>
        ) : clients.length > 0 ? (
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {clients.map((client) => (
              <Card key={client._id} className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col border-none bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8 flex-grow flex flex-col justify-between relative">
                  <div className="absolute top-6 right-8 text-6xl text-primary/10 font-serif leading-none select-none">"</div>
                  <blockquote className="text-lg text-foreground/80 italic font-medium leading-relaxed mb-6 relative z-10">
                    {client.description}
                  </blockquote>
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                    <Avatar className="h-14 w-14 border-2 border-primary/20 ring-2 ring-background">
                      <AvatarImage src={client.image} alt={client.name} className="object-cover" />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="font-bold font-headline text-lg text-primary">{client.name}</p>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide text-xs">{client.designation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground mt-12">No client testimonials yet.</p>
        )}
      </div>
    </section>
  );
}
