import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface UploadImageProps {
  onImagesChange: (files: File[]) => void;
  showPreviews?: boolean;
}

export default function UploadImages({
  onImagesChange,
  showPreviews = true,
}: UploadImageProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate image previews and clean up URLs
  useEffect(() => {
    if (showPreviews && images.length) {
      const previewsArray = images.map((file) => URL.createObjectURL(file));
      setPreviews(previewsArray);

      // Clean up the URLs when component unmounts or imgs change
      // Without this the uploaded image was flickering
      return () => {
        previewsArray.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [images, showPreviews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
      onImagesChange([...images, ...selectedFiles]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-wrap items-center">
      {showPreviews &&
        previews.map((preview, index) => (
          <div key={index} className="relative mb-2 mr-2 h-24 w-24">
            <Image
              src={preview}
              alt={`uploaded-img-${index}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      <button
        type="button"
        onClick={handleClick}
        className="relative mb-2 mr-2 flex h-24 w-24 items-center justify-center rounded-md border border-dashed border-gray-400"
      >
        <Image
          src="/icons/upload_image.svg"
          alt="Upload an image."
          width={32}
          height={32}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
      </button>
    </div>
  );
}
