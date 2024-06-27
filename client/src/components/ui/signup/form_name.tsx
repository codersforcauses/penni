import { FormWrapper } from "./form_wrapper";

interface NameData {
  fullname: string;
}

interface NameProps extends NameData {
  updateFields: (fields: Partial<NameData>) => void;
}

export function NameForm({ fullname, updateFields }: NameProps) {
  return (
    <FormWrapper title="Welcome!">
      {/* progress bar here */}
      <p>What should we call you?</p>
      <input
        type="text"
        placeholder="Enter full name"
        value={fullname}
        onChange={(e) => updateFields({ fullname: e.target.value })}
      />
    </FormWrapper>
  );
}
