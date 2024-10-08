import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import BidDetail from "@/components/ui/bidder/bid-detail";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import PersonDetail from "@/components/ui/person-detail";
import useFetchData from "@/hooks/use-fetch-data";
import { axiosInstance } from "@/lib/api";

const BidDetailsPage = () => {
  const router = useRouter();
  const { taskid, bidid } = router.query;
  // Check if taskid and bidid are strings
  const queryReady = typeof taskid === "string" && typeof bidid === "string";

  // Fetch bid of this task
  const {
    data: task,
    loading: taskLoading,
    error: taskError,
  } = useFetchData(`/app/tasks/${taskid}/`, queryReady);
  if (taskLoading) return <div>Loading...</div>;
  if (taskError) return <div>Error: {taskError}</div>;

  const bidInfo = task.bids.find((bid: any) => bid.bid_id == bidid);

  const bidIdList = task.bids.map((bid: any) => bid.bid_id);
  console.log(bidIdList);
  // update status of task and bid
  const OnClickHire = async (e: any) => {
    try {
      const response1 = await axiosInstance.patch(`/app/tasks/${taskid}/`, {
        task_id: taskid,
        status: "ONGOING",
      });
      const response2 = await axiosInstance.patch(`/app/bids/${bidid}/`, {
        bid_id: bidid,
        status: "ONGOING",
      });

      for (const id in bidIdList) {
        if (bidIdList[id] != bidid) {
          await axiosInstance.patch(`/app/bids/${bidIdList[id]}/`, {
            bid_id: bidid,
            status: "EXPIRED",
          });
        }
      }
      console.log("Update successful:", response1.data, response2.data);
    } catch (error) {
      console.error("Error during update:", error);
    }
    alert("Bid hired successfully");
    router.push(`/poster/tasks/${taskid}/task-details`);
    // router.push(`/poster/payment`); //link to payment detail page
  };
  return (
    <div className="h-lvh w-screen">
      <Header title="Bid Details" className="sticky top-0 z-10" />
      <div className="p-4">
        {typeof bidid === "string" && <BidDetail bidid={bidid} />}
        <Button
          size="penni"
          onClick={OnClickHire}
          className="absolute bottom-4 w-full"
        >
          Hire for {bidInfo.price}
        </Button>
      </div>
    </div>
  );
};

export default BidDetailsPage;
