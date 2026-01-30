import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createProject } from '@/lib/api';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageCropper } from '@/components/ui/image-cropper';
import { X } from 'lucide-react';

export function AddProjectForm() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleCropComplete = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      toast({
        title: "Image missing",
        description: "Please select and crop an image for the project.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    // Remove the empty file input field if present, though it's not strictly necessary as we are setting 'image' below
    // Set the cropped image file
    formData.set('image', imageFile);

    try {
      await createProject(formData);
      toast({
        title: 'Success!',
        description: 'Project added successfully.',
      });
      formRef.current?.reset();
      clearImage();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to add project.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" name="name" placeholder="e.g., Downtown Bridge Construction" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Describe the project..." required />
      </div>
      <div className="space-y-2">
        <Label>Project Image (Aspect Ratio: 450x350)</Label>
        {previewUrl ? (
          <div className="relative w-full max-w-md h-64 bg-muted rounded-md overflow-hidden group border">
            <img src={previewUrl} alt="Preview" className="object-contain w-full h-full" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <ImageCropper aspect={450 / 350} onCropComplete={handleCropComplete} />
        )}
      </div>
      <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
        {loading ? 'Adding Project...' : 'Add Project'}
      </Button>
    </form>
  );
}
