import { pages } from "next/dist/build/templates/app-page";
import Image from "next/image";
import React from "react";

import { Button } from "../button";
import TaskTopBar from "../task-top-bar";

export default function CreateTask() {
  return (
    <div className="flex flex-col items-center">
      <TaskTopBar />
      <Image
        className="mt-52"
        src="/task-blank-page.svg"
        alt="No task"
        width={200}
        height={200}
      />
      <p className="mt-10 font-bold">You do not have any orders yet</p>
      <Button className="mt-10 w-4/5" label="Create a Task" />
    </div>
  );
}
