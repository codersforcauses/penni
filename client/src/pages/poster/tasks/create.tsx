import { pages } from "next/dist/build/templates/app-page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import TaskTopBar from "@/components/ui/task-top-bar";

export default function Create() {
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
      <Link href="/poster/tasks/new" className="mt-10 w-4/5">
        <Button className="mt-10 w-full" label="Create a Task"></Button>
      </Link>
    </div>
  );
}
