import { useState } from "react";

import { DropdownIcon } from "./icons";

// Tailwind 'jit' don't support str concatenation so stick to string templates
const inputBaseStyle =
  "m-4 flex w-auto flex-col rounded-penni-border bg-penni-background-input-light-mode justify-center";
const textStyleWithLabel = `${inputBaseStyle} px-4  h-14 overflow-hidden`;
const textStyleNoLabel = `${inputBaseStyle} py-4 pl-4 pr-3 h-14 overflow-hidden`;
const paragraphStyle = `${inputBaseStyle} h-auto py-4 pl-4 pr-3 overflow-y-auto`;
// colour added to safelist so can concatenate colour in function
const valueStyle =
  "h-full text-base font-normal leading-5 focus:outline-none  resize-none text-penni-text-regular-light-mode";
const textValueStyle = `${valueStyle} bg-transparent caret-penni-main placeholder-penni-tertiary-light-mode w-full`;
const placeholderValueStyle = `${valueStyle} bg-transparent caret-penni-main placeholder-penni-text-secondary-light-mode w-full`;

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

interface DropdownInputProps extends InputProps {
  options: string[];
}

interface FreeTextInputProps extends InputProps {
  placeholder?: string;
}

interface SingleLineInputProps extends FreeTextInputProps {
  type: "text" | "price" | "date" | "password";
}

interface DropdownMenuProps {
  menuId: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => void;
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
function DropDownLabel({ label, id }: { label: string; id: string }) {
  return (
    <label
      htmlFor={id}
      className="text-base font-normal leading-3 text-penni-text-secondary-light-mode"
    >
      {label}
    </label>
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
function SingleLineInput({
  value,
  onChange,
  label,
  placeholder,
  type,
}: SingleLineInputProps) {
  const [id] = useState(uniqueId());
  const [isSelected, setIsSelected] = useState(false);
  const [valueChanged, setValueChanged] = useState(false); // use to change input and label layout
  const handleOnBlur = (e: React.ChangeEvent<HTMLEventTargetElement>) => {
    // Fix decimal places to 2 when clicking out of input
    if (type == "price" && e.target.value !== "") {
      const fixedValue = parseFloat(e.target.value).toFixed(2);
      onChange({ ...e, target: { ...e.target, value: fixedValue } });
    }
    setIsSelected(false);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLEventTargetElement>) => {
    onChange(e);
    if (e.target.value === "") {
      setValueChanged(false);
    } else {
      setValueChanged(true);
    }
  };

  return (
    <div
      className={`${isSelected ? "border-2 border-penni-grey-border-light-mode bg-penni-main-shade2" : "bg-penni-background-input-light-mode"} ${label ? textStyleWithLabel : textStyleNoLabel}`}
    >
      {label && (isSelected || valueChanged) && (
        <InputLabel label={label} id={id} />
      )}
      <div className="item-center flex flex-row">
        {type === "price" && (isSelected || valueChanged) && (
          <span className="w-4">$</span>
        )}
        <input
          id={id}
          type={type != "date" ? type : isSelected ? type : "text"}
          value={value}
          placeholder={!label || isSelected ? placeholder : label}
          onChange={handleOnChange}
          onFocus={() => {
            setIsSelected(true);
          }}
          onBlur={handleOnBlur}
          className={isSelected ? textValueStyle : placeholderValueStyle}
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
  const [id] = useState(uniqueId());
  const [isSelected, setIsSelected] = useState(false);
  const [valueChanged, setValueChanged] = useState(false); // use to change input and label layout
  const handleOnChange = (e: React.ChangeEvent<HTMLEventTargetElement>) => {
    onChange(e);
    if (e.target.value === "") {
      setValueChanged(false);
    } else {
      setValueChanged(true);
    }
  };
  return (
    <div
      className={`${isSelected ? "border-2 border-penni-grey-border-light-mode bg-penni-main-shade2" : "bg-penni-background-input-light-mode"} ${paragraphStyle}`}
    >
      {(isSelected || valueChanged) && label && (
        <InputLabel label={label} id={id} />
      )}
      <textarea
        id={id}
        value={value}
        rows={5}
        onFocus={() => setIsSelected(true)}
        onBlur={() => setIsSelected(false)}
        placeholder={!label || isSelected ? placeholder : label}
        onChange={handleOnChange}
        className={isSelected ? textValueStyle : placeholderValueStyle}
      />
    </div>
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
    <div className="relative h-auto w-full">
      <div className="m-4 w-auto">
        <button
          id={menuId}
          type="button"
          className={`${expanded ? "border-2 border-penni-grey-border-light-mode bg-penni-main-shade2" : "bg-penni-background-input-light-mode"} " pt-3" flex h-14 w-full flex-row items-center rounded-penni-border px-4`}
          aria-haspopup={true}
          aria-expanded={true}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex w-full flex-col items-start">
            {label &&
              (valueChanged ? (
                <InputLabel label={label} id={menuId} />
              ) : (
                <DropDownLabel label={label} id={menuId} />
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

export { DropdownInput, ParagraphInput, SingleLineInput };
