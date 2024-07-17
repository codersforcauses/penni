import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  DropdownInput,
  ParagraphInput,
  SingleLineInput,
} from "@/components/ui/inputs";

const TaskCategories = ["Cleaning", "Delivery", "Handyman", "Moving"];
const States = ["VIC", "NSW", "QLD", "NT", "WA", "SA", "TAS", "ACT"];
export default function NewTask() {
  const formData = new FormData();
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [time, setTime] = React.useState("");
  const [price, setPrice] = React.useState(0.0);
  const [date, setDate] = React.useState("");
  const [state, setState] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [details, setDetails] = React.useState("What is the task about?");
  const router = useRouter();
  const backImg = "/back.svg";
  const titleStyle = "relative bottom-2 left-4 text-xl font-bold";
  function OnSubmit() {
    // api post data to backend.
    formData.append("category", category);
    formData.append("title", title);
    formData.append("time", time);
    formData.append("price", price.toString());
    formData.append("date", date);
    formData.append("state", state);
    formData.append("address", address);
    formData.append("details", details);
    // TODO api post formData to backend. awiat navigate to my task list page.
    router.push(`/poster/tasks/task-list`);
  }
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="sticky top-0 z-10 mt-3 flex h-12 w-screen justify-center bg-white">
          <Link href="/poster/tasks/create-task">
            <Image
              className="absolute left-10 top-2"
              src={backImg}
              alt="back"
              width={30}
              height={30}
            />
          </Link>
          <h1 className="absolute top-2 text-center font-mono text-2xl font-bold">
            New Task
          </h1>
          <hr className="mt-12 w-full" />
        </div>
        <Form className="mt-4 w-10/12" onSubmit={OnSubmit}>
          <p className={titleStyle}>Task Information</p>
          {[
            <DropdownInput
              label="Task Category"
              options={TaskCategories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />,
            <SingleLineInput
              label="Task Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
            />,
            <SingleLineInput
              label="Estimated Time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
              type="text"
            />,
            <SingleLineInput
              label="Estimated Price"
              onChange={(e) => {
                let num = parseFloat(e.target.value);
                setPrice(Number(num.toFixed(2)));
              }}
              value={price}
              type="price"
            />,
          ].map((input) => {
            return <div className="w-full px-4 pb-4">{input}</div>;
          })}
          <p className={titleStyle}>Date and Location</p>
          {[
            <SingleLineInput
              label="Select a date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
              type="date"
            />,
            <SingleLineInput
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
            />,
            <DropdownInput
              label="State"
              options={States}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />,
          ].map((input) => {
            return <div className="w-full px-4 pb-4">{input}</div>;
          })}
          <p className={titleStyle}>Task Details</p>
          <div className="w-full px-4 pb-4">
            <ParagraphInput
              label=""
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            />
            <Button
              className="mt-4 h-12 w-full"
              type="submit"
              label="Post Task"
            ></Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
