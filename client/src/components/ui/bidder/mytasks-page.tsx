import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import EmptyListDisplay from "../empty-list-display";
import TopNavtab from "../top-navtab";
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
  name: string;
  state: string[];
}

// using user name and state to filter task
const filterTasks = (tasks: Task[], name: string, states: string[]) => {
  return tasks.filter(
    (task) => task.name === name && states.includes(task.state),
  );
};

function TaskList({ name, state }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // client-side data fetching, using mock data in "/api/tasks-test" to test it
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks-test");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setTasks(data.tasks);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const userTasks = filterTasks(tasks, name, state);
  userTasks.sort((a, b) => {
    const typeA = a.state;
    const typeB = b.state;
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
  if (userTasks.length === 0) {
    return (
      <div className="relative top-36 flex w-full justify-center">
        <EmptyListDisplay
          type="bidder"
          onClick={() => router.push(`/bidder/market`)}
        />
      </div>
    );
  } else {
    return (
      <div className="m-4 flex flex-col gap-4">
        {userTasks.map((task, id) => (
          <TaskCard
            key={id}
            title={task.title}
            category={task.category}
            date={task.date}
            location={task.location}
            duration={task.duration}
            estimatePrice={task.estimatePrice}
            myOfferPrice={task.myOfferPrice}
            state={task.state}
            priceType="My Offer"
            onClick={() => router.push(`/bidder/market/${task.task_id}`)}
          />
        ))}
      </div>
    );
  }
}

interface BidderMyTasksProp {
  name: string;
}

export default function BidderMyTasks({ name }: BidderMyTasksProp) {
  const myTasksStates = ["COMPLETED", "ONGOING"];
  const myBidsStates = ["BIDDING", "EXPIRED"];

  return (
    <>
      <TopNavtab
        isFixed={true}
        tabs={[
          {
            name: "My Tasks",
            content: <TaskList name={name} state={myTasksStates} />,
          },
          {
            name: "My Bids",
            content: <TaskList name={name} state={myBidsStates} />,
          },
        ]}
      />
    </>
  );
}
