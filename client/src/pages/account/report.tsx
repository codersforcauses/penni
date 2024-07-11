import Image from "next/image";
import React, { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import WriteIn, { WriteInFormData } from "@/components/ui/write-in";

export default function Report() {
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

  return (
    <div id="report" className="bg-penni-background-input-light-mode">
      <div className="flex flex-row items-center justify-center bg-penni-background-light-mode">
        {/* <Image src={} className="mr-auto"/> */}
        <h2 className="body-medium p-[1.1rem] pt-6 text-center">
          Report a problem
        </h2>
      </div>
      <div className="h-[0.12rem] bg-penni-background-input-light-mode pt-3"></div>
      <form onSubmit={handleSubmit}>
        <WriteIn imgUpload={true} onFormDataChange={handleFormDataChange} />
        <div className="h-0.5 bg-penni-background-input-light-mode pt-8"></div>
        <div className="mt-4 flex items-center justify-center rounded-t-3xl bg-penni-background-light-mode pt-4 shadow-[rgba(0,0,0,0.05)_0px_-10px_15px_0px]">
          <Button
            type="submit"
            className=""
            disabled={!formReady}
            variant="floating"
            size="lg"
          >
            Submit report
          </Button>
        </div>
      </form>
    </div>
  );
}
