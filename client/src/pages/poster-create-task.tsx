import React from "react";

import Create from "./poster/tasks/create";
import List from "./poster/tasks/list";

export default function PosterTaksPage() {
  const [task, setTask] = React.useState([]);
  return <div>{task.length === 0 ? <Create /> : <List />}</div>;
}
