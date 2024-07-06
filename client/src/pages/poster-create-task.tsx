import React from "react";

import CreateTask from "@/components/ui/poster/create-task";
import NewTask from "@/components/ui/poster/new-task";
import TaskDetail from "@/components/ui/poster/task-detail";
import TaskTopBar from "@/components/ui/task-top-bar";

export default function PosterCreateTask() {
  return (
    <div>
      <CreateTask />
      <NewTask />
    </div>
  );
}
