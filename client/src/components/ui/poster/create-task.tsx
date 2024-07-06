import { pages } from "next/dist/build/templates/app-page";
import Image from "next/image";
import React from "react";

import TaskTopBar from "../task-top-bar";

export default function CreateTask() {
  return (
    <div className="justify-center">
      <TaskTopBar />
      <Image src="/task-blank-pages.svg" alt="No task" width={50} height={50} />
    </div>
  );
}
