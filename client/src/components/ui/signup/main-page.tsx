import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
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
        setErrorMessage("Email or Mobile has been registered, please");
      } else {
        setCurrentStep(currentStep + 1);
        //console.log(currentStep);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      {/*title*/}
      <div className="absolute left-0 right-0 top-[140px] flex h-[146px] flex-col items-center gap-4 p-0">
        <Image src="/penni-logo.svg" alt="Penni logo" width={87} height={86} />
        <span className="body pd-4 px-4 text-center text-primary">
          Enter your email or mobile number. If you don't have an account we'll
          create one.
        </span>
      </div>
      {/*forms*/}
      <div className="absolute left-0 right-0 top-[312px] flex h-[192px] w-full flex-col items-center justify-center gap-3 px-4">
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
        {errorMessage === errorMessagePreset ? (
          <div className="callout text-red-600">{errorMessage}</div>
        ) : (
          <div className="callout text-red-600">
            {errorMessage}{" "}
            {!(errorMessage === null) && (
              <Link className="callout text-penni-main" href="/sign-in">
                sign in
              </Link>
            )}
          </div>
        )}
        <Button
          className="h-[56px] w-full px-4 pb-4"
          variant={buttonInputVariant}
          onClick={handleSubmit}
          disabled={buttonInputVariant === "inactive"}
        >
          Continue
        </Button>
        {client === "Poster" ? (
          <Button
            className="h-[56px] w-full px-4 pb-4"
            variant="link"
            onClick={() => setClient("Bidder")}
          >
            Switch to Bidder
          </Button>
        ) : (
          <Button
            className="h-[56px] w-full px-4 pb-4"
            variant="link"
            onClick={() => setClient("Poster")}
          >
            Switch to Poster
          </Button>
        )}
      </div>
    </div>
  );
};
