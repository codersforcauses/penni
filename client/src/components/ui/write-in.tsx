import Image from "next/image";
import React, { FormEvent, useCallback, useEffect, useState } from "react";

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
  const [subject, setSubject] = useState("test");
  const [description, setDescription] = useState("");
  const [imgs, setImgs] = useState<File[]>([]);
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);

  const handleInputChange = useCallback(() => {
    const isFormReady = subject.trim() !== "" && description.trim() !== "";
    onFormDataChange({ subject, description, imgs });
  }, [subject, description, imgs, onFormDataChange]);

  useEffect(() => {
    handleInputChange();
  }, [subject, description, imgs, handleInputChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImgs(selectedFiles);
    }
  };

  useEffect(() => {
    if (imgs.length) {
      const previews = imgs.map((img) => URL.createObjectURL(img));
      setImgPreviews(previews);

      // Clean up the URLs when component unmounts or imgs change
      // Without this the uploaded image was flickering
      return () => {
        previews.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [imgs]);

  return (
    <div id="write-in" className="body bg-penni-background-light-mode p-4">
      <div className="mb-4">
        <input
          type="text"
          id="subject"
          placeholder="Subject"
          className="px-1 py-1.5 text-penni-text-regular-light-mode"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <hr className="mx-1 my-4 bg-penni-text-regular-dark-mode" />
      <div className="mb-4">
        <textarea
          id="description"
          placeholder="Description"
          className="w-full px-1 py-1.5 text-penni-text-regular-light-mode"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
