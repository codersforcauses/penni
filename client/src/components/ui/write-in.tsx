import Image from "next/image";
import React, { FormEvent, useState } from "react";

interface formData {
  subject: string;
  description: string;
  imgs?: string[];
}

interface WriteInProps {
  imgUpload?: boolean;
  maxImgs?: number;
  onFormStateChange: (state: boolean) => {};
}

const WriteIn: React.FC<WriteInProps> = ({
  imgUpload = false,
  maxImgs = 0,
  onFormStateChange,
}) => {
  return (
    <div id="write-in">
      <div></div>
      <div></div>
      {imgUpload ? (
        <>
          <hr />
          <div></div>
        </>
      ) : null}
    </div>
  );
};

export default WriteIn;
