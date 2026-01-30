
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { X, Upload, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface ImageCropperProps {
    onCropComplete: (file: File) => void;
    aspect?: number;
}

export function ImageCropper({ onCropComplete, aspect = 9 / 7 }: ImageCropperProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [fileName, setFileName] = useState<string>("");

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFileName(file.name);
            const reader = new FileReader();
            reader.addEventListener('load', () => setImageSrc(reader.result as string));
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels
            );
            if (croppedImage) {
                // Determine a name for the cropped file
                const newFile = new File([croppedImage], fileName || 'cropped.jpg', { type: "image/jpeg" });
                onCropComplete(newFile);
                setImageSrc(null); // Clear cropper to show we are done, parent handles display
            }
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels, onCropComplete, fileName]);

    const handleCancel = () => {
        setImageSrc(null);
        setFileName("");
    }

    if (!imageSrc) {
        return (
            <div className="flex flex-col gap-2">
                <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg border-muted-foreground/25 hover:bg-muted/50 transition-colors">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload image</span>
                    </div>
                    <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className="hidden"
                    />
                </Label>
            </div>
        );
    }

    return (
        <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
            <div className="relative w-full h-[400px] bg-black/90 rounded-md overflow-hidden">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onCropComplete={handleCropComplete}
                    onZoomChange={setZoom}
                />
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm w-12 text-muted-foreground">Zoom</span>
                <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.1}
                    onValueChange={(value: number[]) => setZoom(value[0])}
                    className="flex-1"
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                </Button>
                <Button size="sm" onClick={showCroppedImage}>
                    <Check className="w-4 h-4 mr-2" />
                    Apply Crop
                </Button>
            </div>
        </div>
    );
}
