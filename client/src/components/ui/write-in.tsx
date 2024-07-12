import React, { useEffect, useRef, useState } from "react";

import UploadImages from "./upload-images";

export interface WriteInFormData {
  subject: string;
  description: string;
  imgs?: File[];
  maxImgs?: number;
}

interface WriteInProps {
  onFormDataChange: (data: WriteInFormData) => void;
  imgUpload?: boolean;
  maxImgs?: number;
  showImagePreviews?: boolean;
  className?: string;
}

/**
 * WriteIn component allows users to input a subject, description, and optionally upload images.
 *
 * @param {WriteInProps} props - The props for the component.
 * @param {function} props.onFormDataChange - Callback function that gets called when form data changes.
 * @param {boolean} [props.imgUpload=false] - Whether to allow image uploads. (OPTIONAL) (DEFAULT: False)
 * @param {number} [props.maxImgs] - Maximum number of images that can be uploaded. (OPTIONAL)
 * @param {boolean} [props.showImagePreviews] - Whether to show image previews. (OPTIONAL)
 * @param {string} [props.className] - Additional CSS classes to apply to the component. (OPTIONAL)
 * @returns {JSX.Element} The WriteIn component.
 *
 * @example
 * <WriteIn
      imgUpload={true}
      onFormDataChange={handleFormDataChange}
      className="flex-grow"
      maxImgs={5}
   />
 */
export default function WriteIn({
  imgUpload = false,
  onFormDataChange,
  className,
  showImagePreviews,
  maxImgs,
}: WriteInProps) {
  const [formData, setFormData] = useState<WriteInFormData>({
    subject: "",
    description: "",
    imgs: [],
  });

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
  const handleFileChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, imgs: files }));
  };

  // Handle input and textarea changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      id="write-in"
      className={`body flex flex-col bg-penni-background-light-mode p-4 ${className}`}
    >
      <div className="my-1 grow-0 flex-col">
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          className="w-full px-2 py-4 text-penni-text-regular-light-mode"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      <hr className="mx-1 my-4 grow-0 bg-penni-text-regular-dark-mode" />
      <div className="my-1 flex min-h-40 flex-grow flex-col">
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          className="w-full flex-grow resize-none px-2 py-4 text-penni-text-regular-light-mode"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      {imgUpload && (
        <>
          <hr className="mx-1 my-4 grow-0 bg-penni-text-regular-dark-mode" />
          <UploadImages
            onImagesChange={handleFileChange}
            showPreviews={showImagePreviews}
            maxImgs={maxImgs}
          />
        </>
      )}
    </div>
  );
}
