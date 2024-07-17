import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { validateTaskID } from "@/lib/task-id";

interface TipProps {
  taskID: string;
}

export default function Tip({ taskID }: TipProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <p>Task: {taskID}</p>
      <Button variant="round" size="round" className="mr-4">
        $1
      </Button>
      <Button variant="round" size="round" className="mr-4">
        $10
      </Button>
      <Button variant="round" size="round" className="mr-4">
        $100
      </Button>
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  const taskID = params?.taskID as string; // Prevent type errors if not defined

  // Validate the task ID
  if (!validateTaskID(taskID)) {
    return {
      notFound: true, // Redirect to an error page on invalid ID
    };
  }

  // Fetch additional data about the task if needed
  // const res = await fetch(`https://api.example.com/tasks/${sanitizedTaskID}`);
  // const taskData = await res.json();

  return {
    props: {
      taskID,
      // taskData, // Pass additional task data as props
    },
  };
}
