import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/api';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageCropper } from '@/components/ui/image-cropper';
import { X } from 'lucide-react';

export function AddClientForm() {
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
        description: "Please select and crop an image for the client.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set('image', imageFile);

    try {
      await createClient(formData);
      toast({
        title: 'Success!',
        description: 'Client added successfully.',
      });
      formRef.current?.reset();
      clearImage();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to add client.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Client Name</Label>
        <Input id="name" name="name" placeholder="e.g., Jane Smith" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="designation">Designation</Label>
        <Input id="designation" name="designation" placeholder="e.g., CEO, ACME Inc." required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Testimonial</Label>
        <Textarea id="description" name="description" placeholder="Write the client's testimonial here..." required />
      </div>
      <div className="space-y-2">
        <Label>Client Image (Aspect Ratio: 1:1)</Label>
        {previewUrl ? (
          <div className="relative w-32 h-32 bg-muted rounded-full overflow-hidden group border mx-auto">
            <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-6 w-6 p-0"
              onClick={clearImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <ImageCropper aspect={1} onCropComplete={handleCropComplete} />
        )}
      </div>
      <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
        {loading ? 'Adding Client...' : 'Add Client'}
      </Button>
    </form>
  );
}
