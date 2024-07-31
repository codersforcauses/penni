import axios from "axios";
import jwt from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ErrorCallout } from "@/components/ui/callout";
import { Form, FormData } from "@/components/ui/form";
import { SingleLineInput } from "@/components/ui/inputs";
import { axiosInstance, LocalBaseURL } from "@/lib/api";

// can only sign in with email for now bc this is what the db is designed
export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPoster, setIsPoster] = useState(false);
  const LOGIN_URL = LocalBaseURL.concat("/app/token/");
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const email = formData.account;
    const password = formData.password;

    setErrorMessage(null);
    // const isEmail = /^[a-zA-Z\._'\d-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(
    //   account,
    // );
    // const isPhone = /^[0-9]{10}$/.test(account);
    // if (!isEmail && !isPhone) {
    //   setErrorMessage("Invalid email or phone number. Please try again.");
    //   return;
    // }
    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      });
      const token = response.data.access;

      // Store the token in localStorage
      localStorage.setItem("token", token);
      // const decoded = jwt.decode(token) as { user_id: string };
      // const userid = decoded.user_id;
      // const response2 = await axiosInstance.get(`/app/users/${userid}/`);
      // const isPoster = response2.data.is_poster;

      if (isPoster) {
        router.push("/poster");
      } else {
        router.push("/bidder");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error response from server:", error.response.data);
          console.error("Status code:", error.response.status);
          // Handle specific error responses from the server
          if (error.response.status === 401 || error.response.status === 400) {
            setErrorMessage("Invalid username or password. Please try again.");
            // Show a message to the user or handle the error accordingly
          } else if (error.response.status === 500) {
            setErrorMessage("Server error, please try again later");
            // Handle server errors
          }
          // Handle other status codes as needed
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server", error.request);
          setErrorMessage("No response received from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error in setting up request", error.message);
          setErrorMessage("Error in setting up request");
        }
      } else {
        // Non-Axios errors
        console.error("Unexpected error:", error);
        setErrorMessage("Unexpected error");
      }
    }
  };

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
            <span className="body mb-7 mt-4 text-center text-penni-text-regular-light-mode">
              Enter your email address or mobile number and the password to
              login.
            </span>
          </div>
          <Form className="w-full" onSubmit={handleLogin}>
            <SingleLineInput
              type="text"
              name="account"
              label="Email or mobile"
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

            <Button
              type="submit"
              size="penni"
              onClick={() => setIsPoster(true)}
            >
              <span className="headline">Poster Login</span>
            </Button>
            <Button type="submit" size="penni">
              <span className="headline">Bidder Login</span>
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
