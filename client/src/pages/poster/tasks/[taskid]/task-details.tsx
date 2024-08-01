import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import BidDetail from "@/components/ui/bidder/bid-detail";
import { Button } from "@/components/ui/button";
import { PayCallout } from "@/components/ui/callout";
import { Option } from "@/components/ui/card";
import Header from "@/components/ui/header";
import PersonDetail from "@/components/ui/person-detail";
import BidderOfferCard from "@/components/ui/poster/bidder-offer-card";
import TaskDetails from "@/components/ui/task-details";
import { Heading, Paragraph, Subheading } from "@/components/ui/text";
import TopNavtab from "@/components/ui/top-navtab";
import useFetchData from "@/hooks/use-fetch-data";
import useUserId from "@/hooks/use-user-id";
import { axiosInstance } from "@/lib/api";

export default function TaskDetailsPage() {
  const router = useRouter();
  const { taskid } = router.query;
  const queryReady = typeof taskid === "string";
  const [optionVisible, setOptionVisible] = useState(false);

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
      username: bidder?.username,
      bio: bidder?.bio,
    };
  });
  console.log(tasks);
  const hiredBid = tasks.filter(
    (bid: any) => bid.status === "ONGOING" || bid.status === "COMPLETED",
  )[0];

  console.log(hiredBid);

  const handleOnClick = (task: any) => {
    router.push(`/poster/tasks/${task.task_id}/${task.bid_id}/bid-details`);
  };
  console.log(tasks.length);
  const bidderCards = (
    <div>
      {tasks.map((task: any, id: number) => (
        <div key={id}>
          <BidderOfferCard
            profile={task.avatar_url}
            name={task.username}
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

  const noBidder = <div>No bidder offers for now</div>;

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
    alert("Task ended successfully");
    router.push(`/poster`);
  };

  const onClickPay = async (e: any) => {
    try {
      const newOfferPrice =
        parseFloat(hiredBid.price) + parseFloat(hiredBid.tips);

      const response1 = await axiosInstance.patch(`/app/tasks/${taskid}/`, {
        task_id: taskid,
        status: "ONGOING",
      });
      const response2 = await axiosInstance.patch(
        `/app/bids/${hiredBid.bid_id}/`,
        {
          bid_id: hiredBid.bid_id,
          tips: "0", // the best way maybe is add a new field to check if tip is paid
          price: `${newOfferPrice}`,
          status: hiredBid.status,
        },
      );
      console.log("Update successful:", response1.data);
    } catch (error) {
      console.error("Error during update:", error);
    }
    alert("Tips paid successfully");
    // router.push(`/poster/payment`); //link to payment detail page
  };

  const bidderInfo = (
    <div>
      {hiredBid != undefined && (
        <>
          {hiredBid.tips != "0" && (
            <PayCallout
              text={`Request from Jackson for extra charge: $${hiredBid.tips}`}
              onClick={onClickPay}
            />
          )}
          <BidDetail bidid={hiredBid.bid_id} />
          <p className="body-medium mt-4">Price: {hiredBid.price}</p>
          <div className="mt-12 flex w-full flex-col gap-4">
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

  const handleCancelTask = async (e: any) => {
    try {
      const response1 = await axiosInstance.patch(`/app/tasks/${taskid}/`, {
        task_id: taskid,
        status: "CANCELLED",
      });

      const bidPromises = task.bids.map((bid: any) =>
        axiosInstance.patch(`/app/bids/${bid.bid_id}/`, {
          bid_id: bid.bid_id,
          status: "EXPIRED",
        }),
      );
      await Promise.all(bidPromises);
      console.log("Bids updated to expired.");

      alert("Task cancelled successfully");

      router.push("/poster");
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const tabData = [
    {
      name: "Bidder Offers",
      content: hiredBid == undefined ? bidderCards : bidderInfo,
    },
    { name: "Task details", content: taskDetail },
  ];

  const tabNoData = [
    {
      name: "Bidder Offers",
      content: hiredBid == undefined ? noBidder : bidderInfo,
    },
    { name: "Task details", content: taskDetail },
  ];

  return (
    <div>
      <div>
        {hiredBid == undefined ||
        (hiredBid != undefined && hiredBid.status != "COMPLETED") ? (
          <div>
            <Header
              title={task.title}
              className="sticky top-0 z-10 w-full"
              hideOptionButton={false}
              onClickOption={() => setOptionVisible(!optionVisible)}
            />
            <TopNavtab tabs={tasks.length == 0 ? tabNoData : tabData} />
          </div>
        ) : (
          <Header title={task.title} className="sticky top-0 z-10 w-full" />
        )}
      </div>
      {hiredBid != undefined && hiredBid.status == "COMPLETED" && (
        <div className="p-4">
          <TaskDetails data={taskData} />
          <div className="flex flex-col gap-4">
            <p className="body-medium mt-8">Poster Details</p>
            <PersonDetail
              personImg={hiredBid.avatar_url} // {profile.avatar_url}
              personName={hiredBid.username}
            />
          </div>
          <p className="mb-8">{hiredBid.bio}</p>
          <Heading text="Payment"></Heading>
          <Subheading text="Price">
            <Paragraph text={hiredBid.price} />
          </Subheading>
        </div>
      )}
      <Option
        isVisible={optionVisible}
        onClose={() => setOptionVisible(!optionVisible)}
        onClickCancelTask={handleCancelTask} // miss duplicate
      />
    </div>
  );
}
