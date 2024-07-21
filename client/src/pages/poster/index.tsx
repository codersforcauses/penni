import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

import { PosterTaskCardProps } from "@/components/ui/poster/task-card";
import { axiosInstance } from "@/lib/api";

import Create from "./tasks/create-task";
import TaskList from "./tasks/task-list";

export default function PosterTasksPage() {
  const [tasks, setTasks] = useState<object[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/app/tasks/");
        const jsonResponse = response.data;
        // console.log(jsonResponse);

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
          console.error("Error fetching user data:", error.message);
          setError(error.message);
        } else {
          console.error("An unexpected error occurred:", error);
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

  return <div>{!hasTask ? <Create /> : <TaskList />}</div>;
}
