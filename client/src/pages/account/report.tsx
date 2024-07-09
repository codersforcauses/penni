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
        <h2 className="text-center">Report a problem</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <WriteIn imgUpload={true} onFormDataChange={handleFormDataChange} />
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
