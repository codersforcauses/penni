import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import PersonDetail from "@/components/ui/person-detail";
import useFetchData from "@/hooks/use-fetch-data";
import { axiosInstance } from "@/lib/api";

export default function BidDetail() {
  const router = useRouter();
  const { taskid, bidid } = router.query;
  // Check if taskid and bidid are strings
  const queryReady = typeof taskid === "string" && typeof bidid === "string";

  // Fetch bid of this task
  const {
    data: bidInfo,
    loading: bidLoading,
    error: bidError,
  } = useFetchData(`/app/bid/${bidid}`, queryReady);
  // Fetch profile
  const {
    data: bidderProfile,
    loading: profilesLoading,
    error: profilesError,
  } = useFetchData(`/app/users/${bidInfo.bidder_id}`, true);

  if (bidLoading || profilesLoading) return <div>Loading...</div>;

  if (bidError) return <div>Error: {bidError}</div>;
  if (profilesError) return <div>Error: {profilesError}</div>;

  // update status of task and bid
  const OnClick = async (e: any) => {
    // e["task_id"] = taskid;
    // e["bidder_id"] = bidid;
    // e["status"] = "ONGOING";

    // delete e["suburb"]; // API miss this field
    // delete e["state"]; // API miss this field
    try {
      const response1 = await axiosInstance.patch(`/app/tasks/${taskid}`, {
        status: "ONGOING",
      });
      const response2 = await axiosInstance.patch(`/app/bids/${bidid}`, {
        status: "ONGOING",
      });
      console.log("Update successful:", response1.data, response2.data);
    } catch (error) {
      console.error("Error during update:", error);
    }

    // router.push(`/poster/payment`); //link to payment detail page
  };

  // if (typeof bidid != "string") {
  //   return <div>Loading...</div>;
  // } else {
  //   const bidInfo = bid.data.filter(
  //     (bid: any) => bid.bid_id === parseInt(bidid),
  //   )[0];
  //   // filter profile of this bidder
  //   // const bidderProfile = profiles.filter(
  //   //   (profile: any) => profile.user_id === parseInt(bidderid),
  //   // )[0];

  bidInfo["avatar_url"] = ""; // source of img has error. needs to change to bidderProfile.avatar_url later
  bidInfo["full_name"] = bidderProfile.full_name;
  bidInfo["bio"] = bidderProfile.bio;

  return (
    <div className="w-screenbg-green-400 h-lvh">
      <Header title="Bid Details" className="sticky top-0 z-10 w-full" />
      <div className="absolute flex h-5/6 w-full flex-col border-t border-penni-grey-border-light-mode p-4">
        <PersonDetail
          personName={bidInfo.full_name}
          personImg={bidInfo.avatar_url}
        />
        <p className="mt-4">{bidInfo.bio}</p>
        <Button
          size="penni"
          onClick={OnClick}
          className="absolute -bottom-4 w-10/12 self-center"
        >
          Hire for {bidInfo.price}
        </Button>
      </div>
    </div>
  );
}
