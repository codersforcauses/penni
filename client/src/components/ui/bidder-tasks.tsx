import Image from "next/image";
import React, { useEffect, useState } from "react";

import BottomNav from "./bottom-nav";
import { Button } from "./button";
import TaskCard from "./task-card";
import TopNavtab from "./top-navtab";

interface Task {
  name: string;
  title: string;
  category: string;
  date: string;
  location: string;
  duration: string;
  estimatePrice: string;
  myOfferPrice: string;
  state: "BIDDING" | "EXPIRED" | "ONGOING" | "COMPLETED";
  priceType: string;
}

interface TaskListProps {
  name: string;
  state: string[];
}

const filterTasks = (tasks: Task[], name: string, states: string[]) => {
  return tasks.filter(
    (task) => task.name === name && states.includes(task.state),
  );
};

const TaskList = ({ name, state }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  if (userTasks.length === 0) {
    return (
      <div className="relative top-36 flex flex-col items-center justify-center gap-5 px-4">
        <Image
          width={178}
          height={171}
          src="/no-task-img.svg"
          alt="Image of a girl and flowers"
        />
        <p className="body">You do not have any tasks yet</p>
        <Button className="headline h-14 w-full">Start Browsing</Button>
      </div>
    );
  } else {
    return (
      <div>
        {userTasks.map((task) => (
          <TaskCard
            title={task.title}
            category={task.category}
            date={task.date}
            location={task.location}
            duration={task.duration}
            estimatePrice={task.estimatePrice}
            myOfferPrice={task.myOfferPrice}
            state={task.state}
            priceType="My Offer"
          />
        ))}
      </div>
    );
  }
};

export default function MyTasks(name: string) {
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
