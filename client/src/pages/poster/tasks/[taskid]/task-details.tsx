import { useRouter } from "next/router";

import BidderOfferCard from "@/components/ui/bidder-offer-card";
import Header from "@/components/ui/header";
import TaskDetails from "@/components/ui/task-details";
import TopNavtab from "@/components/ui/top-navtab";

const bidder_exmaple_profile0 = "/bidder-exmaple-profile.svg";
const bidder_exmaple_profile1 = "/bidder-exmaple-profile1.svg";
const bidder_exmaple_profile2 = "/bidder-exmaple-profile2.svg";
const bidder_exmaple_profile3 = "/bidder-exmaple-profile3.svg";
const bidder_exmaple_profile4 = "/bidder-exmaple-profile4.svg";
const bios =
  "I am a pensioner with extensive experience in cleaning. I am very patient and professional I can definitely handle your task perfectly well. You can trust me in this.";
export type Bidder = {
  id: number;
  name: string;
  profile: string;
  price: number;
  bio: string;
  className?: string;
};
const BiddersOffer: Bidder[] = [
  {
    id: 1,
    name: "Jackson Anderson",
    profile: bidder_exmaple_profile0,
    price: 400,
    bio: bios,
  },
  {
    id: 2,
    name: "Kierra Dorwart",
    profile: bidder_exmaple_profile1,
    price: 380,
    bio: bios,
  },
  {
    id: 3,
    name: "Ahmad Philips",
    profile: bidder_exmaple_profile2,
    price: 300,
    bio: bios,
  },
  {
    id: 4,
    name: "Alena Gouse",
    profile: bidder_exmaple_profile3,
    price: 520,
    bio: bios,
  },
  {
    id: 5,
    name: "Alena Press",
    profile: bidder_exmaple_profile4,
    price: 1000,
    bio: bios,
  },
];

function BidderOfferCardList(taskid: number) {
  // TODO fetch / axios.get(api/taskid) bidders.
  const router = useRouter();
  const NavigateWithData = (bidder: Bidder) => {
    router.push({
      pathname: `/poster/tasks/${taskid}/${bidder.id}/bid-details`,
      query: { bidder: JSON.stringify(bidder), taskid: taskid },
    });
  };

  return (
    <div>
      {BiddersOffer.map((bidder, id) => (
        <div key={id}>
          <BidderOfferCard
            profile={bidder.profile}
            name={bidder.name}
            price={bidder.price}
            bio={bidder.bio}
            onClick={() => {
              NavigateWithData(bidder);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function TaskDetail(taskid?: number) {
  // task data fetch / axios get or get from last page.
  const task = {
    category: "Cleaning",
    title: "Cleaning up my house",
    created_at: "Date",
    suburb: "Richmond",
    state: "VIC",
    estimated_time: "4 hours",
    budget: "$ 250",
    description:
      "I need someone to help me clean my 2 bedroom apartment. I am moving out and I need to make sure it’s all clean.",
  };
  return (
    <div>
      <TaskDetails data={task} />
    </div>
  );
}

export default function TaskDetailss() {
  const router = useRouter();
  const task = router.query;
  const title = String(task.title);
  const taskid = Number(task.id);
  const tabData = [
    { name: "Bidder Offers", content: BidderOfferCardList(taskid) },
    { name: "Task details", content: TaskDetail(taskid) },
  ];
  return (
    <div>
      <Header title={title} className="sticky top-0 z-10 w-full" />
      <TopNavtab tabs={tabData} />
    </div>
  );
}
