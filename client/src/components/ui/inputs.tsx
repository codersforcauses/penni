import React, { useRef, useState } from "react";

import { DropdownIcon } from "./icons";

const valueStyle =
  "h-full text-base font-normal leading-5 focus:outline-none  resize-none text-penni-text-regular-light-mode";

// Generate unique ID for each component, used for label htmlFor attribute
const uniqueId = () => `${Date.now()}-${Math.random()}`;

type HTMLEventTargetElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface TextInputContainerProps {
  value: string;
  label?: string;
  id: string;
  isSelected: boolean;
  multiline?: boolean;
  setIsSelected: (value: boolean) => void;
  children?: React.ReactNode;
}

// Shared by all input components
interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => void;
  label?: string;
}

interface SingleLineInputProps extends InputProps {
  placeholder?: string;
  type: "text" | "price" | "date" | "password";
}

interface ParagraphInputProps extends InputProps {
  placeholder?: string;
}

interface DropdownInputProps extends InputProps {
  options: string[];
}

interface DropdownMenuProps {
  menuId: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => void;
}

// Label displayed above actual input if onFocus, otherwise displayed as placeholder
function InputLabel({
  label,
  id,
  className,
}: {
  label: string;
  id: string;
  className: string;
}) {
  return (
    <label htmlFor={id} className={className}>
      {label}
    </label>
  );
}

// Container for input components, handles onFocus and onBlur events
function TextInputContainer({
  value,
  label,
  id,
  isSelected,
  multiline = false,
  setIsSelected,
  children,
}: TextInputContainerProps) {
  const emptyValue = value === "";

  const selectedStyle =
    "border-opacity-100 border-penni-grey-border-light-mode bg-penni-main-shade2";
  const deselectedStyle =
    "border-transparent bg-penni-background-input-light-mode";
  const expandedStyle = "px-4 justify-center";
  const collapsedStyle = "py-4 pl-4 pr-3";

  const labelStyleLarge =
    "select-none hover:cursor-text h-full w-full text-base font-normal leading-5 text-penni-text-secondary-light-mode";
  const labelStyleSmall =
    "text-xs font-normal leading-3 text-penni-text-secondary-light-mode";

  return (
    <div
      tabIndex={0} // Support for onFocus and onBlur
      onFocus={() => {
        setIsSelected(true);
      }}
      onBlur={() => setIsSelected(false)}
      className={`duration-50 m-4 flex ${multiline ? "h-36 overflow-y-auto" : `h-14 overflow-hidden`} flex-col rounded-penni-border border-2 transition-all ease-out hover:cursor-text ${isSelected ? selectedStyle : deselectedStyle} ${!emptyValue || isSelected ? expandedStyle : collapsedStyle}`}
    >
      <label
        htmlFor={id}
        className={`${isSelected || !emptyValue ? labelStyleSmall : labelStyleLarge} duration-50 transition-all ease-out`}
      >
        {label}
      </label>
      {(isSelected || !emptyValue) && (
        <div className="item-center flex flex-row">{children}</div>
      )}
    </div>
  );
}

/**
 * Input component for single line input for text, price, or date.
 *
 * @param props - The properties for the PriceInput component.
 * @param props.value - The current numeric value of the input, tracked by `react.setState()`.
 * @param props.onChange - Called when the numeric value changes, should update `value`.
 * @param props.label - (*Optional*) Label for the field, displayed above the input.
 * @param props.placeholder - (*Optional*) Placeholder text for the input field.
 * @param props.type - Type of the input field, can be "text" | "price" | "date" | "password" .
 *
 * @returns Input component for entering price values.
 *
 * @example
 * // Example usage:
 * const [priceValue, setPriceValue] = useState(0);
 * <SingleLineInput
 *   value={priceValue}
 *   onChange={(e) => setPriceValue(e.target.value)}
 *   label="Enter price"
 *   placeholder="0.00"
 *   type="price"
 * />
 */
export function SingleLineInput({
  value,
  onChange,
  label,
  placeholder,
  type,
}: SingleLineInputProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [id] = useState(uniqueId());

  function handleOnChange(e: React.ChangeEvent<HTMLEventTargetElement>) {
    // Fix decimal places to 2 when clicking out of input
    if (type == "price" && e.target.value !== "") {
      const fixedValue = parseFloat(e.target.value).toFixed(2);
      onChange({ ...e, target: { ...e.target, value: fixedValue } });
    } else if (
      type == "date" &&
      e.target.value !== "" &&
      e.target.value.length > 10
    ) {
      const parts = e.target.value.split("-");
      if (parts[0].length !== 4) {
        const correctedYear = parts[0].slice(0, 4);
        onChange({
          ...e,
          target: {
            ...e.target,
            value: `${correctedYear}-${parts[1]}-${parts[2]}`,
          },
        });
      }
    }
  }

  return (
    <TextInputContainer
      value={value}
      label={label}
      id={id}
      isSelected={isSelected}
      multiline={false}
      setIsSelected={setIsSelected}
    >
      {type === "price" && (isSelected || value !== "") && (
        <span className="w-4">$</span>
      )}
      <input
        id={id}
        autoFocus={isSelected}
        type={type === "price" ? "number" : type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleOnChange}
        className="placeholder-penni-tertiary-light-mode h-full w-full resize-none bg-transparent text-base font-normal leading-5 text-penni-text-regular-light-mode caret-penni-main focus:outline-none"
      />
    </TextInputContainer>
  );
}

/**
 * ParagraphInput Component
 *
 * @param props - The properties for the ParagraphInput component.
 * @param props.value - The current text value of the textarea, tracked by `react.setState()`.
 * @param props.onChange - Called when the text value changes, should update `value`.
 * @param props.label - (*Optional*) Label for the field, displayed above the textarea.
 * @param props.placeholder - (*Optional*) Placeholder text for the textarea.
 *
 * @returns Textarea component for entering paragraphs of text.
 *
 * @example
 * // Example usage:
 * const [paragraphValue, setParagraphValue] = useState('');
 * <ParagraphInput
 *   value={paragraphValue}
 *   onChange={(e) => setParagraphValue(e.target.value)}
 *   label="Enter text"
 *   placeholder="Type here..."
 * />
 */
export function ParagraphInput({
  value,
  onChange,
  label,
  placeholder,
}: ParagraphInputProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [id] = useState(uniqueId());

  return (
    <TextInputContainer
      value={value}
      label={label}
      id={id}
      multiline={true}
      isSelected={isSelected}
      setIsSelected={setIsSelected}
    >
      <textarea
        id={id}
        autoFocus={isSelected}
        rows={5}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="placeholder-penni-tertiary-light-mode h-full w-full resize-none bg-transparent text-base font-normal leading-5 text-penni-text-regular-light-mode caret-penni-main focus:outline-none"
      />
    </TextInputContainer>
  );
}

function DropdownMenu({ menuId, options, onChange }: DropdownMenuProps) {
  return (
    <div className="relative">
      <div className="h-auto w-full">
        <div
          className="absolute left-0 right-0 z-10 -m-3 mx-4 flex origin-top-right flex-col rounded-penni-card bg-penni-background-input-light-mode px-2 py-3 shadow-lg focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={menuId}
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <button
              value={option}
              className={`${valueStyle} select-none rounded-penni-border px-4 py-3 hover:cursor-pointer hover:bg-penni-grey-inactive`}
              role="menuitem"
              tabIndex={-1}
              key={index}
              onClick={() => {
                const dummyEvent = {
                  target: { value: option },
                } as React.ChangeEvent<HTMLEventTargetElement>;
                onChange(dummyEvent);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Input component with a list of options.
 
 * @param props - The properties for the DropdownInput component.
 * @param props.value - Value of the selected option, tracked by `react.setState()`.
 * @param props.options - List of possible values for `value`, displayed in dropdown.
 * @param props.onChange - Called when the selected value changes, should update `value`.
 * @param props.label - (*Optional*) Label for the field, displayed above input.
 *
 * @returns Input component with a list of dropdown options.
 *
 * @example
 * // Example usage:
 * const [selectedValue, setSelectedValue] = useState('');
 * <DropdownInput
 *   value={selectedValue}
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   onChange={(e) => setSelectedValue(e.target.value)}
 *   label="Choose an option"
 * />
 */
export function DropdownInput({
  value,
  options,
  onChange,
  label,
}: DropdownInputProps) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [menuId] = useState(uniqueId());
  const [expanded, setExpanded] = useState(false);

  const selectedStyle =
    "border-2 border-penni-grey-border-light-mode bg-penni-main-shade2";

  const textValueStyle = `${valueStyle} bg-transparent caret-penni-main placeholder-penni-tertiary-light-mode w-full`;

  function handleOnChange(e: React.ChangeEvent<HTMLEventTargetElement>) {
    setValueChanged(true);
    setExpanded(false);
    onChange(e);
  }

  return (
    <div className="relative h-auto w-full">
      <div className="m-4 w-auto">
        <button
          id={menuId}
          type="button"
          className={`${expanded ? selectedStyle : "bg-penni-background-input-light-mode"} " pt-3" flex h-14 w-full flex-row items-center rounded-penni-border px-4`}
          aria-haspopup={true}
          aria-expanded={true}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex w-full flex-col items-start">
            {label &&
              (valueChanged ? (
                <InputLabel
                  label={label}
                  id={menuId}
                  className={textValueStyle}
                />
              ) : (
                <InputLabel
                  label={label}
                  id={menuId}
                  className="text-base font-normal leading-3 text-penni-text-secondary-light-mode"
                />
              ))}
            <span
              className={
                valueStyle +
                (valueChanged
                  ? " text-penni-text-regular-light-mode"
                  : " text-penni-text-tertiary-light-mode")
              }
            >
              {value}
            </span>
          </div>
          <div className="ml-3 flex size-6 items-center justify-center">
            <DropdownIcon />
          </div>
        </button>
      </div>

      {expanded && (
        <DropdownMenu
          menuId={menuId}
          options={options}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
}
