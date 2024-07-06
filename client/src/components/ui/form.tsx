import { useState } from "react";

import {
  DropdownInput,
  HTMLEventTargetElement,
  ParagraphInput,
  SingleLineInput,
} from "./inputs";

interface InputData {
  value?: string;
  name?: string; // If not specified, ignored on form submission
  label?: string;
  placeholder?: string;
}

interface TextInputData extends InputData {
  type: "text" | "price" | "date" | "password" | "paragraph";
}

interface DropdownData extends InputData {
  type: "dropdown";
  options: string[];
}

export interface FieldData {
  title?: string;
  subtitle?: string;
  inputs: (TextInputData | DropdownData)[];
}

// Each field is returned by form as a name-value pair
interface FormData {
  name: string;
  value: string;
}

/**
 * Form component rendering and handling input states using JSON input
 *
 * Form renders a list of fields represented as `{title, subtitle, inputs}` where
 * `title` and `subtitle` are optional and inputs is a list of input components
 * such as single-line text, price, dropdown, and paragraph inputs. Each input can have
 * a `label`, `placeholder`, and `value` attribute with additional attributes depending
 * on the input type. Form data is represented as an array of `{name, value}` pairs.
 *
 * **NOTE: The submit button is not provided**
 *
 * **NOTE: Only inputs with a `name` attribute are included in the form data**
 *
 * @param props - list of fields, onSubmit function, and optional header and footer
 * @param props.fields - list of fields; object with a list of inputs and optional title and subtitle
 * @param props.onSubmit - function to call when form is submitted; form data is passed as an array of {name, value} pairs
 * @param props.header - (*Optional*) JSX element to render before the form
 * @param props.footer - (*Optional*) JSX element to render after the form
 *
 * @returns Rendered form component with inputs, title and subtitle.
 *
 * @example
 * const fields: FieldData[] = [
 *   {
 *     title: "Player details",
 *     subtitle: "pspsps give us your data pspsps",
 *     inputs: [
 *         {
 *           label: "Your name",
 *           placeholder: "Extremely cool and epic gamer xx00xx",
 *           type: "text",
 *         },
 *         {
 *           label: "Why did you chose to join us?",
 *           placeholder: "Ever since I was little, I've always been passionate about not starving to death.",
 *           type: "paragraph",
 *         },
 *     ],
 *   },
 *   {
 *     title: "How much $$$ do you have???",
 *     inputs: [
 *       {
 *         value: "0",
 *         type: "price",
 *       },
 *       {
 *         label: "Will you donate to us?",
 *         type: "dropdown",
 *         value: "Yes",
 *         options: ["Yes", "Yes", "Yes"],
 *       },
 *     ],
 *   },
 * ];
 *
 * <Form
 *   fields={fields}
 *   onSubmit={(e) => console.log(e)}
 *   footer={<button type="submit">Submit</button>}
 * />
 */
export function Form({
  fields,
  onSubmit,
  header,
  footer,
}: {
  fields: FieldData[];
  onSubmit: (vals: FormData[]) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const values: { name?: string; value: string }[] = [];
  const setValues: React.Dispatch<React.SetStateAction<string>>[] = [];
  for (const field of fields) {
    // Create state for each input
    for (const input of field.inputs) {
      const [value, setValue] = useState(input.value || "");
      values.push({ name: input.name, value: value });
      setValues.push(setValue);
    }
  }
  let runningIndex = 0; // index for values and setValues

  function formAction(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(
      values.filter((item): item is FormData => item.name !== undefined),
    );
  }

  return (
    <form onSubmit={formAction}>
      {header && header}
      {fields.map((field, field_idx) => {
        return (
          <div key={field_idx}>
            {field.title && <h1>{field.title}</h1>}
            {field.subtitle && <h2>{field.subtitle}</h2>}

            {field.inputs.map((input) => {
              const i = runningIndex++;
              const props = {
                value: values[i].value,
                label: input.label,
                placeholder: input.placeholder,
                onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => {
                  setValues[i](e.target.value);
                },
              };

              if (input.type === "paragraph")
                return <ParagraphInput {...props} key={i} />;
              if (input.type === "dropdown")
                return (
                  <DropdownInput
                    {...props}
                    options={(input as DropdownData).options}
                    key={i}
                  />
                );
              return <SingleLineInput {...props} type={input.type} key={i} />;
            })}
          </div>
        );
      })}
      {footer && footer}
    </form>
  );
}
