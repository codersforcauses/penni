import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import PersonDetail from "@/components/ui/person-detail";
import useFetchData from "@/hooks/use-fetch-data";
import { axiosInstance } from "@/lib/api";

export default function BidDetail() {
  const router = useRouter();
  const { taskid, bidderid } = router.query;
  // Check if taskid and bidderid are strings
  const queryReady = typeof taskid === "string" && typeof bidderid === "string";

  // Fetch bids of this task
  const {
    data: bids,
    loading: bidsLoading,
    error: bidsError,
  } = useFetchData(`/app/tasks/${taskid}/bids/`, queryReady);
  // Fetch profiles of all users
  const {
    data: profiles,
    loading: profilesLoading,
    error: profilesError,
  } = useFetchData(`/app/profiles/`, true);
  if (bidsLoading || profilesLoading) return <div>Loading...</div>;

  if (bidsError) return <div>Error: {bidsError}</div>;
  if (profilesError) return <div>Error: {profilesError}</div>;
  const OnClick = () => {
    router.push(`/poster/payment`); //link to payment detail page
  };

  if (typeof bidderid != "string") {
    return <div>Loading...</div>;
  } else {
    const bidInfo = bids.data.filter(
      (bid: any) => bid.bidder_id === parseInt(bidderid),
    )[0];
    // filter profile of this bidder
    const bidderProfile = profiles.filter(
      (profile: any) => profile.user_id === parseInt(bidderid),
    )[0];

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
}
