import { SingleLineInput } from "@/components/field";

export default function Test() {
  return (
    <>
      <SingleLineInput value="hello" onChange={() => {}} />
      <SingleLineInput
        value="adawd"
        onChange={() => {}}
        description="yo buddy"
      />
    </>
  );
}
