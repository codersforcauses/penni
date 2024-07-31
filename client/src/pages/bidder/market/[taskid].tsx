import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import MyOffer from "@/components/ui/bidder/my-offer";
import { Task } from "@/components/ui/bidder/mytasks-list";
import { Button } from "@/components/ui/button";
import { ErrorCallout } from "@/components/ui/callout";
import Card from "@/components/ui/card";
import { FormData } from "@/components/ui/form";
import Header from "@/components/ui/header";
import { SingleLineInput } from "@/components/ui/inputs";
import PersonDetail from "@/components/ui/person-detail";
import TaskDetails from "@/components/ui/task-details";
import useFetchData from "@/hooks/use-fetch-data";
import { axiosInstance } from "@/lib/api";

export default function TaskDetailPage() {
  const router = useRouter();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isOfferVisible, setIsOfferVisible] = useState(false);

  const [offerValue, setOfferValue] = useState("");
  const [extraOffer, setExtraOffer] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [posterId, setPosterId] = useState<string | null>(null);

  const { taskid } = router.query;
  // const queryReady = typeof taskid === "string";
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
    if (typeof taskid === "string") {
      setTaskId(taskid);
    }
  }, [taskid, router]);

  const {
    data: task,
    loading: taskLoading,
    error: taskError,
  } = useFetchData(taskId ? `/app/tasks/${taskId}/` : null, Boolean(taskId));

  useEffect(() => {
    if (task && task.poster_id) {
      setPosterId(task.poster_id);
    }
  }, [task]);

  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useFetchData(
    posterId ? `/app/users/${posterId}/` : null,
    Boolean(posterId),
  );

  if (profileLoading || taskLoading) return <div>Loading...</div>;
  if (profileError) return <div>ProfileError: {profileError}</div>;
  if (taskError) return <div>TaskError: {taskError}</div>;
  const myBid = task.bids.find((bid: any) => bid.bidder_id === userId);
  console.log("myBid:", myBid);
  console.log(myBid == undefined);
  console.log(myBid != undefined);

  const onSubmitOffer = async () => {
    try {
      const response = await axiosInstance.post("/app/bids/", {
        task_id: taskId,
        bidder_id: userId,
        price: offerValue,
        status: "BIDDING",
      });
    } catch (error: any) {
      console.error("Unexpected error:", error.message);
      throw new Error(error);
    }
    setIsCardVisible(!isCardVisible);
    setIsOfferVisible(true);
  };
  const onSubmitEdit = async () => {
    try {
      const response = await axiosInstance.patch(`/app/bids/${myBid.bid_id}/`, {
        bid_id: myBid.bid_id,
        // task_id: taskId,
        // bidder_id: userId,
        price: offerValue,
      });
    } catch (error: any) {
      console.error("Unexpected error:", error.message);
      throw new Error(error);
    }
    setIsCardVisible(!isCardVisible);
    setIsOfferVisible(true);
  };
  const onSubmitTip = async () => {
    try {
      const bid = task.bids.filter((bid: any) => bid.bidder_id === userId)[0];
      const orginalOffer = bid.price;
      const newOffer = orginalOffer + extraOffer;
      const response1 = await axiosInstance.patch(
        `/app/bids/${myBid.bid_id}/`,
        {
          bid_id: myBid.bid_id,
          task_id: taskId,
          // bidder_id: userId,
          price: newOffer,
        },
      );
      const response2 = await axiosInstance.patch(`/app/tasks/${taskId}/`, {
        task_id: taskId,
        status: "PRICE UPDATE",
      });
    } catch (error: any) {
      console.error("Unexpected error:", error.message);
      throw new Error(error);
    }
    setIsCardVisible(!isCardVisible);
    setIsOfferVisible(true);
  };

  let myOfferValue = 0;
  if (myBid == undefined) {
    console.log("Cannot find bid detail for current user");
  } else {
    myOfferValue = myBid.price;
  }
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
      {myBid != undefined &&
        myBid.status != "ONGOING" &&
        myBid.status != "COMPLETED" &&
        today > task.deadline && (
          <ErrorCallout text="Bid is no longer available" />
        )}
      {myBid != undefined ? (
        myBid.status === "ONGOING" || myBid.status === "COMPLETED" ? (
          isOfferVisible && (
            <MyOffer
              text="Request for extra charge"
              value={extraOffer == "" ? "0" : extraOffer}
              onClick={toggleCardVisibility}
            />
          )
        ) : (
          <MyOffer
            text="My Offer"
            value={offerValue == "" ? myBid.price : offerValue}
            onClick={toggleCardVisibility}
          />
        )
      ) : (
        isOfferVisible && (
          <MyOffer
            text="My Offer"
            value={offerValue}
            onClick={toggleCardVisibility}
          />
        )
      )}
      <div className="mx-4 flex flex-col gap-4">
        <div className="flex flex-col gap-8">
          <TaskDetails data={taskData} />
          <div className="flex flex-col gap-4">
            <p className="body-medium">Poster Details</p>
            <PersonDetail
              personImg="" // {profile.avatar_url}
              personName={profile.username}
            />
          </div>
          {myBid != undefined &&
            (myBid.status === "ONGOING" || myBid.status === "COMPLETED") && (
              <div className="flex justify-between">
                <p className="body-medium">My Price</p>
                <p className="title2">${myOfferValue}</p>
              </div>
            )}
        </div>

        {myBid != undefined ? (
          myBid.status === "ONGOING" ||
          (myBid.status === "COMPLETED" && (
            <>
              <Button
                className="headline h-14 w-full"
                variant="cutout"
                onClick={toggleCardVisibility}
              >
                Request Extra Charge
              </Button>
              <Button className="headline h-14 w-full">Contact</Button>
            </>
          ))
        ) : (
          <Button
            className="headline h-14 w-full"
            onClick={toggleCardVisibility}
          >
            Make an offer
          </Button>
        )}
      </div>

      {myBid != undefined &&
        (myBid.status === "ONGOING" ||
          (myBid.status === "COMPLETED" && (
            <Card isVisible={isCardVisible} onClose={toggleCardVisibility}>
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
                  onClick={onSubmitTip}
                >
                  Confirm
                </Button>
              </div>
            </Card>
          )))}

      {myBid == undefined && (
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
              onClick={onSubmitOffer}
            >
              Confirm
            </Button>
          </div>
        </Card>
      )}
      {myBid != undefined && myBid.status === "BIDDING" && (
        <Card isVisible={isCardVisible} onClose={toggleCardVisibility}>
          <div className="p-4">
            <p className="headline">Edit your offer</p>
            <p className="subheadline mb-4 mt-2">{`Original Price: ${task.budget}`}</p>
            <SingleLineInput
              type="price"
              value={offerValue}
              onChange={(e) => setOfferValue(e.target.value)}
            />

            <Button
              disabled={offerValue === ""}
              className="headline mt-6 h-14 w-full"
              onClick={onSubmitEdit}
            >
              Confirm
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
