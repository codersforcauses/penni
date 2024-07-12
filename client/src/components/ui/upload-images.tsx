import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface UploadImageProps {
  onImagesChange: (files: File[]) => void;
  showPreviews?: boolean;
  maxImgs?: number;
}

/**
 * UploadImages component allows users to upload images and shows previews if enabled.
 *
 * @param {UploadImageProps} props - The props for the component.
 * @param {function} props.onImagesChange - Callback function that gets called when images change.
 * @param {boolean} [props.showPreviews=true] - Whether to show image previews. (OPTIONAL) (DEFAULT: True)
 * @param {number} [props.maxImgs=Infinity] - Maximum number of images that can be uploaded. (OPTIONAL) (DEFAULT: Infinity)
 * @returns {JSX.Element} The UploadImages component.
 * 
 * @example
 * <UploadImages
      onImagesChange={handleFileChange}
      showPreviews={showImagePreviews}
      maxImgs={maxImgs}
    />
 */
export default function UploadImages({
  onImagesChange,
  showPreviews = true,
  maxImgs = Infinity,
}: UploadImageProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate image previews and clean up URLs
  useEffect(() => {
    if (showPreviews) {
      if (images.length) {
        const previewsArray = images.map((file) => URL.createObjectURL(file));
        setPreviews(previewsArray);

        // Clean up the URLs when component unmounts or imgs change
        // Without this the uploaded image was flickering
        return () => {
          previewsArray.forEach((url) => URL.revokeObjectURL(url));
        };
      } else {
        setPreviews([]); // Clear previews if there are no images
      }
    }
  }, [images, showPreviews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length <= maxImgs) {
        const newImages = [...images, ...selectedFiles];
        setImages(newImages);
        onImagesChange(newImages);
      } else {
        alert(`You can only upload a maximum of ${maxImgs} images.`);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
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
            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-opacity hover:opacity-100"
              onClick={() => handleRemoveImage(index)}
            >
              <Image
                src="/icons/delete.svg"
                alt="Remove an image."
                width={32}
                height={32}
              />
            </div>
          </div>
        ))}
      {images.length < maxImgs && (
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
      )}
    </div>
  );
}
