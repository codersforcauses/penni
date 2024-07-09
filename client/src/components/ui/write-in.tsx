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
    <div id="write-in" className="p-4">
      <div className="mb-4">
        <input
          type="text"
          id="subject"
          placeholder="Subject"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <textarea
          id="description"
          placeholder="Description"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {imgUpload ? (
        <>
          <hr className="my-4" />
          <div>{/* Image upload handling can be added here */}</div>
        </>
      ) : null}
    </div>
  );
};

export default WriteIn;
