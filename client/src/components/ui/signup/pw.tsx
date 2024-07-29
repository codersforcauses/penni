import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { ErrorCallout } from "@/components/ui/callout";
import { HTMLTextTargetElement, SingleLineInput } from "@/components/ui/inputs";
import api from "@/lib/api";

import { pwRegex } from "./regex";

//import { isCommonPassword } from "./check-common-pw";

interface PWProps {
  emailMobile: string;
  currentStep: number;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

function passwordValidation(password: string, repeatPassword: string): boolean {
  return repeatPassword === password;
}

export const PW: React.FC<PWProps> = ({
  currentStep,
  setCurrentStep,
  password,
  setPassword,
}) => {
  const [passwordVariant, setPasswordVariant] = useState("inactive");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordVariant, setRepeatPasswordVariant] =
    useState("inactive");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function passwordCommonCheck(
    password: string,
  ): Promise<string | undefined> {
    try {
      const response = await api.post("/app/validate/", { password: password });

      if (response.status === 200) {
        console.log("Password is valid:", response.data.valid);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Validation errors:", error.response?.data.errors);
        return error.response?.data.errors;
      } else {
        console.error("Error:", error);
      }
    }
  }

  function inputCheck(
    password: string,
    hook: React.Dispatch<React.SetStateAction<string>>,
  ) {
    if (password.length <= 8) {
      setErrorMessage(
        "This password is too short. It must contain at least 8 characters.",
      );
      hook("inactive");
      return false;
    } else if (pwRegex.test(password)) {
      setErrorMessage("This password is entirely numeric.");
      hook("inactive");
      return false;
    } else {
      setErrorMessage(null);
      hook("default");
      return true;
    }
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLTextTargetElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordVariant(e.target.value ? "default" : "inactive");
    inputCheck(value, setPasswordVariant);
  };

  const handleRepeatPasswordChange = (
    e: ChangeEvent<HTMLTextTargetElement>,
  ) => {
    const value = e.target.value;
    setRepeatPassword(value);
    setRepeatPasswordVariant(e.target.value ? "default" : "inactive");
    if (!passwordValidation(password, value)) {
      setErrorMessage("Passwords do not match");
      setRepeatPasswordVariant("inactive");
    } else if (!inputCheck(password, setPasswordVariant)) {
      inputCheck(password, setPasswordVariant);
    } else {
      setErrorMessage(null);
      setRepeatPasswordVariant("default");
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await passwordCommonCheck(password);
      if (!result) {
        setCurrentStep(currentStep + 1);
        //console.log(currentStep);
      } else {
        setErrorMessage(result);
        setRepeatPasswordVariant("inactive");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const buttonVariant =
    passwordVariant === "default" && repeatPasswordVariant === "default"
      ? "default"
      : "inactive";

  return (
    <div className="relative flex flex-col items-center p-4">
      {/* title */}
      <ErrorCallout
        className={`duration-2000 fixed left-0 right-0 top-0 transform p-4 transition-transform ${errorMessage ? "translate-y-0" : "-translate-y-full"}`}
        text={errorMessage}
      />
      <div className="mt-36 flex flex-col items-center gap-4">
        <Image src="/penni-logo.svg" alt="Penni logo" width={87} height={86} />
        <span className="body text-center text-primary">
          Please enter your password and confirm password
        </span>
      </div>
      {/* forms */}
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-3">
        <div className="w-full">
          <SingleLineInput
            label="Password"
            onChange={handlePasswordChange}
            value={password}
            required={true}
            type="password"
          />
        </div>
        <div className="w-full">
          <SingleLineInput
            label="Confirm Password"
            onChange={handleRepeatPasswordChange}
            value={repeatPassword}
            required={true}
            type="password"
          />
        </div>
        <Button
          className="h-14 w-full px-4"
          variant={buttonVariant}
          onClick={handleSubmit}
          type="submit"
          disabled={buttonVariant === "inactive"}
        >
          Continue
        </Button>
      </div>
      <span className="footnote mt-10 px-4 text-center">
        By continuing you agree to our{" "}
        <a href="#" className="footnote-bold text-penni-main">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="footnote-bold text-penni-main">
          Privacy Policy
        </a>
      </span>
    </div>
  );
};
