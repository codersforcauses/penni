import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import PersonDetail from "@/components/ui/person-detail";

export default function BidDetail() {
  const router = useRouter();
  const bidder = router.query;
  const profile = String(bidder.profile);
  const name = String(bidder.name);
  const bio = String(bidder.bio);
  const { taskid } = useParams();
  // api fetch bidders[] where taskid = id,
  function OnClick() {
    // axios.post to api
    router.push(`/poster/task/${taskid}/${bidder.id}/payment`);
  }
  return (
    <div className="w-screenbg-green-400 h-lvh">
      <Header title="Bid Details" className="sticky top-0 z-10 w-full" />
      <div className="absolute flex h-5/6 w-full flex-col p-4">
        <PersonDetail personName={name} personImg={profile} />
        <p className="mt-4 self-center">{bio}</p>
        <Button
          size="penni"
          onClick={OnClick}
          className="absolute -bottom-4 w-10/12 self-center"
        >
          Hire for ${bidder.price}
        </Button>
      </div>
    </div>
  );
}
