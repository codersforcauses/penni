import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Header from "@/components/ui/header";
import BidderOfferCard from "@/components/ui/poster/bidder-offer-card";
import TaskDetails from "@/components/ui/task-details";
import TopNavtab from "@/components/ui/top-navtab";
import useFetchData from "@/hooks/use-fetch-data";
import useUserId from "@/hooks/use-user-id";

export default function TaskDetailsPage() {
  const router = useRouter();
  const { taskid } = router.query;
  const queryReady = typeof taskid === "string";
  // const { userId, loading: userIdLoading, error: userIdError } = useUserId();
  // const {
  //   data: user,
  //   loading: userLoading,
  //   error: userError,
  // } = useFetchData(`/app/users/${userId}/`, !!userId);

  // if (userIdLoading || userLoading) return <div>Loading...</div>;
  // if (userIdError || userError)
  //   return <div>Error: {userIdError || userError}</div>;
  const {
    data: task,
    loading: taskLoading,
    error: taskError,
  } = useFetchData(`/app/tasks/${taskid}/`, queryReady);
  const {
    data: profiles,
    loading: profilesLoading,
    error: profilesError,
  } = useFetchData(`/app/users/`, true);

  if (profilesLoading || taskLoading) return <div>Loading...</div>;

  if (profilesError) return <div>Error: {profilesError}</div>;
  if (taskError) return <div>Error: {taskError}</div>;

  const tasks = task.bids.map((bid: any) => {
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
    router.push(`/poster/tasks/${task.task_id}/${task.bid_id}/bid-details`);
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
    deadline: task?.deadline.slice(0, 10),
    suburb: task?.location.suburb,
    state: task?.location.state, // Adjust as needed
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
