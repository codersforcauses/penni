import axios from "axios";
import { FormEvent, ReactElement, useState } from "react";

import { Button } from "@/components/ui/button";
import { EmailPhoneForm } from "@/components/ui/signup/form_emailphone";
import { NameForm } from "@/components/ui/signup/form_name";
import { ProfileForm } from "@/components/ui/signup/form_profile";
import { MultistepForm, useMultistepForm } from "@/hooks/use_multistep_form";

interface FormData {
  email?: string;
  phone?: string;
  contactMethod: string;
  fullname: string;
  profile?: string;
}

const INIT_FORM_DATA: FormData = {
  email: "",
  phone: "",
  contactMethod: "",
  fullname: "",
  profile: "",
};

const POSTER: string = "Poster";
const BIDDER: string = "Bidder";

function SignUp() {
  const [user, setUser] = useState(POSTER);
  const [data, setData] = useState(INIT_FORM_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((curFormData) => {
      return { ...curFormData, ...fields };
    });
  }

  let forms: ReactElement[] = [
    <EmailPhoneForm {...data} updateFields={updateFields} />,
    <NameForm {...data} updateFields={updateFields} />,
    <ProfileForm {...data} updateFields={updateFields} />,
  ];
  const multistepForm: MultistepForm = useMultistepForm(forms);

  function onSubmit(e: FormEvent) {
    // prevent default action: refreshing the page.
    e.preventDefault();
    if (!multistepForm.isLastStep) {
      multistepForm.Continue();
    } else {
      console.log(user, "Submit post request, data: ", multistepForm);
      axios.post("api");
    }
  }

  function DisplaySwitchText() {
    function SwitchUser() {
      setUser((curUser) => {
        return curUser === POSTER ? BIDDER : POSTER;
      });
    }

    if (multistepForm.isFirstStep) {
      return (
        <div onClick={SwitchUser} style={{ color: "blue" }}>
          <p>Switch to {user === POSTER ? BIDDER : POSTER}</p>
        </div>
      );
    }
  }
  const DisplayProgressbar = () => {
    if (!multistepForm.isFirstStep) {
      return (
        <div
          style={{
            width:
              multistepForm.stepIdx === 1
                ? "33.3%"
                : multistepForm.stepIdx == 2
                  ? "66.6%"
                  : "100%",
          }}
        ></div>
      );
    }
  };
  return (
    <div
      style={{
        position: "relative",
        background: "grey",
        border: "2px solid black",
        padding: "1rem",
        margin: "1px 1px 1px 1px",
        fontFamily: "Arial",
        maxWidth: "max-content",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="progressbar">{DisplayProgressbar()}</div>
      <form onSubmit={onSubmit}>
        <div
          style={{
            position: "absolute",
            top: ".5rem",
            bottom: ".5rem",
            right: ".5rem",
          }}
        >
          {multistepForm.stepIdx + 1} / {multistepForm.steps.length}
        </div>
        {multistepForm.step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!multistepForm.isFirstStep && (
            <Button type="button" onClick={multistepForm.Back}>
              🔙
            </Button>
          )}
          <Button type="button" onClick={multistepForm.Continue}>
            {multistepForm.isLastStep ? "Finish" : "Next"}
          </Button>
        </div>
      </form>

      <DisplaySwitchText />
    </div>
  );
}

export default SignUp;
