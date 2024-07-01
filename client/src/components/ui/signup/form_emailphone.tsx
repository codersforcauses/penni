import Image from "next/image";

import { FormWrapper } from "./form_wrapper";

interface EmailPhoneData {
  email?: string;
  phone?: string;
  contactMethod: string;
}

interface EmailPhonepProps extends EmailPhoneData {
  updateFields: (fields: Partial<EmailPhoneData>) => void;
}

export function EmailPhoneForm({
  contactMethod,
  updateFields,
}: EmailPhonepProps) {
  return (
    <FormWrapper title="">
      <Image src="/logo.png" alt="Image Not Found" width={100} height={100} />
      <br />
      {/* TODO email phone number check or message validation */}
      <input
        type="text"
        autoFocus
        placeholder="Email or mobile"
        value={contactMethod}
        onChange={(e) => updateFields({ contactMethod: e.target.value })}
      />
    </FormWrapper>
  );
}
