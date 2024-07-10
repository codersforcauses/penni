import Image from "next/image";
import React, { FormEvent, useCallback, useEffect, useState } from "react";

interface WriteInFormData {
  subject: string;
  description: string;
  imgs?: string[];
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

  const handleInputChange = useCallback(() => {
    const isFormReady = subject.trim() !== "" && description.trim() !== "";
    onFormDataChange({ subject, description, imgs: [] }); // imgs handling can be added later
  }, [subject, description, onFormDataChange]);

  useEffect(() => {
    handleInputChange();
  }, [subject, description, handleInputChange]);

  return (
    <div id="write-in" className="p-4 body">
      <div className="mb-4">
        <input
          type="text"
          id="subject"
          placeholder="Subject"
          className="px-2 py-1  text-penni-text-regular-light-mode"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <hr className="my-4 mx-2 bg-penni-background-input-light-mode" />
      <div className="mb-4">
        <textarea
          id="description"
          placeholder="Description"
          className="px-2 py-1  text-penni-text-regular-light-mode"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {imgUpload ? (
        <>
          <hr className="my-4 mx-2 bg-penni-background-input-light-mode" />
          <div>{/* Image upload handling can be added here */}</div>
        </>
      ) : null}
    </div>
  );
};

export default WriteIn;
