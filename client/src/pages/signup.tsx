import axios from "axios";
import Image from "next/image";
import { FormEvent, ReactElement, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  InputEmailPhone,
  InputImage,
  InputName,
} from "@/components/ui/signup/multi-step-form";
import { ProgressBar } from "@/components/ui/signup/progress-bar";
import { MultistepForm, useMultistepForm } from "@/hooks/use-multistep-form";

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

const POSTER: string = "Poster";
const BIDDER: string = "Bidder";

function SignUp() {
  const BackArrow = "/back-arrow.svg";
  const [user, setUser] = useState(POSTER);
  const [data, setData] = useState(INIT_FORM_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((curFormData) => {
      return { ...curFormData, ...fields };
    });
  }

  let forms: ReactElement[] = [
    <InputEmailPhone {...data} updateFields={updateFields} />,
    <InputName {...data} updateFields={updateFields} />,
    <InputImage {...data} updateFields={updateFields} />,
  ];
  const multistepForm: MultistepForm = useMultistepForm(forms);

  function onSubmit(e: FormEvent) {
    // prevent default action: refreshing the page.
    e.preventDefault();
    console.log(
      "curIdx",
      multistepForm.stepIdx,
      "steps:",
      multistepForm.steps.length,
      "is last step:",
      multistepForm.isLastStep,
    );
    if (!multistepForm.isLastStep) {
      multistepForm.Continue();
    } else {
      // axios.post("api");
      console.log(data);
    }
  }

  function SwitchUser() {
    setUser((curUser) => {
      return curUser === POSTER ? BIDDER : POSTER;
    });
  }

  function DisplaySwitchText() {
    return user === POSTER ? BIDDER : POSTER;
  }

  return (
    <div className="fixed top-0 flex h-lvh w-full flex-col items-center border-b-8">
      <form onSubmit={onSubmit} className="relative top-20 h-full w-screen">
        {multistepForm.step}
        {multistepForm.stepIdx > 0 && (
          <div>
            <Button
              type="button"
              onClick={multistepForm.Back}
              className="fixed left-5 top-10 rounded-lg bg-penni-main"
            >
              <Image
                src={BackArrow}
                alt="Back Arrow"
                width={20}
                height={20}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Button>
            <Button
              className="font-bod fixed right-5 top-10 bg-slate-100 font-mono text-2xl text-penni-main"
              onClick={multistepForm.Continue}
            >
              Skip
            </Button>
          </div>
        )}
        <div className="flex justify-center">
          <Button
            type={multistepForm.isLastStep ? "submit" : "button"}
            onClick={multistepForm.Continue}
          >
            {multistepForm.isLastStep ? "Finish" : "Continue"}
          </Button>
        </div>
        {multistepForm.isFirstStep && (
          <div className="flex justify-center">
            <Button type="submit" onClick={SwitchUser}></Button>
            <Button
              type="button"
              className="mt-5 flex w-10/12 self-center rounded-lg bg-slate-200 text-center font-mono text-2xl font-bold text-blue-600"
              onClick={SwitchUser}
            >
              Switch to {DisplaySwitchText()}
            </Button>
          </div>
        )}
      </form>
      <div className="absolute top-36 w-11/12">
        {multistepForm.stepIdx !== 0 && (
          <ProgressBar
            steps={multistepForm.steps.length}
            currentStep={multistepForm.stepIdx}
          />
        )}
      </div>
    </div>
  );
}

export default SignUp;
