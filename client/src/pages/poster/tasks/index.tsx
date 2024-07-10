import Link from "next/link";
import React from "react";

import Create from "./create";
import New from "./new";

export default function PosterTasksPage() {
  const hasTask = false;
  return <div>{!hasTask ? <Create /> : <New />}</div>;
}
