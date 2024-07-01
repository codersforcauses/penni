import { SERVFAIL } from "dns";
import { useState } from "react";

import { SingleLineInput } from "@/components/field";

export default function Test() {
  const [val, setVal] = useState("Entere stuff here");
  return (
    <>
      <SingleLineInput
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
        label="afdasfds"
      />
      <SingleLineInput value="hello" onChange={() => {}} />
    </>
  );
}
