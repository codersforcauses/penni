import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export interface WriteInFormData {
  subject: string;
  description: string;
  imgs?: File[];
}

interface WriteInProps {
  imgUpload?: boolean;
  maxImgs?: number;
  onFormDataChange: (data: WriteInFormData) => void;
}

const WriteIn: React.FC<WriteInProps> = ({
  imgUpload = false,
  maxImgs = 0,
  onFormDataChange,
}) => {
  const [formData, setFormData] = useState<WriteInFormData>({
    subject: "",
    description: "",
    imgs: [],
  });
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);
  const onFormDataChangeRef = useRef(onFormDataChange); // Must use ref as alternatives causes infinite errors in console

  // Update the current ref whenever the onFormDataChange callback changes
  useEffect(() => {
    onFormDataChangeRef.current = onFormDataChange;
  }, [onFormDataChange]);

  // Call onFormDataChange whenever formData changes
  useEffect(() => {
    onFormDataChangeRef.current(formData);
  }, [formData]);

  // Handle file change for image uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, imgs: selectedFiles }));
    }
  };

  // Generate image previews and clean up URLs
  useEffect(() => {
    if (formData.imgs?.length) {
      const previews = formData.imgs.map((img) => URL.createObjectURL(img));
      setImgPreviews(previews);

      // Clean up the URLs when component unmounts or imgs change
      // Without this the uploaded image was flickering
      return () => {
        previews.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [formData.imgs]);

  // Handle input and textarea changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="write-in" className="body bg-penni-background-light-mode p-4">
      <div className="mb-4">
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          className="px-1 py-1.5 text-penni-text-regular-light-mode"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      <hr className="mx-1 my-4 bg-penni-text-regular-dark-mode" />
      <div className="mb-4">
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          className="w-full px-1 py-1.5 text-penni-text-regular-light-mode"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      {imgUpload && (
        <>
          <hr className="mx-1 my-4 bg-penni-text-regular-dark-mode" />
          <div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            <div className="flex flex-wrap">
              {imgPreviews.map((preview, index) => (
                <div key={index} className="relative mb-2 mr-2 h-24 w-24">
                  <Image
                    src={preview}
                    alt={`uploaded-img-${index}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WriteIn;
