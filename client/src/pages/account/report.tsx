import Image from "next/image";
import React, { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import WriteIn from "@/components/ui/write-in";

interface WriteInFormData {
  subject: string;
  description: string;
  imgs?: string[];
}

export default function Report() {
  const [formReady, setFormReady] = useState(false);
  const [formData, setFormData] = useState<WriteInFormData>({
    subject: "",
    description: "",
  });

  const handleFormDataChange = (data: WriteInFormData) => {
    setFormData(data);
    const formState: boolean =
      formData.subject.trim() !== "" && formData.description.trim() !== "";
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
    <div id="report" className="">
      <div className="flex flex-row items-center justify-center">
        {/* <Image src={} className="mr-auto"/> */}
        <h2 className="text-center p-5 pt-6 body-medium">Report a problem</h2>
      </div>
      <div className="h-0.5 pt-3 bg-penni-background-input-light-mode">
      </div>
      <form onSubmit={handleSubmit}>
        <WriteIn imgUpload={true} onFormDataChange={handleFormDataChange} />
        <div className="h-0.5 pt-10 bg-penni-background-input-light-mode">
        </div>
        <div className="mt-4 flex items-center justify-center rounded-t-md">
          <Button
            type="submit"
            className={`${formReady ? "" : "disabled"}`}
            disabled={!formReady}
          >
            Submit report
          </Button>
        </div>
      </form>
    </div>
  );
}
