import { useState } from "react";

import { DropdownIcon } from "./icons";

// Tailwind 'jit' don't support str concatenation so stick to string templates
const inputBaseStyle =
  "m-4 flex w-auto flex-col rounded-penni-border bg-black bg-opacity-5";
const textStyleWithLabel = `${inputBaseStyle} px-4 pb-2 pt-3 h-14 overflow-hidden`;
const textStyleNoLabel = `${inputBaseStyle} py-4 pl-4 pr-3 h-14 overflow-hidden`;
const paragraphStyle = `${inputBaseStyle} h-auto py-4 pl-4 pr-3 overflow-y-auto`;
// colour added to safelist so can concatenate colour in function
const valueStyle =
  "caret-penni-main h-full bg-transparent text-base font-normal leading-5 focus:outline-none  resize-none";

// Generate unique ID for each component, used for label htmlFor attribute
const uniqueId = () => `${Date.now()}-${Math.random()}`;

type HTMLEventTargetElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => void;
  label?: string;
}

interface DropdownInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => void;
  label?: string;
  options: string[];
}

interface DropdownMenuProps {
  menuId: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => void;
}
/*
Type '(e: ChangeEventHandler<HTMLOptionElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLSelectElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'ChangeEvent<HTMLSelectElement>' is not assignable to type 'ChangeEventHandler<HTMLOptionElement>'.
      Type 'ChangeEvent<HTMLSelectElement>' provides no match for the signature '(event: ChangeEvent<HTMLOptionElement>): void'.ts(2322)
*/
interface FreeTextInputProps extends InputProps {
  placeholder?: string;
}

function InputLabel({ label, id }: { label: string; id: string }) {
  return (
    <label
      htmlFor={id}
      className="text-xs font-normal leading-3 text-penni-text-secondary-light-mode"
    >
      {label}
    </label>
  );
}

/**
 * Input component for text on a single line.
 *
 * @param props - The properties for the TextInput component.
 * @param props.value - The current text value of the input, tracked by `react.setState()`.
 * @param props.onChange - Called when the text value changes, should update `value`.
 * @param props.label - (*Optional*) Label for the field, displayed above the input.
 * @param props.placeholder - (*Optional*) Placeholder text for the input field.
 *
 * @returns Input component for free text.
 *
 * @example
 * // Example usage:
 * const [textValue, setTextValue] = useState('');
 * <TextInput
 *   value={textValue}
 *   onChange={(e) => setTextValue(e.target.value)}
 *   label="Enter text"
 *   placeholder="Type here..."
 * />
 */
function TextInput({
  value,
  onChange,
  label,
  placeholder,
}: FreeTextInputProps) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`${isSelected ? "bg-opacity-0" : "bg-opacity-5"} ${label ? textStyleWithLabel : textStyleNoLabel}`}
    >
      {label && <InputLabel label={label} id={id} />}
      <input
        id={id}
        type="text"
        value={value}
        onFocus={() => setIsSelected(true)}
        onBlur={() => setIsSelected(false)}
        onChange={(e) => {
          onChange(e);
          setValueChanged(true);
        }}
        placeholder={placeholder}
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

/**
 * Input for price values, with a dollar sign and two decimal places.
 *
 * @param props - The properties for the PriceInput component.
 * @param props.value - The current numeric value of the input, tracked by `react.setState()`.
 * @param props.onChange - Called when the numeric value changes, should update `value`.
 * @param props.label - (*Optional*) Label for the field, displayed above the input.
 * @param props.placeholder - (*Optional*) Placeholder text for the input field.
 *
 * @returns Input component for entering price values.
 *
 * @example
 * // Example usage:
 * const [priceValue, setPriceValue] = useState(0);
 * <PriceInput
 *   value={priceValue}
 *   onChange={(e) => setPriceValue(e.target.value)}
 *   label="Enter price"
 *   placeholder="0.00"
 * />
 */
function PriceInput({
  value,
  onChange,
  label,
  placeholder,
}: FreeTextInputProps) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  const [isSelected, setIsSelected] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLEventTargetElement>) => {
    onChange(e);
    setValueChanged(true);
  };
  // Fix decimal places to 2 when clicking out of input
  const handleOnBlur = (e: React.ChangeEvent<HTMLEventTargetElement>) => {
    const fixedValue = parseFloat(e.target.value).toFixed(2);
    setIsSelected(false);
    onChange({ ...e, target: { ...e.target, value: fixedValue } });
  };

  return (
    <div
      className={`${isSelected ? "bg-opacity-0" : "bg-opacity-5"} ${label ? textStyleWithLabel : textStyleNoLabel}`}
    >
      {label && <InputLabel label={label} id={id} />}
      <div className="item-center flex size-full flex-row">
        <span className="size-4">$</span>
        <input
          id={id}
          type="number"
          value={value}
          placeholder={placeholder}
          onChange={handleOnChange}
          onFocus={() => setIsSelected(true)}
          onBlur={handleOnBlur}
          className={
            `${valueStyle} w-full` + // Align right spinner to end of input
            (valueChanged
              ? " text-penni-text-regular-light-mode"
              : " text-penni-text-tertiary-light-mode")
          }
        />
      </div>
    </div>
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
function ParagraphInput({
  value,
  onChange,
  label,
  placeholder,
}: FreeTextInputProps) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`${isSelected ? "bg-opacity-0" : "bg-opacity-5"} ${paragraphStyle}`}
    >
      {label && <InputLabel label={label} id={id} />}
      <textarea
        id={id}
        value={value}
        rows={5}
        onFocus={() => setIsSelected(true)}
        onBlur={() => setIsSelected(false)}
        placeholder={placeholder}
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

function DropdownMenu({ menuId, options, onChange }: DropdownMenuProps) {
  return (
    <div
      className="absolute right-0 z-10 mx-4 -mt-3 flex w-56 origin-top-right flex-col rounded-penni-card bg-black bg-opacity-5 shadow-lg focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={menuId}
      tabIndex={-1}
    >
      {options.map((option, index) => (
        <button
          value={option}
          className={`${valueStyle} select-none px-4 py-3 hover:cursor-pointer hover:bg-penni-grey-inactive ${index === 0 ? "hover:rounded-t-penni-border" : ""} ${index === options.length - 1 ? "hover:rounded-b-penni-border" : ""}`}
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
function DropdownInput({
  value,
  options,
  onChange,
  label,
}: DropdownInputProps) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [menuId] = useState(uniqueId());
  const [expanded, setExpanded] = useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLEventTargetElement>) => {
    setValueChanged(true);
    setExpanded(false);
    onChange(e);
  };

  return (
    <>
      <div className="m-4 w-auto">
        <button
          id={menuId}
          className="flex h-14 w-full flex-row items-center rounded-penni-border bg-black bg-opacity-5 px-4 pb-2 pt-3"
          aria-haspopup={true}
          aria-expanded={true}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex w-full flex-col items-start">
            {label && <InputLabel label={label} id={menuId} />}
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
    </>
  );
}

export { DropdownInput, ParagraphInput, PriceInput, TextInput };
