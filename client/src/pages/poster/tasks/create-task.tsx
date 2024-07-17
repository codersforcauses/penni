import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import TaskTopBar from "@/components/ui/task-top-bar";

export default function Create() {
  const router = useRouter();
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
      <Button
        className="mt-10 w-11/12"
        label="Create a Task"
        onClick={() => router.push("/poster/tasks/new-task")}
      ></Button>
    </div>
  );
}
