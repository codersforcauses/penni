import { useEffect, useState } from "react";

import { Ava } from "@/components/ui/signup/avatar";
import { Bio } from "@/components/ui/signup/bio";
import { MainPage } from "@/components/ui/signup/main-page";
import { ProgressBar } from "@/components/ui/signup/progress-bar";
import { PW } from "@/components/ui/signup/pw";
import { Welcome } from "@/components/ui/signup/welcome";
import api from "@/lib/api";

const BIDDER = "Bidder";
const POSTER = "Poster";

const SignUp: React.FC = () => {
  const [client, setClient] = useState("Poster");
  const [currentStep, setCurrentStep] = useState(1);
  const [emailMobile, setEmailMobile] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(
    undefined,
  );
  const [bio, setBio] = useState("");
  const [submit, setSubmit] = useState(false);
  const [title, setTitle] = useState("Welcome!");

  useEffect(() => {
    const onFinish = async () => {
      const data = {
        email: emailMobile,
        username: fullName,
        password: password,
        //avatar: profilePhoto,
        //client: Poster or Bidder
        //Bio: if it's Bidder, record Bio
      };

      try {
        const response = await api.post("/app/register/", data);

        if (response.status === 200) {
          console.log("Successfully sent the message");
        } else if (response.status === 201) {
          setEmailMobile("");
          setFullName("");
          setPassword("");
          setProfilePhoto("");
          setTitle("Welcome!");
          setClient("Poster");
          console.log("Successfully created a new user");
          window.location.href = "/index";
        } else {
          console.log("There is an issue when sending a message");
        }
      } catch (error) {
        console.error("Error occurs when ", error);
      }
    };
    if (submit) {
      onFinish();
      setSubmit(false);
    }
  }, [submit]);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-4">
      <div
        className={`duration-800 absolute inset-0 transform transition-transform ${currentStep === 1 ? "translate-x-0" : "pointer-events-none -translate-x-full opacity-0"}`}
      >
        <MainPage
          emailMobile={emailMobile}
          currentStep={currentStep}
          client={client}
          setCurrentStep={setCurrentStep}
          setEmailMobile={setEmailMobile}
          setClient={setClient}
        />
      </div>
      <div
        className={`duration-800 absolute inset-0 transform transition-transform ${currentStep === 2 ? "translate-x-0" : "pointer-events-none translate-x-full opacity-0"}`}
      >
        <PW
          currentStep={currentStep}
          password={password}
          setPassword={setPassword}
          setCurrentStep={setCurrentStep}
        />
      </div>
      {currentStep !== 1 && currentStep !== 2 && (
        <div className="absolute left-0 right-0 top-[80px] flex flex-col gap-4 p-0">
          <div className="px-4">
            <h1 className="title1 text-primary">{title}</h1>
            {client === POSTER ? (
              <ProgressBar steps={2} currentStep={currentStep - 2} />
            ) : (
              <ProgressBar steps={3} currentStep={currentStep - 2} />
            )}{" "}
            {/*We have totally 4 pages for poster, 5 pages for bidder, 2 for register and 2 or 3 for profile filling*/}
          </div>
        </div>
      )}
      <div
        className={`duration-800 absolute inset-0 transform transition-transform ${currentStep === 3 ? "translate-x-0" : "pointer-events-none translate-x-full opacity-0"}`}
      >
        <Welcome
          fullName={fullName}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setFullName={setFullName}
          setTitle={setTitle}
        />
      </div>
      <div
        className={`duration-800 absolute inset-0 transform transition-transform ${currentStep === 4 ? "translate-x-0" : "pointer-events-none translate-x-full opacity-0"}`}
      >
        <Ava
          profilePhoto={profilePhoto}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setProfilePhoto={setProfilePhoto}
          client={client}
          setSubmit={setSubmit}
          setTitle={setTitle}
        />
      </div>
      <div
        className={`duration-800 absolute inset-0 transform transition-transform ${currentStep === 5 && client == BIDDER ? "translate-x-0" : "pointer-events-none translate-x-full opacity-0"}`}
      >
        <Bio setSubmit={setSubmit} bio={bio} setBio={setBio} />
      </div>
    </div>
  );
};

export default SignUp;
