import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import WriteIn, { WriteInFormData } from "@/components/ui/write-in";

/**
 * The Report component allows users to report a problem by filling out a form with a subject, description, and optional images.
 *
 * @returns {JSX.Element} The Report component.
 */
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
    <div
      id="report"
      className="flex min-h-screen flex-col bg-penni-background-input-light-mode"
    >
      <Header title="Report a problem" />
      <div className="h-[0.12rem] grow-0 bg-penni-background-input-light-mode pt-3"></div>
      <div className="flex flex-grow flex-col overflow-auto">
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col">
          <WriteIn
            imgUpload={true}
            onFormDataChange={handleFormDataChange}
            className="flex-grow"
            maxImgs={5}
          />
          <div className="h-0.5 bg-penni-background-input-light-mode pt-8"></div>
          <div className="mt-4 flex flex-grow-0 items-center justify-center rounded-t-3xl bg-penni-background-light-mode p-4 shadow-[rgba(0,0,0,0.05)_0px_-10px_15px_0px]">
            <Button
              type="submit"
              disabled={!formReady}
              variant="floating"
              size="penni"
            >
              Submit report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
