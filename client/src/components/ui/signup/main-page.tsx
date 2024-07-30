import Image from "next/image";
import Link from "next/link";
import router, { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { ErrorCallout } from "@/components/ui/callout";
import { HTMLTextTargetElement, SingleLineInput } from "@/components/ui/inputs";

import { checkUnique } from "./check-unique";
import { emailRegex, mobileRegex } from "./regex";

interface SignupTitleProps {
  emailMobile: string;
  client: string;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setEmailMobile: React.Dispatch<React.SetStateAction<string>>;
  setClient: React.Dispatch<React.SetStateAction<string>>;
}

function isValidEmail(email: string): boolean {
  return emailRegex.test(email);
}

function isValidMobile(mobile: string): boolean {
  return mobileRegex.test(mobile);
}

const errorMessagePreset = "Please enter correct email or mobile";
const uniqueErrorMessage =
  "Email or Mobile has been registered, click here to sign in";

export const MainPage: React.FC<SignupTitleProps> = ({
  emailMobile,
  client,
  setClient,
  currentStep,
  setCurrentStep,
  setEmailMobile,
}) => {
  //page one
  const [buttonVariant, setButtonVariant] = useState("inactive");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailMobileChange = (e: ChangeEvent<HTMLTextTargetElement>) => {
    const value = e.target.value;
    setEmailMobile(value);
    setButtonVariant(value ? "default" : "inactive");
    if (isValidEmail(value) || isValidMobile(value)) {
      setErrorMessage(null);
      setButtonVariant("default");
    } else {
      setErrorMessage(errorMessagePreset);
      setButtonVariant("inactive");
    }
  };

  const buttonInputVariant =
    buttonVariant === "default" ? "default" : "inactive";

  const handleSubmit = async () => {
    try {
      const result = await checkUnique(emailMobile);
      if (result) {
        setErrorMessage(uniqueErrorMessage);
      } else {
        setCurrentStep(currentStep + 1);
        //console.log(currentStep);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const errorClick = () => {
    router.push("/login");
  };

  return (
    <div className="relative flex flex-col items-center p-4">
      {/* title */}
      <ErrorCallout
        className={`duration-2000 fixed left-0 right-0 top-0 transform p-4 transition-transform ${errorMessage ? "translate-y-0" : "-translate-y-full"}`}
        text={errorMessage}
        onClick={errorMessage === uniqueErrorMessage ? errorClick : undefined}
      />
      <div className="mt-36 flex flex-col items-center gap-4">
        <Image src="/penni-logo.svg" alt="Penni logo" width={87} height={86} />
        <span className="body text-center text-primary">
          Enter your email or mobile number. If you don't have an account we'll
          create one.
        </span>
      </div>
      {/* forms */}
      <div className="mt-20 flex w-full flex-col items-center justify-center gap-3">
        <div className="w-full">
          <SingleLineInput
            name="emailMobile"
            onChange={handleEmailMobileChange}
            required={true}
            value={emailMobile}
            label="Email or mobile"
            type="text"
          />
        </div>
        <Button
          className="h-14 w-full px-4"
          variant={buttonInputVariant}
          onClick={handleSubmit}
          disabled={buttonInputVariant === "inactive"}
        >
          Continue
        </Button>
        <Button
          className="h-14 w-full px-4"
          variant="link"
          onClick={() => setClient(client === "Poster" ? "Bidder" : "Poster")}
        >
          Switch to {client === "Poster" ? "Bidder" : "Poster"}
        </Button>
      </div>
    </div>
  );
};
