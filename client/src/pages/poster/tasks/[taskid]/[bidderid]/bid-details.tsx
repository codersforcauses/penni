import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import PersonDetail from "@/components/ui/person-detail";

export default function BidDetail() {
  const router = useRouter();
  if (router.query.bidder === undefined || router.query.taskid === undefined) {
    return <>Loading...</>;
  }
  const bidder = JSON.parse(String(router.query.bidder));
  const taskid = String(router.query.taskid);
  function OnClick() {
    // axios.post to api
    router.push(`/poster/task/${taskid}/${bidder.id}/payment`);
  }
  return (
    <div className="w-screenbg-green-400 h-lvh">
      <Header title="Bid Details" className="sticky top-0 z-10 w-full" />
      <div className="absolute flex h-5/6 w-full flex-col p-4">
        <PersonDetail personName={bidder.name} personImg={bidder.profile} />
        <p className="mt-4 self-center">{bidder.bio}</p>
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
