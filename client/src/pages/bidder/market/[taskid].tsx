import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import MyOffer from "@/components/ui/bidder/my-offer";
import { Task } from "@/components/ui/bidder/mytasks-list";
import { Button } from "@/components/ui/button";
import { ErrorCallout } from "@/components/ui/callout";
import Card from "@/components/ui/card";
import Header from "@/components/ui/header";
import { SingleLineInput } from "@/components/ui/inputs";
import PersonDetail from "@/components/ui/person-detail";
import TaskDetails from "@/components/ui/task-details";
import useFetchData from "@/hooks/use-fetch-data";

export default function TaskDetailPage() {
  const router = useRouter();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isExtraCardVisible, setIsExtraCardVisible] = useState(false);

  const [offerValue, setOfferValue] = useState("");
  const [extraOffer, setExtraOffer] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };
  const today = new Date().toISOString().slice(0, 10); //get today's date in string "2024-7-17" to check if the task is expired
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token) as { user_id: string };
      setUserId(decoded.user_id);
    } else {
      console.error("No token found");
    }
  }, []);
  const { taskid } = router.query;
  const queryReady = typeof taskid === "string";
  const {
    data: task,
    loading: taskLoading,
    error: taskError,
  } = useFetchData(`/app/tasks/${taskid}/`, queryReady);

  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useFetchData(`/app/users/${task.poster_id}/`, true);
  if (profileLoading || taskLoading) return <div>Loading...</div>;

  if (profileError) return <div>Error: {profileError}</div>;
  if (taskError) return <div>Error: {taskError}</div>;

  const myBid = task.bids.find((bid: any) => bid.bidder_id === userId);

  if (myBid == undefined)
    return <div>Error: Cannot find bid detail for current user</div>;
  const myOfferValue = myBid.price;
  const taskData = {
    category: task.category,
    title: task.title,
    deadline: task.deadline.slice(0, 10),
    suburb: task.location.suburb, // no task.suburb in api now
    state: task.location.state, // no task.state in api now
    estimated_time: task.estimated_time,
    budget: task.budget,
    description: task.description,
  };
  console.log(taskData);
  return (
    <div className="mb-8">
      <Header title="Task Details" />
      {task.state != "ONGOING" &&
        task.state != "COMPLETED" &&
        today > task.deadline && (
          <ErrorCallout text="Bid is no longer available" />
        )}
      {task.state === "ONGOING" || task.state === "COMPLETED"
        ? extraOffer != "" && (
            <MyOffer
              text="Request for extra charge"
              value={extraOffer}
              onClick={() => setIsExtraCardVisible(!isExtraCardVisible)}
            />
          )
        : offerValue != "" && (
            <MyOffer
              text="My Offer"
              value={offerValue}
              onClick={toggleCardVisibility}
            />
          )}
      <div className="mx-4 flex flex-col gap-4">
        <div className="flex flex-col gap-8">
          <TaskDetails data={taskData} />
          <div className="flex flex-col gap-4">
            <p className="body-medium">Poster Details</p>
            <PersonDetail
              personImg={profile.avatar_url}
              personName={profile.full_name}
            />
          </div>
          {(task.state === "ONGOING" || task.state === "COMPLETED") && (
            <div className="flex justify-between">
              <p className="body-medium">My Price</p>
              <p className="title2">${myOfferValue}</p>
            </div>
          )}
        </div>

        {task.state === "ONGOING" || task.state === "COMPLETED" ? (
          <>
            <Button
              className="headline h-14 w-full"
              variant="cutout"
              onClick={() => setIsExtraCardVisible(!isExtraCardVisible)}
            >
              Request Extra Charge
            </Button>
            <Button className="headline h-14 w-full">Contact</Button>
          </>
        ) : (
          <Button
            className="headline h-14 w-full"
            onClick={toggleCardVisibility}
          >
            Make an offer
          </Button>
        )}
      </div>

      {task.state === "ONGOING" || task.state === "COMPLETED" ? (
        <Card
          isVisible={isExtraCardVisible}
          onClose={() => setIsExtraCardVisible(!isExtraCardVisible)}
        >
          <div className="p-4">
            <p className="headline">How much would the extra charge be?</p>
            <p className="subheadline mb-4 mt-2">{`Original Price: ${task.budget}`}</p>
            <SingleLineInput
              type="price"
              value={extraOffer}
              onChange={(e) => setExtraOffer(e.target.value)}
            />

            <Button
              disabled={extraOffer === ""}
              className="headline mt-6 h-14 w-full"
              onClick={() => setIsExtraCardVisible(!isExtraCardVisible)}
            >
              Confirm
            </Button>
          </div>
        </Card>
      ) : (
        <Card isVisible={isCardVisible} onClose={toggleCardVisibility}>
          <div className="p-4">
            <p className="headline">Make an offer on this task</p>
            <p className="subheadline mb-4 mt-2">{`Original Price: ${task.budget}`}</p>
            <SingleLineInput
              type="price"
              value={offerValue}
              onChange={(e) => setOfferValue(e.target.value)}
            />

            <Button
              disabled={offerValue === ""}
              className="headline mt-6 h-14 w-full"
              onClick={toggleCardVisibility}
            >
              Confirm
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
