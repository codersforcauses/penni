import React from "react";

import Create from "./create-task";
import TaskList from "./task-list";

export default function PosterTasksPage() {
  // TODO api get from api/tasks
  const tasks = [];
  const hasTask = tasks.length > 0;
  return <div>{!hasTask ? <Create /> : <TaskList />}</div>;
}
