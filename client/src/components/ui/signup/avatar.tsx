import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import Webcam from "react-webcam";

import { Button } from "@/components/ui/button";

interface AvaProps {
  profilePhoto: string | undefined;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setProfilePhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  client: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const Ava: React.FC<AvaProps> = ({
  currentStep,
  setCurrentStep,
  profilePhoto,
  setProfilePhoto,
  client,
  setSubmit,
  setTitle,
}) => {
  const [buttonVariant, setButtonVariant] = useState("inactive");
  const [showOptions, setShowOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
      setButtonVariant("default");
      setShowOptions(false);
    }
  };

  const handleCameraCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setProfilePhoto(imageSrc);
      setButtonVariant("default");
      setShowCamera(false);
    }
  };

  const handleChooseOption = (type: "file" | "camera") => {
    if (type === "file") {
      document.getElementById("fileInput")?.click();
    } else if (type === "camera") {
      setShowCamera(true);
      setShowOptions(false);
    }
  };

  const buttonInputVariant =
    buttonVariant === "default" ? "default" : "inactive";

  const buttonEffect = () => {
    if (client === "Poster") {
      setSubmit(true);
    } else {
      setCurrentStep(currentStep + 1);
      setTitle("Your Bio");
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setTitle("Welcome");
    setProfilePhoto("");
    setShowCamera(false);
    setShowOptions(false);
  };

  const handleSkip = () => {
    buttonEffect();
  };

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
      {/* title and avatar uploader */}
      <div className="mt-36 flex w-full flex-col items-center gap-4">
        <span className="body text-left text-primary">
          Upload a profile photo so others can recognise you!
        </span>
        <div className="mt-2 flex">
          <div className="relative h-36 w-36">
            {showCamera ? (
              <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70 transition-transform">
                <div className="mt-56 flex flex-col items-center justify-center">
                  <Webcam
                    className="h-36 w-36 rounded-full border-2 object-cover"
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    screenshotQuality={1}
                    forceScreenshotSourceSize={true}
                  />
                </div>
                <div className="mt-auto w-full p-4">
                  <div className="space-y-1">
                    <Button
                      className="flex h-14 w-full px-4"
                      variant="filecard"
                      onClick={handleCameraCapture}
                    >
                      Capture
                    </Button>
                    <Button
                      className="flex h-14 w-full px-4"
                      variant="filecard"
                      onClick={() => setShowCamera(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Image
                src={profilePhoto || "/default-profile.svg"}
                alt="Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-2 border-penni-grey-inactive"
              />
            )}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <button
              className="absolute inset-0 cursor-pointer opacity-0"
              onClick={() => setShowOptions(true)}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      {/* button */}
      <div className="mb-8 mt-auto flex w-full flex-col items-center justify-end">
        <Button
          className="h-14 w-full px-4"
          variant={buttonInputVariant}
          onClick={buttonEffect}
          disabled={buttonInputVariant === "inactive"}
        >
          Continue
        </Button>
      </div>
      {showOptions && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-70 transition-transform duration-1000">
          <div className="w-full space-y-1 rounded-t-lg p-4 duration-1000">
            <Button
              className="flex h-14 w-full px-4"
              variant="filecard"
              onClick={() => handleChooseOption("file")}
            >
              Choose from Gallery
            </Button>
            <Button
              className="flex h-14 w-full px-4"
              variant="filecard"
              onClick={() => handleChooseOption("camera")}
            >
              Take a Photo
            </Button>
            <Button
              className="mt-1 flex h-14 w-full px-4"
              variant="filecard"
              onClick={() => setShowOptions(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
