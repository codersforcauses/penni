import React, { useState } from "react";

import { DropdownButton, DropdownMenu } from "./dropdown";

// Change background colour and show border when onFocus
// Uses border-opacity because adding border-2 shifts the content inside div
const selectedStyle =
  "border-opacity-100 border-penni-grey-border-light-mode bg-penni-main-shade2";
const deselectedStyle =
  "border-transparent bg-penni-background-input-light-mode";
// Padding changes when onFocus as label size changes and children is rendered
const expandedStyle = "px-4 justify-center";
const collapsedStyle = "py-4 pl-4 pr-3";

// Display only the label when not onFocus, otherwise display shrinked label and children
const labelStyleLarge =
  "callout select-none h-full w-full text-penni-text-secondary-light-mode";
const labelStyleSmall = "caption text-penni-text-secondary-light-mode";

// Style for value that user type in
const valueStyle =
  "callout placeholder-penni-tertiary-light-mode h-full w-full resize-none bg-transparent text-penni-text-regular-light-mode caret-penni-main focus:outline-none";

// Generate unique ID for each component, used for label htmlFor attribute
const uniqueId = () => `${Date.now()}-${Math.random()}`;

type HTMLTextTargetElement = HTMLInputElement | HTMLTextAreaElement;

interface TextInputContainerProps {
  value: string;
  label?: string;
  placeholder: string;
  id: string;
  isSelected: boolean;
  multiline?: boolean;
  setIsSelected: (value: boolean) => void;
  children?: React.ReactNode;
}

// Shared by all input components
interface InputProps {
  value: string;
  label?: string;
}

interface SingleLineInputProps extends InputProps {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextTargetElement>) => void;
  type: "text" | "price" | "date" | "password";
}

interface ParagraphInputProps extends InputProps {
  onChange: (e: React.ChangeEvent<HTMLTextTargetElement>) => void;
  placeholder?: string;
}

interface DropdownInputProps extends InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: string[];
}

// Container for single-line and paragraph inputs, handles onFocus and onBlur events
function TextInputContainer({
  value,
  label,
  placeholder,
  id,
  multiline = false, // Changes height of container
  isSelected,
  setIsSelected,
  children,
}: TextInputContainerProps) {
  const selectedOrNotEmpty = isSelected || value !== "";

  const containerStyle =
    `duration-50  flex flex-col rounded-penni-border border-2 hover:cursor-text` +
    ` ${isSelected ? selectedStyle : deselectedStyle} ` +
    ` ${selectedOrNotEmpty ? expandedStyle : collapsedStyle} ` +
    ` ${multiline ? "h-36 overflow-y-auto" : `h-14 overflow-hidden`}`;

  return (
    <div
      tabIndex={0} // Support for onFocus and onBlur
      onFocus={() => {
        setIsSelected(true);
      }}
      onBlur={() => setIsSelected(false)}
      className={`${containerStyle} ${label ? "transition-all ease-out" : null}`}
    >
      {selectedOrNotEmpty && !label ? null : (
        <label
          htmlFor={id}
          className={`hover:cursor-pointer ${selectedOrNotEmpty ? labelStyleSmall : labelStyleLarge} duration-50 transition-all ease-out`}
        >
          {label ? label : placeholder}
        </label>
      )}
      {selectedOrNotEmpty && (
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
 * const [priceValue, setPriceValue] = useState('');
 * <SingleLineInput
 *   value={priceValue}
 *   onChange={(e) => setPriceValue(e.target.value)}
 *   label="Your donation"
 *   placeholder="0.00"
 *   type="price"
 * />
 */
export function SingleLineInput({
  value,
  onChange,
  label,
  placeholder = "",
  type,
}: SingleLineInputProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [id] = useState(uniqueId());

  function handleOnChange(e: React.ChangeEvent<HTMLTextTargetElement>) {
    // Fix decimal places to 2 when clicking out of input
    if (type == "price" && e.target.value !== "") {
      const fixedValue = parseFloat(e.target.value).toFixed(2);
      onChange({ ...e, target: { ...e.target, value: fixedValue } });
      // Fix year to length 4
    } else if (type == "date" && e.target.value.length > 10) {
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
      placeholder={placeholder}
      id={id}
      isSelected={isSelected}
      multiline={false}
      setIsSelected={setIsSelected}
    >
      {/* note: $ is only displayed on select because of the container */}
      {type === "price" && (isSelected || value) != "" && (
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
        className={valueStyle}
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
 *   label="Self Introduction"
 *   placeholder="My name is Yoshikage Kira. I'm 33 years old. My house is in th..."
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
      placeholder={placeholder ? placeholder : ""}
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
        className={valueStyle}
      />
    </TextInputContainer>
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
 *   options={['C', 'Python', 'HTML ;)']}
 *   onChange={(e) => setSelectedValue(e.target.value)}
 *   label="Favorite Programming Language"
 * />
 */
export function DropdownInput({
  value,
  options,
  onChange,
  label,
}: DropdownInputProps) {
  const [menuId] = useState(uniqueId());
  const style = "h-14 px-4";

  return (
    <div className="relative h-auto w-full">
      <DropdownButton
        menuId={menuId}
        buttonStyle={style}
        caretWidth={24}
        onChange={onChange}
        selectedStyle={selectedStyle}
        deselectedStyle={deselectedStyle}
        options={options}
      >
        <div className="flex w-full flex-col items-start">
          {label && (
            <label
              htmlFor={menuId}
              className={`${value !== "" ? labelStyleSmall : labelStyleLarge} duration-50 text-left transition-all ease-out hover:cursor-pointer`}
            >
              {label}
            </label>
          )}
          {value !== "" && (
            <span className={`hover:cursor-pointer ${valueStyle} text-left`}>
              {value}
            </span>
          )}
        </div>
      </DropdownButton>
    </div>
  );
}
