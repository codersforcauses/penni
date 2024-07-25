import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  HTMLTextTargetElement,
  ParagraphInput,
  SingleLineInput,
} from "@/components/ui/inputs";

interface BioProps {
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
}

export const Bio: React.FC<BioProps> = ({ setBio, setSubmit, bio }) => {
  const [buttonVariant, setButtonVariant] = useState("inactive");

  const handleBioChange = (e: ChangeEvent<HTMLTextTargetElement>) => {
    const value = e.target.value;
    setBio(value);
    setButtonVariant(value ? "default" : "inactive");
  };

  const buttonInputVariant =
    buttonVariant === "default" ? "default" : "inactive";
  return (
    <div>
      <div className="absolute left-0 right-0 top-[150px] flex h-[120px] flex-col gap-3 p-[1px_0] px-4">
        <span className="body text-primary">
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
      <div className="absolute left-0 right-0 top-[574px] flex flex-col gap-3 p-[1px_0] px-4">
        <Button
          className="flex h-[56px] w-full px-4 pb-4"
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
