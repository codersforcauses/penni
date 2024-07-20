import "react-image-crop/dist/ReactCrop.css";

import Image from "next/image";
import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import Webcam from "react-webcam";

import { Form } from "@/components/ui/form";
import { SingleLineInput } from "@/components/ui/inputs";

import { Button } from "../button";

interface EmailPhoneData {
  email?: string;
  phone?: string;
  contactMethod: string;
  // password & confirmpassword
  // authentication, MFA. finish in further steps.
}

interface NameData {
  fullname: string;
}

interface ImageData {
  avatarSrc: string;
}

interface EmailPhonepProps extends EmailPhoneData {
  updateFields: (fields: Partial<EmailPhoneData>) => void;
}

interface NameProps extends NameData {
  updateFields: (fields: Partial<NameData>) => void;
}

interface ImageProps extends ImageData {
  updateFields: (fields: Partial<ImageData>) => void;
}

export function InputEmailPhone({
  contactMethod,
  updateFields,
}: EmailPhonepProps) {
  const LogoImage = "/penni-logo.svg";
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        className="relative mt-24"
        src={LogoImage}
        alt="Image Not Found"
        width={100}
        height={100}
        priority
      />
      <div className="flex h-[192px] w-[375px] flex-col items-center justify-center gap-3 px-4">
        <p className="body text-primary">
          Enter your email or mobile number. If you don’t have an account we’ll
          create one.
        </p>
      </div>
      <br />
      {/* TODO email phone number check or message validation */}
      <SingleLineInput
        label="Email or mobile"
        onChange={(e) => updateFields({ contactMethod: e.target.value })}
        value={contactMethod}
        type="text"
      />
    </div>
  );
}

export function InputName({ fullname, updateFields }: NameProps) {
  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="mx-7 font-mono text-3xl font-bold">Welcome!</h1>
      <p className="ml-6 mt-14 font-mono text-3xl">What should we call you?</p>
      <input
        className="mt-4 h-12 w-11/12 self-center rounded-lg border-2 border-gray-300 p-2 text-center font-mono text-xl"
        type="text"
        placeholder="Enter full name"
        value={fullname}
        onChange={(e) => updateFields({ fullname: e.target.value })}
      />
    </div>
  );
}

export function InputImage({ avatarSrc, updateFields }: ImageProps) {
  const defaultImage = "/default-profile.svg";
  const [showPopup, setShowPopup] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(avatarSrc);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile);
    } else if (imageSrc) {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      formData.append("file", blob, "webcam-image.jpg");
    }
    // append your profile data here to formData submit to backend.
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  }

  function chooseFormGallery(e: React.ChangeEvent<HTMLInputElement>) {
    setShowPopup(false);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);
        const cacheUrl = URL.createObjectURL(file);
        setImageSrc(cacheUrl);
        updateFields({ avatarSrc: cacheUrl });
      }
    }
  }

  function ShowCamera() {
    setShowCamera(true);
    setShowPopup(false);
  }

  function CloseCamera() {
    setShowCamera(false);
    setShowPopup(false);
  }

  function handleCameraCapture() {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
      updateFields({ avatarSrc: imageSrc });
    }
    setShowCamera(false);
    setShowPopup(false);
  }

  return (
    <div>
      <h1 className="mx-7 font-mono text-3xl font-bold">Your Profile</h1>
      <p className="ml-6 mt-20 font-mono text-3xl">
        Upload a profile photo so others can recognise you!
      </p>
      <div className="relative flex flex-col items-center">
        <button
          type="button"
          onClick={() => setShowPopup(true)}
          className="relative"
        >
          <Image
            src={imageSrc ? imageSrc : defaultImage}
            alt="Avatar Not Found"
            width={100}
            height={100}
            className="h-60 w-60 rounded-full border-4 object-cover"
          />
        </button>
        {showCamera && (
          <div className="absolute flex flex-col items-center justify-center">
            <Webcam
              className="h-60 w-60 rounded-full border-4 object-cover"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
              forceScreenshotSourceSize={true}
              height={500}
              width={500}
            />
            <Button
              className="absolute -left-20 bottom-3 bg-transparent text-center font-mono text-xl font-bold text-blue-600"
              onClick={handleCameraCapture}
            >
              Capture
            </Button>
            <Button
              className="absolute -right-16 bottom-3 bg-transparent text-center font-mono text-xl font-bold text-red-600"
              onClick={CloseCamera}
            >
              Close
            </Button>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-x-6 bottom-5 flex flex-col items-center justify-end rounded-lg opacity-75 shadow-lg">
          <button
            type="button"
            className="w-full border-b border-gray-200 py-4 text-center font-mono text-xl font-bold text-blue-700"
            onClick={() =>
              document.getElementById("chooseFormGallery")?.click()
            }
          >
            Choose from Gallery
          </button>
          <input
            id="chooseFormGallery"
            type="file"
            accept="image/*"
            onChange={chooseFormGallery}
            className="hidden"
          />
          <button
            className="w-full border-b border-gray-200 py-4 text-center font-mono text-xl font-bold text-blue-700"
            onClick={ShowCamera}
          >
            Take a Photo
          </button>
          <button
            className="w-full py-4 text-center font-mono text-xl font-bold text-red-600"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
