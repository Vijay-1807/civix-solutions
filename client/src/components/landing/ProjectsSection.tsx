import { useEffect, useState } from 'react';
import { getProjects } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className={cn("text-3xl font-bold tracking-tighter sm:text-5xl font-headline")}>Our Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our portfolio of successfully completed civil engineering projects that stand as a testament to our quality and commitment.
            </p>
          </div>
        </div>
        {loading ? (
          <p className="text-center mt-12">Loading projects...</p>
        ) : projects.length > 0 ? (
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {projects.map((project) => (
              <Card key={project._id} className="group overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-0 overflow-hidden">
                  <div className="aspect-[4/3] relative w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="secondary" className="font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <CardTitle className="font-headline text-2xl mb-2 group-hover:text-primary transition-colors">{project.name}</CardTitle>
                    <div className="h-1 w-12 bg-primary rounded-full mb-4" />
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</p>
                  </div>
                  <Button variant="ghost" className="w-full justify-between hover:text-primary group/btn">
                    Learn More
                    <span className="text-xl group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground mt-12">No projects to display yet. Check back soon!</p>
        )}
      </div>
    </section>
  );
}
