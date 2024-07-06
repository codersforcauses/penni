import React, { useState } from "react";

import { MarketDropdownIcon } from "./icons";

// Change background colour and show border when onFocus
// Uses border-opacity because adding border-2 shifts the content inside div
const selectedStyle =
  "border-opacity-100 border-penni-grey-border-light-mode bg-penni-main-shade2";
const deselectedStyle =
  "border-penni-grey-border-light-mode bg-penni-background-light-mode";
// Padding changes when onFocus as label size changes and children is rendered
const expandedStyle = "px-4 justify-center";
const collapsedStyle = "py-4 pl-4 pr-3";

// Display only the label when not onFocus, otherwise display shrinked label and children
const labelStyle =
  "body select-none hover:cursor-text h-full w-full text-penni-text-regular-light-mode";

// Style for value that user type in
const valueStyle =
  "body  h-full w-full resize-none bg-transparent text-penni-text-regular-light-mode caret-penni-main focus:outline-none";

// Generate unique ID for each component, used for label htmlFor attribute
const uniqueId = () => `${Date.now()}-${Math.random()}`;

type HTMLEventTargetElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface DropdownInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => void;
  label: string;
  options: string[];
}

interface DropdownMenuProps {
  menuId: string;
  options: string[];
  label: string;
  onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => void;
}

function DropdownMenu({ menuId, options, label, onChange }: DropdownMenuProps) {
  const optionList = [label, ...options];
  return (
    <div className="relative">
      <div className="h-auto w-36">
        <ul
          className="absolute left-0 z-10 mt-px flex w-36 origin-top-right flex-col items-start rounded-penni-card bg-penni-background-input-light-mode px-2 py-1 shadow-lg focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={menuId}
          tabIndex={-1}
        >
          {optionList.map((option, index) => (
            <li
              key={index}
              value={option}
              className={`${valueStyle} select-none rounded-penni-border px-2 py-2 hover:cursor-pointer hover:bg-penni-grey-inactive`}
              role="menuitem"
              tabIndex={-1}
              onClick={() =>
                onChange({
                  target: { value: option },
                } as React.ChangeEvent<HTMLEventTargetElement>)
              }
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
   * Dropdown component in bidders side market page with a list of options.
   
   * @param props - The properties for the DropdownInput component.
   * @param props.value - Value of the selected option, tracked by `react.setState()`.
   * @param props.options - List of possible option for that category, displayed in dropdown.
   * @param props.onChange - Called when the selected value changes, should update `value`.
   * @param props.label - Label for the field, display "All ...".
   *
   * @returns dropdown component to select different categories.
   *
   * @example
   * // Example usage:
   * // initial state is '', display all tasks, them use onChange function to get selected category that can be used to send query to database
   * const [selectedValue, setSelectedValue] = useState('');
   * <MarketDropdown
   *   value={selectedValue}
   *   options={['C', 'Python', 'HTML']}
   *   onChange={(e) => setSelectedValue(e.target.value)}
   *   label="All Language"
   * />
   */
export function MarketDropdown({
  value,
  options,
  onChange,
  label,
}: DropdownInputProps) {
  const [menuId] = useState(uniqueId());
  const [isExpanded, setExpanded] = useState(false); // isSelect in text inputs

  function handleOnChange(e: React.ChangeEvent<HTMLEventTargetElement>) {
    setExpanded(false);
    onChange(e);
  }

  const containerStyle =
    `duration-50 flex flex-row h-9 w-36 items-center rounded-penni-border px-3  border transition-all ease-out` +
    ` ${isExpanded ? selectedStyle : deselectedStyle} `;

  return (
    <div className="relative">
      <div className="w-auto">
        <button
          id={menuId}
          type="button"
          className={containerStyle}
          aria-haspopup={true}
          aria-expanded={true}
          onClick={() => setExpanded(!isExpanded)}
        >
          <div className="flex w-full items-center justify-between">
            {value === "" ? (
              <label htmlFor={menuId} className={` ${labelStyle} text-left`}>
                {label}
              </label>
            ) : (
              <span className={`${valueStyle} text-left`}>{value}</span>
            )}

            <div className="flex w-2.5 items-center">
              <MarketDropdownIcon className="w-full text-penni-text-regular-light-mode" />
            </div>
          </div>
        </button>
      </div>

      {isExpanded && (
        <DropdownMenu
          menuId={menuId}
          label={label}
          options={options}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
}
