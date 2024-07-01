import { useState } from "react";

// TODO: Figma didn't use defined colour palette :( possibly change this?

export default function Form() {
  const [val, setVal] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVal(e.target.value);
  }

  return (
    <form>
      <label>
        Input
        <input type="text" value={val} onChange={handleChange} />
      </label>
    </form>
  );
}

interface InputProp {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
}

export function SingleLineInput({ value, onChange, description }: InputProp) {
  return (
    <div className="m-4 h-14 w-full rounded-penni-border bg-black bg-opacity-5 py-4 pl-4 pr-3">
      <label>
        <span>Input</span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full bg-penni-text-regular-light-mode bg-transparent text-2xl"
        />
      </label>
    </div>
  );
}
/*
export default function Search() {
  function search(formData) {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
  }
  return (
    <form action={search}>
      <input name="query" />
      <button type="submit">Search</button>
    </form>
  );
}

*/
