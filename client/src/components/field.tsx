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
  label?: string;
}

// Using tailwind 'jit" so can't use string concatenation
const inputStyleNoLabel =
  "m-4 flex h-14 w-full flex-col rounded-penni-border bg-black bg-opacity-5 py-4 pl-4 pr-3";
const inputStyleWithLabel =
  "m-4 flex h-14 w-full flex-col rounded-penni-border bg-black bg-opacity-5 px-4 pb-2 pt-3";
const inputValueStyle =
  "h-full w-full bg-transparent text-base font-normal leading-5 text-penni-text-regular-light-mode";

function InputLabel({ label }: { label: string }) {
  return (
    <span className="w-full text-xs font-normal leading-3 text-penni-text-secondary-light-mode">
      {label}
    </span>
  );
}

export function SingleLineInput({ value, onChange, label }: InputProp) {
  return (
    <label className={label ? inputStyleWithLabel : inputStyleNoLabel}>
      {label && <InputLabel label={label} />}
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={inputValueStyle}
      />
    </label>
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
