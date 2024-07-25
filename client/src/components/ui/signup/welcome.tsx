import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { HTMLTextTargetElement, SingleLineInput } from "@/components/ui/inputs";

import { userNameRegex } from "./regex";

interface WelcomeProps {
  fullName: string;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

function isValidUserName(mobile: string): boolean {
  //return userNameRegex.test(mobile);
  return true;
}

export const Welcome: React.FC<WelcomeProps> = ({
  fullName,
  currentStep,
  setCurrentStep,
  setFullName,
  setTitle,
}) => {
  const [buttonVariant, setButtonVariant] = useState("inactive");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFullNameChange = (e: ChangeEvent<HTMLTextTargetElement>) => {
    const value = e.target.value;
    setFullName(value);
    setButtonVariant(value ? "default" : "inactive");
    if (isValidUserName(value)) {
      setErrorMessage(null);
      setButtonVariant("default");
    } else if (value.length >= 150) {
      //impossible boundary maybe
      setErrorMessage("Name is too long!");
      setButtonVariant("inactive");
    } else {
      setErrorMessage("Fullname contains invalid characters");
      setButtonVariant("inactive");
    }
  };

  const buttonInputVariant =
    buttonVariant === "default" ? "default" : "inactive";

  const buttonChange = () => {
    setTitle("Your Profile");
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      <div className="absolute left-0 right-0 top-[150px] flex h-[120px] flex-col gap-3 p-[1px_0] px-4">
        <span className="body text-primary">What should we call you?</span>
        <div className="w-full">
          <SingleLineInput
            name="emailMobile"
            onChange={handleFullNameChange}
            required={true}
            value={fullName}
            label="Enter full name"
            type="text"
          />
        </div>
        {errorMessage && (
          <div className="callout text-red-600">{errorMessage}</div>
        )}
      </div>
      <div className="absolute left-0 right-0 top-[574px] flex flex-col gap-3 p-[1px_0] px-4">
        <Button
          className="flex h-[56px] w-full px-4 pb-4"
          variant={buttonInputVariant}
          onClick={buttonChange}
          disabled={buttonInputVariant === "inactive"}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
