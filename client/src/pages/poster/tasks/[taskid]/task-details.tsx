import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import BidderOfferCard from "@/components/ui/bidder-offer-card";
import Header from "@/components/ui/header";
import TaskDetails from "@/components/ui/task-details";
import TopNavtab from "@/components/ui/top-navtab";
import { axiosInstance } from "@/lib/api";

function BidderOfferCardList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const task_id = router.query.taskid;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/app/tasks/${task_id}/bids/`); // Fetch bids for the task
        const jsonResponse = response.data;
        const bidderIds = jsonResponse.map((bid: any) => bid.bidder_id); // Extract bidder IDs from the bids
        // Fetch profiles of all users
        const allProfiles = await axiosInstance.get(`/app/profiles/`);
        const bidders = allProfiles.data.filter((profile: any) =>
          bidderIds.includes(profile.user_id),
        );
        // Add bidder info
        const bidderList = jsonResponse.map((bid: any) => {
          const bidder = bidders.find(
            (profile: any) => profile.user_id === bid.bidder_id,
          );
          return {
            ...bid,
            avatar_url: bidder?.avatar_url,
            full_name: bidder?.full_name,
            bio: bidder?.bio,
          };
        });
        setTasks(bidderList);
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

  const handleOnClick = (task: any) => {
    router.push(`/poster/tasks/${task_id}/${task.bidder_id}/bid-details`);
  };

  return (
    <div>
      {tasks.map((task: any, id) => (
        <div key={id}>
          <BidderOfferCard
            profile={task.avatar_url}
            name={task.full_name}
            price={task.price}
            bio={task.bio}
            onClick={() => {
              handleOnClick(task);
            }}
          />
        </div>
      ))}
    </div>
  );
}

function TaskDetail() {
  const [task, setTask] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const task_id = router.query.taskid;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/app/tasks/${task_id}/`); // Fetch bids for the task
        const jsonResponse = response.data;
        const taskData = {
          category: jsonResponse?.category,
          title: jsonResponse?.title,
          created_at: jsonResponse?.created_at.slice(0, 10),
          suburb: jsonResponse?.location,
          state: jsonResponse?.location, // don't have this property in the response
          estimated_time: jsonResponse?.estimated_time,
          budget: jsonResponse?.budget,
          description: jsonResponse?.description,
        };
        setTask(taskData);
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

  return (
    <div className="m-4 p-4">
      <TaskDetails data={task} />
    </div>
  );
}

export default function TaskDetailss() {
  const [task, setTask] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const task_id = router.query.taskid;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/app/tasks/${task_id}/`); // Fetch bids for the task
        const jsonResponse = response.data;
        setTask(jsonResponse);
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

  const tabData = [
    { name: "Bidder Offers", content: BidderOfferCardList() },
    { name: "Task details", content: TaskDetail() },
  ];
  return (
    <div>
      <Header title={task.title} className="sticky top-0 z-10 w-full" />
      <TopNavtab tabs={tabData} />
    </div>
  );
}
