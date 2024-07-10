import { Children, isValidElement, ReactElement,useState } from "react";

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
  [name: string]: string;
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
 */

// }: {
//   fields: FieldData[];
//   onSubmit: (vals: FormData[]) => void;
//   header?: React.ReactNode;
//   footer?: React.ReactNode;
// }) {
//   const values: { name?: string; value: string }[] = [];
//   const setValues: React.Dispatch<React.SetStateAction<string>>[] = [];
//   for (const field of fields) {
//     // Create state for each input
//     for (const input of field.inputs) {
//       const [value, setValue] = useState(input.value || "");
//       values.push({ name: input.name, value: value });
//       setValues.push(setValue);
//     }
//   }
//   let runningIndex = 0; // index for values and setValues

//   function formAction(e: React.FormEvent) {
//     e.preventDefault();
//     onSubmit(
//       values.filter((item): item is FormData => item.name !== undefined),
//     );
//   }

//   return (
//     <form onSubmit={formAction}>
//       {header && header}
//       {fields.map((field, fieldIdx) => {
//         return (
//           <div
//             key={fieldIdx}
//             className={fieldIdx + 1 === fields.length ? "" : "pb-6"}
//           >
//             {field.title && (
//               <div className="w-full pb-2">
//                 <h1 className="body-medium w-full text-penni-text-regular-light-mode">
//                   {field.title}
//                 </h1>
//               </div>
//             )}
//             {field.subtitle && (
//               <div className="w-full pb-4">
//                 <h2 className="subheadline w-full text-penni-text-secondary-light-mode">
//                   {field.subtitle}
//                 </h2>
//               </div>
//             )}

//             {field.inputs.map((input, inputIdx) => {
//               const i = runningIndex++;
//               const props = {
//                 value: values[i].value,
//                 label: input.label,
//                 placeholder: input.placeholder,
//                 onChange: (e: React.ChangeEvent<HTMLEventTargetElement>) => {
//                   setValues[i](e.target.value);
//                 },
//               };
//               let inputComponent;
//               if (input.type === "paragraph") {
//                 inputComponent = <ParagraphInput {...props} />;
//               } else if (input.type === "dropdown") {
//                 inputComponent = (
//                   <DropdownInput
//                     {...props}
//                     options={(input as DropdownData).options}
//                   />
//                 );
//               } else {
//                 inputComponent = (
//                   <SingleLineInput {...props} type={input.type} />
//                 );
//               }
//               return (
//                 <div
//                   key={i}
//                   className={`h-auto w-full ${inputIdx + 1 == field.inputs.length ? "" : "pb-4"}`}
//                 >
//                   {inputComponent}
//                 </div>
//               );
//             })}
//           </div>
//         );
//       })}
//       {footer && footer}
//     </form>
//   );
// }

// title-input: 8px
// title-subtitle: 8px
// input-input: 16px
// button-button: 16px
// subtitle-input: 16 px
// input-button: 24px
// input-title: 24px

export function Form({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (vals: FormData) => void;
}) {
  const values: FormData = {};
  const setValues: React.Dispatch<React.SetStateAction<string>>[] = [];
  Children.forEach(children, (child) => {
    // Validation, require unique name for each named input
    if (!isValidElement(child) || child.props["name"]) return;
    if (
      !(
        child.type === SingleLineInput ||
        child.type === ParagraphInput ||
        child.type === DropdownInput
      )
    )
      return;
    if (child.props.name in values)
      throw new Error(`Duplicate input name: ${child.props.name}`);

    const [val, setVal] = useState(child.props.value || "");
    values[child.props.name] = val;
    setValues.push(setVal);
  });
  const childArray = Children.toArray(children);

  function formAction(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  function Spacer({ height }: { height: string }) {
    return <div className={`${height} w-full`} />;
  }
  // for each element, wrap in div
  // if header, w-full
  return (
    <form onSubmit={formAction}>
      {childArray.map((child, idx) => {
        if (!isValidElement(child)) return child;
        let spacing = "";
        if (!isValidElement(childArray[idx + 1])) spacing = "pb-0"; // undefined

        switch (child.type) {
          case SingleLineInput || ParagraphInput || DropdownInput:
          // width = 8 if next subtitle, 24 if button or title, else 0
          case "h1":
          case "h2":
          case "button":
        }
      })}
    </form>
  );
}
