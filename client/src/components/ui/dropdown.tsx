import React, { useState } from "react";

import { DropdownIcon } from "./icons";

// Change background colour and show border when onFocus
// Uses border-opacity because adding border-2 shifts the content inside div
const selectedStyle =
  "border-opacity-100 border-penni-grey-border-light-mode bg-penni-main-shade2";
const deselectedStyle =
  "border-penni-grey-border-light-mode bg-penni-background-light-mode";

// Display only the label when not onFocus, otherwise display shrinked label and children
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

interface DropdownButtonProps {
  children: React.ReactNode;
  id: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style: string;
  caretWidth: number; //px
}

interface DropdownMenuProps {
  menuId: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DropdownButton({
  id,
  children,
  onClick,
  style,
  caretWidth,
}: DropdownButtonProps) {
  return (
    <button
      id={id}
      type="button"
      className={style}
      aria-haspopup={true}
      aria-expanded={true}
      onClick={onClick}
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
  );
}

export function DropdownMenu({ menuId, options, onChange }: DropdownMenuProps) {
  return (
    <div className="relative">
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
  const [isExpanded, setExpanded] = useState(false); // isSelect in text inputs

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setExpanded(false);
    onChange(e);
  }
  function handleOnClick() {
    setExpanded(!isExpanded);
  }
  const containerStyle =
    `duration-50 flex flex-row h-9 w-full items-center rounded-penni-border px-3  border transition-all ease-out` +
    ` ${isExpanded ? selectedStyle : deselectedStyle} `;
  const optionList = [label, ...options];
  return (
    <div className="relative w-36">
      <DropdownButton
        id={menuId}
        style={containerStyle}
        onClick={handleOnClick}
        caretWidth={10}
      >
        {value === "" ? (
          <label htmlFor={menuId} className={` ${labelStyle} text-left`}>
            {label}
          </label>
        ) : (
          <span className={`${valueStyle} text-left`}>{value}</span>
        )}
      </DropdownButton>

      {isExpanded && (
        <DropdownMenu
          menuId={menuId}
          options={optionList}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
}
