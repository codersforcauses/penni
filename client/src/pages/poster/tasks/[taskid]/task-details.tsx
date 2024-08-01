import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import BidDetail from "@/components/ui/bidder/bid-detail";
import { Button } from "@/components/ui/button";
import { PayCallout } from "@/components/ui/callout";
import Header from "@/components/ui/header";
import BidderOfferCard from "@/components/ui/poster/bidder-offer-card";
import TaskDetails from "@/components/ui/task-details";
import TopNavtab from "@/components/ui/top-navtab";
import useFetchData from "@/hooks/use-fetch-data";
import useUserId from "@/hooks/use-user-id";
import { axiosInstance } from "@/lib/api";

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
  console.log(tasks);
  const hiredBid = tasks.filter((bid: any) => bid.status === "ONGOING")[0];
  console.log(hiredBid);

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

  const OnClickEnd = async (e: any) => {
    try {
      const response1 = await axiosInstance.patch(`/app/tasks/${taskid}/`, {
        task_id: taskid,
        status: "COMPLETED",
      });
      const response2 = await axiosInstance.patch(
        `/app/bids/${hiredBid.bid_id}/`,
        {
          bid_id: hiredBid.bid_id,
          status: "COMPLETED",
        },
      );

      console.log("Update successful:", response1.data, response2.data);
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const onClickPay = async (e: any) => {
    try {
      const response1 = await axiosInstance.patch(`/app/tasks/${taskid}/`, {
        task_id: taskid,
        status: "ONGOING",
      });
      console.log("Update successful:", response1.data);
    } catch (error) {
      console.error("Error during update:", error);
    }

    // router.push(`/poster/payment`); //link to payment detail page
  };

  const bidderInfo = (
    <div className="p-4">
      {hiredBid != undefined && (
        <>
          {hiredBid.tips != "" && (
            <PayCallout
              text={`Request from Jackson for extra charge: $${hiredBid.tips}`}
              onClick={onClickPay}
            />
          )}
          <BidDetail bidid={hiredBid.bid_id} />
          <p className="body-medium">Price: {hiredBid.price}</p>
          <div className="absolute -bottom-4 flex flex-col gap-4">
            <Button size="penni" variant="cutout">
              Contact
            </Button>
            <Button size="penni" onClick={OnClickEnd}>
              End Task
            </Button>
          </div>
        </>
      )}
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
    {
      name: "Bidder Offers",
      content: hiredBid == undefined ? bidderCards : bidderInfo,
    },
    { name: "Task details", content: taskDetail },
  ];
  return (
    <div>
      <Header title={task.title} className="sticky top-0 z-10 w-full" />
      <TopNavtab tabs={tabData} />
    </div>
  );
}
