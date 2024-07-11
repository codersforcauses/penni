import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import WriteIn, { WriteInFormData } from "@/components/ui/write-in";

export default function Report() {
  const router = useRouter();
  const [formReady, setFormReady] = useState(false);
  const [formData, setFormData] = useState<WriteInFormData>({
    subject: "",
    description: "",
    imgs: [],
  });

  const handleFormDataChange = (data: WriteInFormData) => {
    setFormData(data);
    const formState =
      data.subject.trim() !== "" && data.description.trim() !== "";
    setFormReady(formState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formReady) {
      console.log("SUBMIT FORM");
      // Send submission to server....
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div id="report" className="bg-penni-background-input-light-mode">
      <div className="flex flex-row items-center justify-center bg-penni-background-light-mode px-4 pb-2 pt-6">
        <Button onClick={handleBackClick} variant="link">
          <Image
            src="/icons/arrow_back.svg"
            alt="Back"
            width={24}
            height={24}
          />
        </Button>
        <h2 className="body-medium flex-grow text-center">Report a problem</h2>
      </div>
      <div className="h-[0.12rem] bg-penni-background-input-light-mode pt-3"></div>
      <form onSubmit={handleSubmit}>
        <WriteIn imgUpload={true} onFormDataChange={handleFormDataChange} />
        <div className="h-0.5 bg-penni-background-input-light-mode pt-8"></div>
        <div className="mt-4 flex items-center justify-center rounded-t-3xl bg-penni-background-light-mode px-4 pt-4 shadow-[rgba(0,0,0,0.05)_0px_-10px_15px_0px]">
          <Button
            type="submit"
            className=""
            disabled={!formReady}
            variant="floating"
            size="penni"
          >
            Submit report
          </Button>
        </div>
      </form>
    </div>
  );
}
