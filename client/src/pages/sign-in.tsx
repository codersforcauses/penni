import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ErrorCallout } from "@/components/ui/callout";
import { Form, FormData } from "@/components/ui/form";
import { SingleLineInput } from "@/components/ui/inputs";
import { LocalBaseURL } from "@/lib/api";

const LOGIN_URL = LocalBaseURL.concat("/app/login/");

const handleLogin = async (username: string, password: string) => {
  const response = await axios.post(LOGIN_URL, {
    username,
    password,
  });
  const { token } = response.data;

  // Store the token in localStorage
  localStorage.setItem("token", token);
};

export default function SignIn({ account }: { account: string }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isLogin == true) {
      router.push("/poster");
    }
  }, [router, isLogin]);
  async function onSubmit(formData: FormData) {
    setErrorMessage(null);
    const isEmail = /^[a-zA-Z\._'\d-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(
      formData.account,
    );
    const isPhone = /^[0-9]{10}$/.test(formData.account);

    // if (!isEmail && !isPhone) {
    //   setErrorMessage("Invalid email or phone number. Please try again.");
    //   return;
    // }
    try {
      handleLogin(formData.account, formData.password);
      setIsLogin(true);
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  }
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center px-4">
        <div className="flex size-full flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            <Image
              src="/penni-logo.svg"
              alt="Penni logo"
              width={87}
              height={86}
            />
            <span className="body mb-7 mt-4 text-penni-text-regular-light-mode">
              Enter your email address or mobile number and the password to
              login.
            </span>
          </div>
          <Form className="w-full" onSubmit={onSubmit}>
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
            {errorMessage && (
              <ErrorCallout className="pb-4" text={errorMessage} />
            )}
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
