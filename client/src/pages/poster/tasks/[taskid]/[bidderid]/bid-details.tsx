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
  const [queryReady, setQueryReady] = useState(false);

  useEffect(() => {
    // Check if query parameters are available
    if (router.query.taskid && router.query.bidderid) {
      setQueryReady(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (!queryReady) return;

    const fetchBidData = async () => {
      const task_id = router.query.taskid as string;
      const bidder_id = router.query.bidderid as string;

      try {
        const response = await axiosInstance.get(`/app/tasks/${task_id}/bids/`); // Fetch bids for the task_id:5. needs to replace to variable
        const jsonResponse = response.data;
        const bidInfo = jsonResponse.data.filter(
          (bid: any) => bid.bidder_id === parseInt(bidder_id), // Fetch bid of the bidder_id:6. needs to replace to variable
        )[0];

        // Fetch profiles of all users
        const allProfiles = await axiosInstance.get(`/app/profiles/`);
        const bidderProfile = allProfiles.data.filter(
          (profile: any) => profile.user_id === parseInt(bidder_id),
        )[0];
        bidInfo["avatar_url"] = ""; // source of img has error. needs to change to bidderProfile.avatar_url later
        bidInfo["full_name"] = bidderProfile.full_name;
        bidInfo["bio"] = bidderProfile.bio;

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
    fetchBidData();
  }, [queryReady, router.query]);

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
