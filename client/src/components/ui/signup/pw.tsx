import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormData } from "@/components/ui/form";
import { HTMLTextTargetElement, SingleLineInput } from "@/components/ui/inputs";

interface PWProps {
  currentStep: number;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

function passwordValidation(password: string, repeatPassword: string) {
  if (repeatPassword != password) {
    return false;
  }
  return true;
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

  const handlePasswordChange = (e: ChangeEvent<HTMLTextTargetElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordVariant(e.target.value ? "default" : "inactive");
  };

  const handleRepeatPasswordChange = (
    e: ChangeEvent<HTMLTextTargetElement>,
  ) => {
    const value = e.target.value;
    setRepeatPassword(value);
    setRepeatPasswordVariant(e.target.value ? "default" : "inactive");
    if (passwordValidation(password, value)) {
      // 修改此行
      setErrorMessage("");
    } else {
      setRepeatPasswordVariant("inactive");
      setErrorMessage("Passwords do not match");
    }
  };

  const buttonVariant =
    passwordVariant === "default" && repeatPasswordVariant === "default"
      ? "default"
      : "inactive";

  return (
    <div>
      <div className="absolute left-0 right-0 top-[140px] flex h-[146px] flex-col items-center gap-4 p-0">
        <Image src="/penni-logo.svg" alt="Penni logo" width={87} height={86} />
        <span className="body pd-4 px-4 text-center text-primary">
          Please enter your password and confirm password
        </span>
        <div className="absolute left-0 right-0 top-[160px] flex h-[192px] flex-col items-center justify-center gap-3 px-4">
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
          {errorMessage && (
            <div className="callout text-red-600">{errorMessage}</div>
          )}
          <Button
            className="h-[56px] w-full px-4 pb-4"
            variant={buttonVariant}
            onClick={() => setCurrentStep(currentStep + 1)}
            type="submit"
            disabled={buttonVariant === "inactive"}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
