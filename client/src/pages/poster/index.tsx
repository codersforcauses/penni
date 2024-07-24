import jwt from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ErrorCallout } from "@/components/ui/callout";
import PosterTaskCard, {
  PosterTaskCardProps,
} from "@/components/ui/poster/task-card";
import TaskTopBar from "@/components/ui/poster/task-top-bar";
import { axiosInstance } from "@/lib/api";

export function Create() {
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

type TaskListProp = {
  className?: string;
  tasks: any[];
};

function TaskList({ className, tasks }: TaskListProp) {
  const router = useRouter();
  // TODO api fetch tasklist replace dummy data.in reverse order.
  // pass taskid and title to next page.

  return (
    <div
      className={`m-4 flex flex-col items-center justify-between ${className}`}
    >
      <TaskTopBar />
      <div className="w-full">
        {tasks.map((task, index) => (
          <div className={`mt-1`} key={index}>
            <PosterTaskCard
              title={task.title}
              numberOfBidders={5} //need to get bidder data
              date={task.deadline.slice(0, 10)}
              state={task.status}
              onClick={() => {
                router.push({
                  pathname: `/poster/tasks/${task.task_id}/task-details`,
                });
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

export default function PosterTasksPage() {
  const [tasks, setTasks] = useState<object[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/app/tasks/");
        const jsonResponse = response.data;

        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decoded = jwt.decode(token) as { user_id: string };
        const user_id = decoded.user_id;

        const filteredTasks = jsonResponse.filter(
          (item: any) => item.owner_id === user_id,
        );

        setTasks(filteredTasks);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const hasTask = tasks.length > 0;

  return (
    <div>
      {error != "" ? (
        <ErrorCallout className="pb-4" text={error} />
      ) : !hasTask ? (
        <Create />
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
}
