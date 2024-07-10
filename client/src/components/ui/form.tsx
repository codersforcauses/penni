import { Children, isValidElement, ReactElement, useState } from "react";

import { Button } from "./button";
import {
  DropdownInput,
  HTMLTextTargetElement,
  InputContext,
  ParagraphInput,
  SingleLineInput,
} from "./inputs";

interface FormProps {
  children: React.ReactNode;
  onSubmit: (vals: FormData) => void;
  className?: string;
}

// Each field is returned by form as a name-value pair
interface FormData {
  [name: string]: string;
}

/**
 * Form component rendering and handling input states using JSON input
 *
 * Form creates new `useState()` variables and setters for each input field
 * and renders spacing based on the type of elements before and after it. Currently,
 * only spacing for `h1`, `h2`, `Button`, `SingleLineInput`, `ParagraphInput`, and
 * `DropdownInput` is supported.
 *
 * **NOTE: Only inputs with a `name` attribute are included in the form data**
 *
 * @param props - list of fields, onSubmit function, and optional header and footer
 * @param props.children - list of fields to render. Input components' states are
 *     automatically managed by the form component.
 * @param props.onSubmit - function to call when form is submitted. The function
 *     will receive a dictionary of input names and values.
 * @param props.className - optional class name to apply to the form
 *
 * @returns Rendered form component.
 *
 * @example
 * <Form className="m-4" onSubmit={(dict) => {console.log(dict);}}>
 *   <h1>Player details</h1>
 *   <h2>pspsps give us your data pspsps</h2>
 *   <SingleLineInput name="playerName"  // value and setValue not needed
 *     label="Your Name pls" type="text"
 *   />
 *   <ParagraphInput name="PlayerReason" label="Why did you chose to join us?"
 *     placeholder="Ever since I was little, I've always been passionate about not starving to death."
 *   />
 *   <DropdownInput // `name` not supplied so this input is ignored on submission
 *     value="Yes"
 *     options={["Yes", "Yes", "Yes"]}
 *   />
 *   <Button className="w-full" variant={"outline"} type="button">Cancel</Button>
 *   <Button className="w-full" type="submit">Submit</Button>
 * </Form>
 */
export function Form({ children, onSubmit, className }: FormProps) {
  function isInputComponent(child: ReactElement) {
    return (
      child.type === SingleLineInput ||
      child.type === ParagraphInput ||
      child.type === DropdownInput
    );
  }

  const values: { name?: string; value: string }[] = [];
  const setValues: React.Dispatch<React.SetStateAction<string>>[] = [];
  // Populate values and setValues
  Children.forEach(children, (child) => {
    if (!isValidElement(child) || !isInputComponent(child)) return;

    if (
      child.props.name &&
      values.find((item) => item.name === child.props.name)
    )
      throw new Error(`Duplicate input name: ${child.props.name}`);

    const [val, setVal] = useState(child.props.value ?? "");
    values.push({ name: child.props.name, value: val });
    setValues.push(setVal);
  });

  const childArray = Children.toArray(children); // get array so can check next item arr[idx + 1]
  let inputIdx = 0; // Children are not all input components, so need to keep track of input index

  function formAction(e: React.FormEvent) {
    e.preventDefault();
    const formValues: FormData = {};
    values.forEach((nameVal) => {
      if (nameVal.name) formValues[nameVal.name] = nameVal.value;
    });
    onSubmit(formValues);
  }

  // Return spacing based on the current element and the next element
  function mapSpacing({ child, idx }: { child: ReactElement; idx: number }) {
    if (idx + 1 == childArray.length || !isValidElement(childArray[idx + 1]))
      return "pb-0";
    const nextElement = childArray[idx + 1] as ReactElement;

    if (isInputComponent(child)) {
      if (isInputComponent(nextElement)) return "pb-4";
      // h1 indicate starting a new section, button indicate end of form
      // grouped into 2 if statements for readability
      if (
        nextElement.type == "h1" ||
        nextElement.type == "h2" ||
        nextElement.type == Button
      )
        return "pb-6";
    }
    switch (child.type) {
      case nextElement.type: // same element should be grouped together
        return "pb-4";
      case "h1": // Should only be followed by Input components and h2, group close
        return "pb-2";
      case "h2": // Should only be followed by Input components, group further than h1-h2
        return "pb-4";
    }
  }

  return (
    <form onSubmit={formAction} className={className}>
      {childArray.map((child, idx) => {
        // no spacing, can't put in mapSpacing, check should be performed outside
        if (!isValidElement(child)) return child;

        let spacing = mapSpacing({ child, idx });
        if (!isInputComponent(child))
          return (
            <div key={idx} className={`w-full ${spacing}`}>
              {child}
            </div>
          );

        const i = inputIdx++; // Needed for some reason, can't use inputIdx directly
        return (
          <div key={idx} className={`w-full ${spacing}`}>
            <InputContext.Provider
              value={{
                value: values[i].value,
                onChange: (e: React.ChangeEvent<HTMLTextTargetElement>) => {
                  setValues[i](e.target.value);
                },
              }}
            >
              {child}
            </InputContext.Provider>
          </div>
        );
      })}
    </form>
  );
}
