import Image from "next/image";
import React, { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import WriteIn from "@/components/ui/write-in";

interface formData {
  subject: string;
  description: string;
  imgs?: string[];
}

export default function Report() {
  const [formReady, setOnFormReady] = useState(false);

  const handleFormStateChange = (state: boolean) => {
    setOnFormReady(state);
  };

  const handleSubmit = () => {
    console.log("SUBMIT FORM");
  };

  return (
    <div id="report" className="">
      <div className="flex flex-row items-center justify-center">
        {/* <Image src={} className="mr-auto"/> */}
        <h2 className="text-center">Report a problem</h2>
      </div>
      <WriteIn onFormReady={handleFormStateChange}></WriteIn>
      <div className="flex items-center justify-center rounded-t-md">
        <Button
          className={`${formReady ? "" : "disabled"}`}
          onClick={handleSubmit}
        >
          Submit report
        </Button>
      </div>
    </div>
  );
}
