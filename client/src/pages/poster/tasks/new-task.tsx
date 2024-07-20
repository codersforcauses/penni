import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import { Form, FormData } from "@/components/ui/form";
import Header from "@/components/ui/header";
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
    // TODO api post formData to backend. awiat navigate to my task list page.
    // router.push(`/poster/tasks/task-list`);
  }
  const headingStyle = "body-medium w-full text-penni-text-regular-light-mode";

  return (
    <>
      <div className="flex flex-col">
        <Header title="New Task" className="sticky h-11 w-full" />
        <Form className="w-full p-4" onSubmit={onSubmit}>
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
          <Button
            variant="default"
            size="penni"
            label="Post Task"
            type="submit"
          />
        </Form>
      </div>
    </>
  );
}
