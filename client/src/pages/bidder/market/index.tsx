import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import BottomNav from "@/components/ui/bidder/bottom-nav";
import TaskCard, { TaskCardProps } from "@/components/ui/bidder/task-card";
import { MarketDropdown } from "@/components/ui/dropdown";
import useFetchData from "@/hooks/use-fetch-data";
import type { NextPageWithLayout } from "@/pages/_app";

const MarketPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [selectedLocation, setSelectedLocation] = useState("All Location");

  const {
    data: tasks,
    loading: taskLoading,
    error: taskError,
  } = useFetchData(`/app/tasks/`, true);
  if (taskLoading)
    return (
      <BottomNav>
        <div>Loading...</div>
      </BottomNav>
    );
  if (taskError)
    return (
      <BottomNav>
        <div>Error: {taskError}</div>
      </BottomNav>
    );
  const taskList = tasks.filter(
    (task: any) => task.status === "BIDDING", // now the task api doesn't have correct status "BIDDING", need to change later
  );
  const categories = ["All Category"].concat(
    Array.from(new Set(taskList.map((task: any) => task.category))),
  );
  const locations = ["All Location"].concat(
    Array.from(new Set(taskList.map((task: any) => task.location))),
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
            (task: any) =>
              (selectedCategory === "All Category" ||
                task.category === selectedCategory) &&
              (selectedLocation === "All Location" ||
                task.location === selectedLocation),
          )
          .map((task: any, index: number) => (
            <TaskCard
              key={index}
              title={task.title}
              category={task.category}
              date={task.deadline.slice(0, 10)}
              location={`${task.location.suburb}, ${task.location.state}`}
              duration={task.estimated_time}
              estimatePrice={task.budget}
              priceType="Estimated Price"
              onClick={() => router.push(`/bidder/market/${task.task_id}`)}
            />
          ))}
      </div>
    </BottomNav>
  );
};

export default MarketPage;
