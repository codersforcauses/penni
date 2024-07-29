import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { HTMLTextTargetElement, ParagraphInput } from "@/components/ui/inputs";

interface BioProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  bio: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
}

export const Bio: React.FC<BioProps> = ({
  setCurrentStep,
  setTitle,
  currentStep,
  setBio,
  setSubmit,
  bio,
}) => {
  const [buttonVariant, setButtonVariant] = useState("inactive");

  const handleBioChange = (e: ChangeEvent<HTMLTextTargetElement>) => {
    const value = e.target.value;
    setBio(value);
    setButtonVariant(value ? "default" : "inactive");
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setTitle("Your Profile");
  };

  const handleSkip = () => {
    setSubmit;
  };

  const buttonInputVariant =
    buttonVariant === "default" ? "default" : "inactive";
  return (
    <div className="relative flex h-screen flex-col items-center p-4">
      {/* back and skip buttons */}
      <div className="absolute left-4 top-4">
        <Button variant="link" onClick={handleBack}>
          <Image
            src="/back-arrow.svg"
            alt="Back"
            width={24}
            height={24}
            style={{
              filter:
                "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)",
            }} // color to black
          />
        </Button>
      </div>
      <div className="absolute right-4 top-4">
        <Button variant="link" onClick={handleSkip}>
          Skip
        </Button>
      </div>
      {/* title and bio input */}
      <div className="mt-36 flex w-full flex-col items-start gap-4">
        <span className="body text-left text-primary">
          Tell us a bit about yourself, like what you are best at and your
          background
        </span>
        <div className="w-full">
          <ParagraphInput
            name="Bio"
            onChange={handleBioChange}
            value={bio}
            label="What are you best at?"
            placeholder="Ever since I was little, I've always been passionate about not starving to death."
          />
        </div>
      </div>
      {/* button */}
      <div className="mb-8 mt-auto flex w-full flex-col items-center justify-end">
        <Button
          className="h-14 w-full px-4"
          variant={buttonInputVariant}
          onClick={() => setSubmit(true)}
          disabled={buttonInputVariant === "inactive"}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
