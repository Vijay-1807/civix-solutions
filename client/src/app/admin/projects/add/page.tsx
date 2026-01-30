import { AddProjectForm } from "@/components/admin/AddProjectForm";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/admin/projects"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className={cn("text-2xl font-bold font-headline")}>Add New Project</h1>
          <p className="text-muted-foreground">Fill in the details to add a new project to your portfolio.</p>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <AddProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
