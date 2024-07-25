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

export default function TaskDetailPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isExtraCardVisible, setIsExtraCardVisible] = useState(false);

  const [offerValue, setOfferValue] = useState("");
  const [extraOffer, setExtraOffer] = useState("");
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };
  const today = new Date().toISOString().slice(0, 10); //get today's date in string "2024-7-17" to check if the task is expired

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks-test");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setTasks(data.tasks);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const taskInDetail = tasks.filter(
    (task) => task.task_id.toString() === router.query.taskid,
  )[0];

  const sampleTaskData = {
    category: taskInDetail.category,
    title: taskInDetail.title,
    created_at: taskInDetail.date,
    suburb: taskInDetail.suburb,
    state: taskInDetail.state,
    estimated_time: taskInDetail.duration,
    budget: taskInDetail.estimatePrice,
    description: taskInDetail.description,
  };

  return (
    <div className="mb-8">
      <Header title="Task Details" />
      {taskInDetail.state != "ONGOING" &&
        taskInDetail.state != "COMPLETED" &&
        today > taskInDetail.deadline && (
          <ErrorCallout text="Bid is no longer available" />
        )}
      {taskInDetail.state === "ONGOING" || taskInDetail.state === "COMPLETED"
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
          <TaskDetails data={sampleTaskData} />
          <div className="flex flex-col gap-4">
            <p className="body-medium">Poster Details</p>
            <PersonDetail personImg="/penni-logo.svg" personName="user123" />
          </div>
          {(taskInDetail.state === "ONGOING" ||
            taskInDetail.state === "COMPLETED") && (
            <div className="flex justify-between">
              <p className="body-medium">My Price</p>
              <p className="title2">${taskInDetail.myOfferPrice}</p>
            </div>
          )}
        </div>

        {taskInDetail.state === "ONGOING" ||
        taskInDetail.state === "COMPLETED" ? (
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

      {taskInDetail.state === "ONGOING" ||
      taskInDetail.state === "COMPLETED" ? (
        <Card
          isVisible={isExtraCardVisible}
          onClose={() => setIsExtraCardVisible(!isExtraCardVisible)}
        >
          <div className="p-4">
            <p className="headline">How much would the extra charge be?</p>
            <p className="subheadline mb-4 mt-2">{`Original Price: ${taskInDetail.estimatePrice}`}</p>
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
            <p className="subheadline mb-4 mt-2">{`Original Price: ${taskInDetail.estimatePrice}`}</p>
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
