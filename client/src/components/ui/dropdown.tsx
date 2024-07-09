import React, { useState } from "react";

import { DropdownIcon } from "./icons";

// Change background colour and show border when onFocus
// Uses border-opacity because adding border-2 shifts the content inside div
const selectedStyle =
  "border-opacity-100 border-penni-grey-border-light-mode bg-penni-main-shade2";
const deselectedStyle =
  "border-penni-grey-border-light-mode bg-penni-background-light-mode";

const labelStyle =
  "body select-none hover:cursor-pointer h-full w-full text-penni-text-regular-light-mode";

// Style for value that user type in
const valueStyle =
  "body h-full w-full resize-none bg-transparent text-penni-text-regular-light-mode caret-penni-main focus:outline-none";

// Generate unique ID for each component, used for label htmlFor attribute
const uniqueId = () => `${Date.now()}-${Math.random()}`;

interface MarketDropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  options: string[];
}

interface DropdownMenuProps {
  menuId: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface DropdownButtonProps extends DropdownMenuProps {
  children: React.ReactNode;
  buttonStyle: string; // only height and padding tailwind style, e.g. "h-14 px-4"
  caretWidth: number; //px
  selectedStyle: string;
  deselectedStyle: string;
}

export function DropdownMenu({ menuId, options, onChange }: DropdownMenuProps) {
  return (
    <div className="relative" tabIndex={-1}>
      <div className="h-auto w-full">
        <ul
          className="absolute left-0 z-10 mt-px flex w-full origin-top-right flex-col rounded-penni-card bg-penni-background-input-light-mode px-2 py-2 text-center shadow-lg focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={menuId}
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              key={index}
              value={option}
              className={`${valueStyle} select-none rounded-penni-border px-2 py-2 hover:cursor-pointer hover:bg-penni-grey-inactive`}
              role="menuitem"
              tabIndex={-1}
              onClick={() =>
                onChange({
                  target: { value: option },
                } as React.ChangeEvent<HTMLInputElement>)
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

export function DropdownButton({
  children,
  buttonStyle,
  onChange,
  menuId,
  options,
  caretWidth,
  selectedStyle,
  deselectedStyle,
}: DropdownButtonProps) {
  const [isExpanded, setExpanded] = useState(false);
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setExpanded(false);
    onChange(e);
  }
  function handleOnClick() {
    setExpanded(!isExpanded);
  }
  function handleOnBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setExpanded(false);
    }
  }
  const containerStyle =
    `duration-50 m-0 flex flex-row w-full items-center rounded-penni-border border-2 transition-all ease-out` +
    ` ${isExpanded ? selectedStyle : deselectedStyle} ` +
    `${buttonStyle}`;
  return (
    <div onBlur={handleOnBlur} tabIndex={-1}>
      <button
        id={menuId}
        type="button"
        className={containerStyle}
        aria-haspopup={true}
        aria-expanded={true}
        onClick={handleOnClick}
      >
        <div className="flex w-full items-center justify-between">
          {children}
          <div
            className="flex items-center justify-end"
            style={{ width: `${caretWidth}px` }}
          >
            <DropdownIcon strokeColour="penni-text-regular-light-mode" />
          </div>
        </div>
      </button>
      {isExpanded && (
        <DropdownMenu
          menuId={menuId}
          options={options}
          onChange={handleOnChange}
        />
      )}
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
}: MarketDropdownProps) {
  const [menuId] = useState(uniqueId());
  const buttonStyle = "h-9 px-3 ";
  const optionList = [label, ...options];

  return (
    <div className="relative h-auto w-36">
      <DropdownButton
        caretWidth={10}
        menuId={menuId}
        options={optionList}
        onChange={onChange}
        buttonStyle={buttonStyle}
        selectedStyle={selectedStyle}
        deselectedStyle={deselectedStyle}
      >
        {value === "" ? (
          <label htmlFor={menuId} className={` ${labelStyle} text-left`}>
            {label}
          </label>
        ) : (
          <span className={`${valueStyle} text-left`}>{value}</span>
        )}
      </DropdownButton>
    </div>
  );
}
