import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SingleLineInput } from "@/components/ui/inputs";

export default function SignIn() {
  function onSubmit() {}
  return (
    <>
      <div className="fixed left-0 right-0 top-0 flex h-lvh w-full flex-col items-center">
        <Image src="/logo.svg" alt="Penni Logo" width={100} height={100} />

        <Form className="w-full" onSubmit={onSubmit}>
          {/* TODO: validation for email or phone */}
          <SingleLineInput type="text" name="account" label="Email or mobile" />
          <SingleLineInput type="password" name="password" label="Password" />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button type="button" className="w-full" variant={"cutout"}>
            Don't have an account?
          </Button>
        </Form>
      </div>
    </>
  );
}
