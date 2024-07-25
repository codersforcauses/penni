import { profile } from "console";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { HTMLTextTargetElement, SingleLineInput } from "@/components/ui/inputs";

interface AvaProps {
  profilePhoto: File | null;
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
  const [inputType, setInputType] = useState<"file" | "camera">("file");

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
      setButtonVariant("default");
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      return new Promise<string>((resolve, reject) => {
        video.onloadedmetadata = () => {
          video.width = video.videoWidth;
          video.height = video.videoHeight;

          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const context = canvas.getContext("2d");
          context?.drawImage(video, 0, 0);

          canvas.toDataURL(
            "image/*",
            (dataUrl: string | PromiseLike<string>) => {
              resolve(dataUrl);
              stream.getTracks().forEach((track) => track.stop());
            },
          );
        };
      });
    } catch (error) {
      console.error("Error accessing camera", error);
    }
  };

  const handleChooseOption = (type: "file" | "camera") => {
    setInputType(type);
    if (type === "file") {
      document.getElementById("fileInput")?.click();
    } else if (type === "camera") {
      handleCameraCapture().then((dataUrl) => {
        setProfilePhoto(dataUrl);
        setShowOptions(false);
      });
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

  return (
    <div>
      <div className="absolute left-0 right-0 top-[150px] flex h-[120px] flex-col gap-3 p-[1px_0] px-4">
        <span className="body text-primary">
          Upload a profile photo so others can recognise you!
        </span>
        {/*Avatar Uploader*/}
        <div className="flex items-center justify-center">
          <div className="relative h-[136px] w-[136px]">
            {profilePhoto ? (
              <Image
                src={profilePhoto || "/default-profile.svg"}
                alt="Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-2 border-penni-grey-inactive"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-penni-grey-inactive bg-penni-grey-inactive">
                <span className="bold text-penni-grey-inactive">No image</span>
              </div>
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

          {showOptions && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 transition-transform">
              <div className="duration-800 animate-slide-up w-full space-y-1 rounded-t-lg p-4 ease-in-out">
                <Button
                  className="flex h-[56px] w-full px-4"
                  variant="filecard"
                  onClick={() => handleChooseOption("file")}
                >
                  Choose from Gallery
                </Button>
                <Button
                  className="flex h-[56px] w-full px-4"
                  variant="filecard"
                  onClick={() => handleChooseOption("camera")}
                >
                  Take a Photo
                </Button>
                <Button
                  className="mt-1 flex h-[56px] w-full px-4"
                  variant="filecard"
                  onClick={() => setShowOptions(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute left-0 right-0 top-[574px] flex flex-col gap-3 p-[1px_0] px-4">
        <Button
          className="flex h-[56px] w-full px-4 pb-4"
          variant={buttonInputVariant}
          onClick={buttonEffect}
          disabled={buttonInputVariant === "inactive"}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
