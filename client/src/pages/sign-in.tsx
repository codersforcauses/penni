import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PenniLogoIcon } from "@/components/ui/icons";
import { SingleLineInput } from "@/components/ui/inputs";

export default function SignIn() {
  function onSubmit() {}
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center px-4">
        <div className="flex size-full flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            <PenniLogoIcon />
            <span className="body mb-7 mt-4 text-penni-text-regular-light-mode">
              Enter your email or mobile number. If you don’t have an account
              we’ll create one.
            </span>
          </div>
          <Form className="w-full" onSubmit={onSubmit}>
            {/* TODO: validation for email or phone */}
            <SingleLineInput
              type="text"
              name="account"
              label="Email or mobile"
            />
            <Button type="submit" size="penni">
              <span className="headline">Continue</span>
            </Button>
            <Button
              type="button"
              size="penni"
              className="w-full"
              variant={"link"}
            >
              <span className="headline">Switch to Bidder</span>
            </Button>
          </Form>
        </div>

        <span className="footnote mb-9 text-center">
          By continuing you agree to our{" "}
          <a href="#" className="footnote-bold text-penni-main">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="footnote-bold text-penni-main">
            Privacy Policy
          </a>
        </span>
      </div>
    </>
  );
}
