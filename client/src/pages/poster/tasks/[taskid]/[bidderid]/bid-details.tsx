import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import PersonDetail from "@/components/ui/person-detail";
import { axiosInstance } from "@/lib/api";

export default function BidDetail() {
  const [bid, setBid] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const task_id = router.query.taskid;
      const bidder_id = router.query.bidderid;
      console.log(router.query);
      // Ensure task_id and bidder_id is a string and not undefined
      if (typeof task_id !== "string" || typeof bidder_id !== "string") {
        console.error("waiting"); // the router id soooo slow!
        return;
      }
      try {
        const response = await axiosInstance.get(`/app/tasks/5/bids/`); // Fetch bids for the task_id:5. needs to replace to variable
        const jsonResponse = response.data;
        const bidInfo = jsonResponse.data.filter(
          (bid: any) => bid.bidder_id === 6, // Fetch bid of the bidder_id:6. needs to replace to variable
        )[0];
        // Fetch profiles of all users
        const allProfiles = await axiosInstance.get(`/app/profiles/`);

        const bidderProfile = allProfiles.data.filter(
          (profile: any) => profile.user_id === 6,
        )[0];
        console.log(bidderProfile);
        // bidInfo["avatar_url"] = bidderProfile.avatar_url; // source of img may need change
        bidInfo["full_name"] = bidderProfile.full_name;
        bidInfo["bio"] = bidderProfile.bio;
        console.log(bidInfo);
        setBid(bidInfo);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const OnClick = () => {
    router.push(`/poster/payment`); //link to payment detail page
  };
  return (
    <div className="w-screenbg-green-400 h-lvh">
      <Header title="Bid Details" className="sticky top-0 z-10 w-full" />
      <div className="absolute flex h-5/6 w-full flex-col border-t border-penni-grey-border-light-mode p-4">
        <PersonDetail personName={bid.full_name} personImg={bid.avatar_url} />
        <p className="mt-4">{bid.bio}</p>
        <Button
          size="penni"
          onClick={OnClick}
          className="absolute -bottom-4 w-10/12 self-center"
        >
          Hire for {bid.price}
        </Button>
      </div>
    </div>
  );
}
