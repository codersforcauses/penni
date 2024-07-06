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
