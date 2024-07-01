import { useState } from "react";

/*
TODOS: 
- style scroll bar in textarea?
- fix priceInput to 2 decimals?
*/

// Tailwind 'jit' don't support str concatenation so duplicating styles here... lord forgive my sins
const textStyleNoLabel =
  "m-4 flex h-14 w-auto flex-col rounded-penni-border bg-black bg-opacity-5 py-4 pl-4 pr-3 overflow-hidden";
const textStyleWithLabel =
  "m-4 flex h-14 w-auto flex-col rounded-penni-border bg-black bg-opacity-5 px-4 pb-2 pt-3 overflow-hidden";
const paragraphStyleNoLabel =
  "m-4 flex h-auto w-auto flex-col rounded-penni-border bg-black bg-opacity-5 py-4 pl-4 pr-3 overflow-y-auto";
const paragraphStyleWithLabel =
  "m-4 flex h-auto w-auto flex-col rounded-penni-border bg-black bg-opacity-5 py-4 pl-4 pr-3 overflow-y-auto";

// colour added to safelist so can concatenate colour in function
const valueStyle =
  "h-full w-full bg-transparent text-base font-normal leading-5 focus:outline-none  resize-none";
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
}

interface DropdownInputProp extends InputProp {
  options: string[];
}

interface FreeTextInputProp extends InputProp {
  placeholder?: string;
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
function TextInput({ value, onChange, label, placeholder }: FreeTextInputProp) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  return (
    <div className={label ? textStyleWithLabel : textStyleNoLabel}>
      {label && <InputLabel label={label} id={id} />}
      <input
        id={id}
        type="text"
        value={value}
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
 *   onChange={(e) => setPriceValue(parseFloat(e.target.value))}
 *   label="Enter price"
 *   placeholder="0.00"
 * />
 */
function PriceInput({
  value,
  onChange,
  label,
  placeholder,
}: FreeTextInputProp) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  return (
    <div className={label ? textStyleWithLabel : textStyleNoLabel}>
      {label && <InputLabel label={label} id={id} />}
      <div className="item-center flex size-full flex-row">
        <span className="size-4">$</span>
        <input
          id={id}
          type="number"
          value={value}
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
}: FreeTextInputProp) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  return (
    <div className={label ? paragraphStyleWithLabel : paragraphStyleNoLabel}>
      {label && <InputLabel label={label} id={id} />}
      <textarea
        id={id}
        value={value}
        rows={5}
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

/**
 * Input component with a list of options.
 
 * @param props - The properties for the DropdownInput component.
 * @param props.value - The current selected value of the dropdown, tracked by `react.setState()`
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
function DropdownInput({ value, options, onChange, label }: DropdownInputProp) {
  const [valueChanged, setValueChanged] = useState(false); // show lighter grey if not changed
  const [id] = useState(uniqueId());
  return (
    <div className={label ? textStyleWithLabel : textStyleNoLabel}>
      {label && <InputLabel label={label} id={id} />}
      <select
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
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export { DropdownInput, ParagraphInput, PriceInput, TextInput };
