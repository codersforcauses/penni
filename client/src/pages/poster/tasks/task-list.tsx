import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import PosterTaskCard from "@/components/ui/poster/task-card";
import TaskTopBar from "@/components/ui/task-top-bar";
// Dummy Data will be replaced by api fetch
type TaskState = "BIDDING" | "ONGOING" | "COMPLETED" | "EXPIRED";

const DummyTasks: {
  id: number;
  title: string;
  numberOfBidders: number;
  date: string;
  state: TaskState;
}[] = [
  {
    id: 1,
    title: "Cleaning up my house",
    numberOfBidders: 8,
    date: "10 Dec, 2022",
    state: "BIDDING",
  },
  {
    id: 2,
    title: "Cleaning up my house",
    numberOfBidders: 8,
    date: "10 Mar, 2022",
    state: "ONGOING",
  },
  {
    id: 3,
    title: "Cleaning up my house",
    numberOfBidders: 8,
    date: "10 Apr, 2012",
    state: "COMPLETED",
  },
  {
    id: 4,
    title: "Cleaning up my house",
    numberOfBidders: 8,
    date: "10 Aug, 2022",
    state: "EXPIRED",
  },
  {
    id: 5,
    title: "Cleaning up my house",
    numberOfBidders: 8,
    date: "10 Aug, 2022",
    state: "EXPIRED",
  },
  {
    id: 6,
    title: "Cleaning up my house",
    numberOfBidders: 8,
    date: "10 Aug, 2022",
    state: "EXPIRED",
  },
  {
    id: 7,
    title: "Cleaning up my house",
    numberOfBidders: 8,
    date: "10 Aug, 2022",
    state: "EXPIRED",
  },
];

type TaskListProp = {
  className?: string;
};

export default function TaskList({ className }: TaskListProp) {
  const router = useRouter();
  // TODO api fetch tasklist replace dummy data.
  return (
    <div
      className={`m-4 flex flex-col items-center justify-between ${className}`}
    >
      <TaskTopBar />
      <div className="mt-20 w-full">
        {DummyTasks.map((task) => (
          <div className={`mt-1`}>
            <PosterTaskCard
              title={task.title}
              numberOfBidders={task.numberOfBidders}
              date={task.date}
              state={task.state}
              onClick={() =>
                router.push(`/poster/tasks/${task.id}/task-details`)
              }
              // On Click Navigate to Task Details.
            ></PosterTaskCard>
          </div>
        ))}
      </div>
      <Button
        size="floating"
        variant="floating"
        onClick={() => router.push("/poster/tasks/new-task")}
        className={`fixed bottom-10 right-10`}
        // Naviaget to New Task page.
      >
        + New Task
      </Button>
    </div>
  );
}
