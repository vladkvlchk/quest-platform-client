"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";

import { Button } from "@/components/ui";

interface UploadImageFormProps {
  onImagesChange: (files: File[]) => void;
  maxImages?: number;
}

export function UploadImageForm({
  onImagesChange,
  maxImages = 5,
}: UploadImageFormProps) {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImages].slice(0, maxImages);
        onImagesChange(updatedImages.map((img) => img.file));
        return updatedImages;
      });
    },
    [maxImages, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: maxImages,
  });

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      onImagesChange(updatedImages.map((img) => img.file));
      return updatedImages;
    });
  };

  return (
    <div className="space-y-4">
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-gray-300 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the images here ...</p>
          ) : (
            <p>
              Drag &apos;n&apos; drop some images here, or click to select
              images
            </p>
          )}
        </div>
      )}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.preview || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
