import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import PosterTaskCard from "@/components/ui/poster/task-card";
import TaskTopBar from "@/components/ui/task-top-bar";
// Dummy Data will be replaced by api fetch || axios.get
type TaskState = "BIDDING" | "ONGOING" | "COMPLETED" | "EXPIRED";
export type Task = {
  id: number;
  title: string;
  numberOfBidders: number;
  date: string;
  state: TaskState;
};
const DummyTasks: Task[] = [
  {
    id: 1,
    title: "Cleaning up my house",
    numberOfBidders: 8,
    date: "10 Dec, 2022",
    state: "BIDDING",
  },
  {
    id: 2,
    title: "Moving House",
    numberOfBidders: 8,
    date: "10 Mar, 2022",
    state: "ONGOING",
  },
  {
    id: 3,
    title: "Clean Garden",
    numberOfBidders: 8,
    date: "10 Apr, 2012",
    state: "COMPLETED",
  },
  {
    id: 4,
    title: "Take care old people",
    numberOfBidders: 8,
    date: "10 Aug, 2022",
    state: "EXPIRED",
  },
  {
    id: 5,
    title: "Take card children",
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
  // TODO api fetch tasklist replace dummy data.in reverse order.
  // pass taskid and title to next page.
  function NavigateWithData(task: Task): void {
    router.push({
      pathname: `/poster/tasks/${task.id}/task-details`,
      query: task,
    });
  }
  return (
    <div
      className={`m-4 flex flex-col items-center justify-between ${className}`}
    >
      <TaskTopBar />
      <div className="mt-20 w-full">
        {DummyTasks.map((task, id) => (
          <div className={`mt-1`} key={id}>
            <PosterTaskCard
              title={task.title}
              numberOfBidders={task.numberOfBidders}
              date={task.date}
              state={task.state}
              onClick={() => {
                NavigateWithData(task);
              }}
            ></PosterTaskCard>
          </div>
        ))}
      </div>
      <Button
        size="floating"
        variant="floating"
        onClick={() => router.push("/poster/tasks/new-task")}
        className={`fixed bottom-10 right-10`}
      >
        + New Task
      </Button>
    </div>
  );
}
