import Image from "next/image";

import { FormWrapper } from "./form_wrapper";

interface ProfileData {
  // really string?
  profile?: string;
}

interface ProfileProps extends ProfileData {
  updateFields: (fields: Partial<ProfileData>) => void;
}

export function ProfileForm({ profile, updateFields }: ProfileProps) {
  return (
    <FormWrapper title="Your Profile">
      {/* TODO Show skip here */}
      <p>Upload a profile photo so others can recognise you!</p>
      <Image
        id="upload_profile"
        src="/upload.png"
        alt="Image Not Found"
        width={100}
        height={100}
      />
    </FormWrapper>
  );
}
