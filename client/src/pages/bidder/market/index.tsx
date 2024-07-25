import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import BottomNav from "@/components/ui/bidder/bottom-nav";
import { Task } from "@/components/ui/bidder/mytasks-list";
import TaskCard, { TaskCardProps } from "@/components/ui/bidder/task-card";
import { MarketDropdown } from "@/components/ui/dropdown";
import type { NextPageWithLayout } from "@/pages/_app";

const MarketPage: NextPageWithLayout = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [selectedLocation, setSelectedLocation] = useState("All Location");
  const today = new Date().toISOString().slice(0, 10); //get today's date "2024-7-17" to check if the task is expired
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
  const taskList = tasks.filter(
    (task) => task.deadline > today && task.state === "UNTAKEN",
  );

  const categories = ["All Category"].concat(
    Array.from(new Set(taskList.map((task) => task.category))),
  );
  const locations = ["All Location"].concat(
    Array.from(new Set(taskList.map((task) => task.location))),
  );

  return (
    <BottomNav>
      <div className="m-4 flex justify-start space-x-4">
        <MarketDropdown
          value={selectedCategory}
          options={categories}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
        <MarketDropdown
          value={selectedLocation}
          options={locations}
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
      </div>
      <div className="m-4 flex flex-col gap-4">
        {taskList
          .filter(
            (task) =>
              (selectedCategory === "All Category" ||
                task.category === selectedCategory) &&
              (selectedLocation === "All Location" ||
                task.location === selectedLocation),
          )
          .map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              category={task.category}
              date={task.date}
              location={task.location}
              duration={task.duration}
              estimatePrice={task.estimatePrice}
              myOfferPrice={task.myOfferPrice}
              priceType="Estimated Price"
              onClick={() => router.push(`/bidder/market/${task.task_id}`)}
            />
          ))}
      </div>
    </BottomNav>
  );
};

export default MarketPage;
