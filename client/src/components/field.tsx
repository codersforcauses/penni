import { useState } from "react";

// Using tailwind 'jit" so can't use string concatenation
const inputStyleNoLabel =
  "m-4 flex h-14 w-auto flex-col rounded-penni-border bg-black bg-opacity-5 py-4 pl-4 pr-3";
const inputStyleWithLabel =
  "m-4 flex h-14 w-auto flex-col rounded-penni-border bg-black bg-opacity-5 px-4 pb-2 pt-3";
// colour added to safelist so can concatenate colour in function
const valueStyle =
  "h-full w-full bg-transparent text-base font-normal leading-5 focus:outline-none overflow-hidden resize-none";
// Generate unique ID for each component, used for label htmlFor attribute
const uniqueId = () => `${Date.now()}-${Math.random()}`;

type HTMLEventTargetElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface InputProp {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => void;
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

function TextInput({ value, onChange, label }: InputProp) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  return (
    <div className={label ? inputStyleWithLabel : inputStyleNoLabel}>
      {label && <InputLabel label={label} id={id} />}
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e);
          setValueChanged(true);
        }}
        className={
          valueStyle +
          (valueChanged
            ? " text-penni-text-regular-light-mode"
            : " text-penni-text-tertiary-light-mode")
        }
      />
    </div>
  );
}

function PriceInput({ value, onChange, label }: InputProp) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  return (
    <div className={label ? inputStyleWithLabel : inputStyleNoLabel}>
      {label && <InputLabel label={label} id={id} />}
      <div className="item-center flex size-full flex-row">
        <span className="size-4">$</span>
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => {
            onChange(e);
            setValueChanged(true);
          }}
          className={
            valueStyle +
            (valueChanged
              ? " text-penni-text-regular-light-mode"
              : " text-penni-text-tertiary-light-mode")
          }
        />
      </div>
    </div>
  );
}

function ParagraphInput({ value, onChange, label }: InputProp) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  return (
    <div className={label ? inputStyleWithLabel : inputStyleNoLabel}>
      {label && <InputLabel label={label} id={id} />}
      <textarea
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e);
          setValueChanged(true);
        }}
        className={
          valueStyle +
          (valueChanged
            ? " text-penni-text-regular-light-mode"
            : " text-penni-text-tertiary-light-mode")
        }
      />
    </div>
  );
}

function DropdownInput({ value, onChange, label }: InputProp) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  return (
    <div className={label ? inputStyleWithLabel : inputStyleNoLabel}>
      {label && <InputLabel label={label} id={id} />}
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e);
          setValueChanged(true);
        }}
        className={
          valueStyle +
          (valueChanged
            ? " text-penni-text-regular-light-mode"
            : " text-penni-text-tertiary-light-mode")
        }
      />
    </div>
  );
}

export { DropdownInput,ParagraphInput, PriceInput, TextInput };
