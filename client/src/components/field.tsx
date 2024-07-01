import { useState } from "react";

// Using tailwind 'jit" so can't use string concatenation
// TODO: For bg-black bg-opacity-5 no colour is defined in Figma, change this possibly?
const inputStyleNoLabel =
  "m-4 flex h-14 w-auto flex-col rounded-penni-border bg-black bg-opacity-5 py-4 pl-4 pr-3";
const inputStyleWithLabel =
  "m-4 flex h-14 w-auto flex-col rounded-penni-border bg-black bg-opacity-5 px-4 pb-2 pt-3";
const inputValueStyle =
  "h-full w-full bg-transparent text-base font-normal leading-5 text-penni-text-regular-light-mode focus:outline-none overflow-hidden resize-none";
const uniqueId = () => `${Date.now()}-${Math.random()}`;

interface InputProp {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  defaultValue?: string;
}

function InputLabel({ label, id }: { label: string; id: string }) {
  return (
    <label
      htmlFor={id}
      className="w-full text-xs font-normal leading-3 text-penni-text-secondary-light-mode"
    >
      {label}
    </label>
  );
}

export function SingleLineInput({ value, onChange, label }: InputProp) {
  const [id] = useState(uniqueId());
  return (
    <>
      <div className={label ? inputStyleWithLabel : inputStyleNoLabel}>
        {label && <InputLabel label={label} id={id} />}
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          className={inputValueStyle}
        />
      </div>
    </>
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
