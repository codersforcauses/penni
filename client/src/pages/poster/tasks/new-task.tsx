import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import { Form, FormData } from "@/components/ui/form";
import {
  DropdownInput,
  ParagraphInput,
  SingleLineInput,
} from "@/components/ui/inputs";

export default function NewTask() {
  const router = useRouter();
  function onSubmit(e: FormData) {
    console.log(e);
    router.push(`/poster/tasks/task-list`);
    // api post data to backend.
    // TODO api post formData to backend. awiat navigate to my task list page.
    // router.push(`/poster/tasks/task-list`);
  }
  const headingStyle = "body-medium w-full text-penni-text-regular-light-mode";

  return (
    <>
      <Form className="m-4" onSubmit={onSubmit}>
        {/* Not using <Heading> Because of the vertical padding :( */}
        <h1 className={headingStyle}>Task Information</h1>
        <DropdownInput
          label="Task Category"
          options={["Cleaning", "Delivery", "Handyman", "Moving"]}
        />
        <SingleLineInput label="Task Title" type="text" />
        <SingleLineInput label="Estimated Time" type="text" />
        <SingleLineInput label="Estimated Price" type="price" />
        <h1 className={headingStyle}>Date and Location</h1>
        <SingleLineInput label="Select a date" type="date" />
        <SingleLineInput label="Address" type="text" />
        <DropdownInput
          label="State"
          options={["VIC", "NSW", "QLD", "NT", "WA", "SA", "TAS", "ACT"]}
        />
        <h1 className={headingStyle}>Task Details</h1>
        <ParagraphInput label="" />
        <Button label="Post Task" type="submit" />
      </Form>
    </>
  );
}

//   const formData = new FormData();
//   const [category, setCategory] = React.useState("");
//   const [title, setTitle] = React.useState("");
//   const [time, setTime] = React.useState("");
//   const [price, setPrice] = React.useState(0.0);
//   const [date, setDate] = React.useState("");
//   const [state, setState] = React.useState("");
//   const [suburb, setSuburb] = React.useState("");
//   const [details, setDetails] = React.useState("What is the task about?");
//   const router = useRouter();
//   const titleStyle = "relative pt-4 bottom-2 left-4 text-xl font-bold";
//   function OnSubmit() {
//     // api post data to backend.
//     formData.append("category", category);
//     formData.append("title", title);
//     formData.append("time", time);
//     formData.append("price", price.toString());
//     formData.append("date", date);
//     formData.append("state", state);
//     formData.append("suburb", suburb);
//     formData.append("details", details);
//     // TODO api post formData to backend. awiat navigate to my task list page.
//     router.push(`/poster/tasks/task-list`);
//   }
//   return (
//     <div>
//       <div className="flex flex-col items-center">
//         <Header title="New Task" className="sticky top-0 z-10 w-full" />
//         <Form className="mt-4 w-10/12" onSubmit={OnSubmit}>
//           <p className={titleStyle}>Task Information</p>
//           {[
//             <DropdownInput
//               label="Task Category"
//               options={TaskCategories}
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             />,
//             <SingleLineInput
//               label="Task Title"
//               onChange={(e) => setTitle(e.target.value)}
//               value={title}
//               type="text"
//             />,
//             <SingleLineInput
//               label="Estimated Time"
//               onChange={(e) => setTime(e.target.value)}
//               value={time}
//               type="text"
//             />,
//             <SingleLineInput
//               label="Estimated Price"
//               onChange={(e) => {
//                 let num = parseFloat(e.target.value);
//                 setPrice(Number(num.toFixed(2)));
//               }}
//               value={price.toString()}
//               type="price"
//             />,
//           ].map((input, index) => {
//             return (
//               <div key={index} className="w-full px-4">
//                 {input}
//               </div>
//             );
//           })}
//           <p className={titleStyle}>Date and Location</p>
//           {[
//             <SingleLineInput
//               label="Select a date"
//               onChange={(e) => {
//                 setDate(e.target.value);
//               }}
//               value={date}
//               type="date"
//             />,
//             <SingleLineInput
//               label="Address"
//               onChange={(e) => setSuburb(e.target.value)}
//               value={suburb}
//               type="text"
//             />,
//             <DropdownInput
//               label="State"
//               options={States}
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//             />,
//           ].map((input, index) => {
//             return (
//               <div key={index} className="w-full px-4">
//                 {input}
//               </div>
//             );
//           })}
//           <p className={titleStyle}>Task Details</p>
//           <div className="w-full px-4 py-2">
//             <ParagraphInput
//               label=""
//               value={details}
//               onChange={(e) => {
//                 setDetails(e.target.value);
//               }}
//             />
//             <Button
//               className="mt-4 h-12 w-full"
//               type="submit"
//               label="Post Task"
//             ></Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }
