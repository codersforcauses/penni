import { useRouter } from "next/router";

import useFetchData from "@/hooks/use-fetch-data";
import { axiosInstance } from "@/lib/api";

import { Button } from "../button";
import PersonDetail from "../person-detail";

interface BidDetailProps {
  bidid: string;
}
export default function BidDetail({ bidid }: BidDetailProps) {
  const router = useRouter();
  const { taskid } = router.query;
  // Check if taskid and bidid are strings
  const queryReady = typeof taskid === "string";

  // Fetch bid of this task
  const {
    data: bidInfo,
    loading: bidLoading,
    error: bidError,
  } = useFetchData(`/app/bids/${bidid}/`, queryReady);
  // Fetch profile
  const {
    data: bidderProfile,
    loading: profilesLoading,
    error: profilesError,
  } = useFetchData(
    bidInfo ? `/app/users/${bidInfo.bidder_id}/` : null,
    Boolean(bidInfo),
  );

  if (bidLoading || profilesLoading) return <div>Loading...</div>;

  if (bidError) return <div>Error: {bidError}</div>;
  if (profilesError) return <div>Error: {profilesError}</div>;

  bidInfo["avatar_url"] = ""; // source of img has error. needs to change to bidderProfile.avatar_url later
  bidInfo["username"] = bidderProfile.username;
  bidInfo["bio"] = bidderProfile.bio;

  return (
    <div className="flex w-full flex-col border-t border-penni-grey-border-light-mode">
      <PersonDetail
        personName={bidInfo.username}
        personImg={bidInfo.avatar_url}
      />
      <p className="mt-4">{bidInfo.bio}</p>
    </div>
  );
}
