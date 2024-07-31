import { useRouter } from "next/router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ErrorCallout } from "@/components/ui/callout";
import EmptyListDisplay from "@/components/ui/empty-list-display";
import PosterTaskCard, {
  PosterTaskCardProps,
} from "@/components/ui/poster/task-card";
import TaskTopBar from "@/components/ui/poster/task-top-bar";
import useFetchData from "@/hooks/use-fetch-data";
import useUserId from "@/hooks/use-user-id";

export function Create() {
  const router = useRouter();
  return (
    <div className="m-4">
      <TaskTopBar />
      <div className="relative top-36 flex w-full justify-center">
        <EmptyListDisplay
          type="poster"
          onClick={() => router.push(`/poster/tasks/new-task`)}
        />
      </div>
    </div>
  );
}

type TaskListProp = {
  className?: string;
  tasks: any[];
};

function TaskList({ className, tasks }: TaskListProp) {
  const router = useRouter();

  return (
    <div className={`m-4 ${className}`}>
      <TaskTopBar />
      <div className="flex w-full flex-col gap-4">
        {tasks.map((task: any, index) => (
          <div key={index}>
            <PosterTaskCard
              title={task.title}
              numberOfBidders={5} //need to get bidder data
              date={task.deadline.slice(0, 10)}
              state={task.status}
              onClick={() => {
                router.push({
                  pathname: `/poster/tasks/${task.task_id}/task-details`,
                });
              }}
            ></PosterTaskCard>
          </div>
        ))}
      </div>
      <Button
        size="floating"
        variant="floating"
        onClick={() => router.push("/poster/tasks/new-task")}
        className={`fixed bottom-10 right-6`}
      >
        + New Task
      </Button>
    </div>
  );
}

export default function PosterTasksPage() {
  const [error, setError] = useState<string>("");

  const { userId, loading: userIdLoading, error: userIdError } = useUserId();

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetchData(`/app/users/${userId}/`, !!userId);

  if (userIdLoading || userLoading) return <div>Loading...</div>;
  if (userIdError || userError)
    return <div>Error: {userIdError || userError}</div>;

  const hasTask = user.tasks.length > 0;

  return (
    <div>
      {error != "" ? (
        <ErrorCallout className="pb-4" text={error} />
      ) : !hasTask ? (
        <Create />
      ) : (
        <TaskList tasks={user && user.tasks} />
      )}
    </div>
  );
}
