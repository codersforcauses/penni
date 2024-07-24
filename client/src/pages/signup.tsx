import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { Button } from "@/components/ui/button";
import { HTMLTextTargetElement } from "@/components/ui/inputs";
import { SignupTitle } from "@/components/ui/signup/main-page";
import { ProgressBar } from "@/components/ui/signup/progress-bar";
import PageOne from "@/components/ui/signup/progress-one";
import PageThree from "@/components/ui/signup/progress-three";
import PageTwo from "@/components/ui/signup/progress-two";

interface FormData {
  email?: string;
  phone?: string;
  contactMethod: string;
  fullname: string;
  avatarSrc: string;
}

const INIT_FORM_DATA: FormData = {
  email: "",
  phone: "",
  contactMethod: "",
  fullname: "",
  avatarSrc: "",
};

const SignUp: React.FC = () => {
  const [client, setClient] = useState("Poster");
  const [currentStep, setCurrentStep] = useState(1);
  const [emailMobile, setEmailMobile] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextTargetElement>) => {
    const target = e.target as HTMLInputElement;
    switch (target.name) {
      case "emailMobile":
        setEmailMobile(target.value);
        break;
      case "userName":
        setUserName(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      case "repeatPassword":
        setRepeatPassword(target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <SignupTitle
        emailMobile={emailMobile}
        handleInputChange={handleInputChange}
        currentStep={currentStep}
        client={client}
        setCurrentStep={setCurrentStep}
        setEmailMobile={setEmailMobile}
        setClient={setClient}
      />
    </div>
  );
};

export default SignUp;
