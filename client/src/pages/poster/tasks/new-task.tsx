import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormData } from "@/components/ui/form";
import Header from "@/components/ui/header";
import {
  DropdownInput,
  ParagraphInput,
  SingleLineInput,
} from "@/components/ui/inputs";
import { axiosInstance } from "@/lib/api";

export default function NewTask() {
  const router = useRouter();

  const handleSubmit = async (e: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const decoded = jwt.decode(token) as { user_id: string };
    const user_id = decoded.user_id;
    e["poster_id"] = user_id;
    e["status"] = "BIDDING";
    e["location"] = {
      suburb: e.suburb,
      state: e.suburb,
    };
    delete e["suburb"]; // API miss this field
    delete e["state"]; // API miss this field
    try {
      const response = await axiosInstance.post("/app/tasks/", e);
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const onSubmit = (e: FormData) => {
    handleSubmit(e);
    console.log(e); // test
    router.push(`/poster`); // test
  };
  const headingStyle = "body-medium w-full text-penni-text-regular-light-mode";

  return (
    <>
      <div className="flex flex-col">
        <Header title="New Task" className="sticky h-11 w-full" />
        <Form className="w-full p-4" onSubmit={onSubmit}>
          {/* Not using <Heading> Because of the vertical padding :( */}
          <h1 className={headingStyle}>Task Information</h1>
          <DropdownInput
            name="category"
            label="Task Category"
            options={["Cleaning", "Delivery", "Handyman", "Moving"]}
            required={true}
          />
          <SingleLineInput
            name="title"
            label="Task Title"
            type="text"
            required={true}
          />
          <SingleLineInput
            name="estimated_time"
            label="Estimated Time"
            type="text"
          />
          <SingleLineInput
            name="budget"
            label="Estimated Price"
            type="price"
            required={true}
          />
          <h1 className={headingStyle}>Date and Location</h1>
          <SingleLineInput
            name="deadline"
            label="Select a date"
            type="date"
            required={true}
          />
          <SingleLineInput
            name="suburb"
            label="Suburb"
            type="text"
            required={true}
          />
          <DropdownInput
            name="state"
            label="State"
            options={["VIC", "NSW", "QLD", "NT", "WA", "SA", "TAS", "ACT"]}
            required={true}
          />
          <h1 className={headingStyle}>Task Details</h1>
          <ParagraphInput
            name="description"
            placeholder="What is your task about?"
            required={true}
          />
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
