import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Header from "@/components/ui/header";
import BidderOfferCard from "@/components/ui/poster/bidder-offer-card";
import TaskDetails from "@/components/ui/task-details";
import TopNavtab from "@/components/ui/top-navtab";
import useFetchData from "@/hooks/use-fetch-data";

export default function TaskDetailsPage() {
  const router = useRouter();
  const { taskid } = router.query;
  const queryReady = typeof taskid === "string";

  const {
    data: task,
    loading: taskLoading,
    error: taskError,
  } = useFetchData(`/app/tasks/${taskid}/`, queryReady);

  const {
    data: bids,
    loading: bidsLoading,
    error: bidsError,
  } = useFetchData(`/app/tasks/${taskid}/bids/`, queryReady);

  const {
    data: profiles,
    loading: profilesLoading,
    error: profilesError,
  } = useFetchData(`/app/profiles/`, true);

  if (bidsLoading || profilesLoading || taskLoading)
    return <div>Loading...</div>;

  if (bidsError) return <div>Error: {bidsError}</div>;
  if (profilesError) return <div>Error: {profilesError}</div>;
  if (taskError) return <div>Error: {taskError}</div>;

  const tasks = bids.data.map((bid: any) => {
    const bidder = profiles.find(
      (profile: any) => profile.user_id === bid.bidder_id,
    );
    return {
      ...bid,
      avatar_url: "", // src has issue, need to change to bidder?.avatar_url later
      full_name: bidder?.full_name,
      bio: bidder?.bio,
    };
  });

  const handleOnClick = (task: any) => {
    router.push(`/poster/tasks/${task.task_id}/${task.bidder_id}/bid-details`);
  };
  const bidderCards = (
    <div>
      {tasks.map((task: any, id: number) => (
        <div key={id}>
          <BidderOfferCard
            profile={task.avatar_url}
            name={task.full_name}
            price={task.price}
            bio={task.bio}
            onClick={() => {
              handleOnClick(task);
            }}
          />
        </div>
      ))}
    </div>
  );
  // task detail
  const taskData = {
    category: task?.category,
    title: task?.title,
    created_at: task?.created_at.slice(0, 10),
    suburb: task?.location,
    state: task?.location, // Adjust as needed
    estimated_time: task?.estimated_time,
    budget: task?.budget,
    description: task?.description,
  };
  const taskDetail = (
    <div className="p-4">
      <TaskDetails data={taskData} />
    </div>
  );

  const tabData = [
    { name: "Bidder Offers", content: bidderCards },
    { name: "Task details", content: taskDetail },
  ];
  return (
    <div>
      <Header title={task.title} className="sticky top-0 z-10 w-full" />
      <TopNavtab tabs={tabData} />
    </div>
  );
}
