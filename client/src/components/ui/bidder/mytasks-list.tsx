import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useFetchData from "@/hooks/use-fetch-data";

import EmptyListDisplay from "../empty-list-display";
import TaskCard from "./task-card";

export interface Task {
  task_id: number;
  name: string;
  title: string;
  category: string;
  date: string;
  location: string;
  duration: string;
  estimatePrice: string;
  myOfferPrice: string;
  state: "BIDDING" | "EXPIRED" | "ONGOING" | "COMPLETED" | "UNTAKEN";
  priceType: string;
  suburb: string;
  description: string;
  deadline: string;
}

interface TaskListProps {
  userid: number;
  states: string[];
}

export default function TaskList({ userid, states }: TaskListProps) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  console.log("1");
  const router = useRouter();
  const {
    data: bids,
    loading: bidsLoading,
    error: bidsError,
  } = useFetchData(`/app/users/${userid}/bids`, true);
  console.log(bids);
  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useFetchData(`/app/tasks/`, true);
  console.log(tasksData);
  useEffect(() => {
    if (!bidsLoading && !tasksLoading && bids && tasksData) {
      try {
        const bidDetails = bids.data.map((bid: any) => {
          const taskDetail = tasksData.find(
            (task: any) => task.task_id === bid.task_id,
          );
          return {
            ...bid,
            category: taskDetail.category,
            title: taskDetail.title,
            date: taskDetail.deadline.slice(0, 10),
            location: taskDetail.location,
            duration: taskDetail.estimated_time,
            estimatePrice: taskDetail.budget,
          };
        });
        setTasks(bidDetails);
        console.log(bidDetails);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          console.error(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    }
  }, [bidsLoading, tasksLoading, bids, tasksData]);

  if (bidsLoading || tasksLoading) return <div>Loading...</div>;
  if (bidsError || tasksError)
    return <div>Error: {bidsError || tasksError}</div>;
  console.log(tasks);
  console.log(states);
  // use state to filter task
  const filterTasks = (tasks: any[], states: string[]) => {
    return tasks.filter((task) => states.includes(task.status));
  };
  const userTasks = filterTasks(tasks, states);
  userTasks.sort((a, b) => {
    const typeA = a.status;
    const typeB = b.status;
    const dateA = a.date;
    const dateB = b.date;
    if (
      (typeA === "ONGOING" || typeA === "BIDDING") &&
      (typeB === "COMPLETED" || typeB === "EXPIRED")
    ) {
      return -1;
    } else if (
      (typeA === "COMPLETED" || typeA === "EXPIRED") &&
      (typeB === "ONGOING" || typeB === "BIDDING")
    ) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else return 0;
  });
  // tasks needs to be changed to userTasks later(bc the status cannot be filtered rn)
  if (tasks.length === 0) {
    return (
      <div className="relative top-36 flex w-full justify-center">
        <EmptyListDisplay
          type="bidder"
          onClick={() => router.push(`/bidder/market`)}
        />
      </div>
    );
  } else {
    // tasks needs to be changed to userTasks later(bc the status cannot be filtered rn)
    return (
      <div className="m-4 flex flex-col gap-4">
        {tasks.map((task, id) => (
          <TaskCard
            key={id}
            title={task.title}
            category={task.category}
            date={task.date}
            location={task.location}
            duration={task.duration}
            estimatePrice={task.estimatePrice}
            myOfferPrice={task.price}
            state={task.status}
            priceType="My Offer"
            onClick={() => router.push(`/bidder/market/${task.task_id}`)}
          />
        ))}
      </div>
    );
  }
}
