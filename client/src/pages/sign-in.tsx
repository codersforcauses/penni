import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Form, FormData } from "@/components/ui/form";
import { PenniLogoIcon } from "@/components/ui/icons";
import { SingleLineInput } from "@/components/ui/inputs";

export default function SignIn({ account }: { account: string }) {
  function onSubmit(formData: FormData) {
    console.log(formData);
  }
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
              value={account}
              required={true}
            />
            <SingleLineInput
              type="password"
              name="password"
              label="Password"
              required={true}
            />
            <div className="flex w-full flex-col items-end justify-center pb-4 pt-2">
              <a className="caption text-penni-main" href="#">
                Forgot your password?
              </a>
            </div>
            <Button type="submit" size="penni">
              <span className="headline">Login</span>
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
