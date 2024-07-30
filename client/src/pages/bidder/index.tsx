import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

import BottomNav from "@/components/ui/bidder/bottom-nav";
import TaskList from "@/components/ui/bidder/mytasks-list";
import TopNavtab from "@/components/ui/top-navtab";

export default function Bidder() {
  const myTasksStates = ["COMPLETED", "ONGOING"];
  const myBidsStates = ["BIDDING", "EXPIRED"];

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const decoded = jwt.decode(token) as { user_id: string };
      setUserId(decoded.user_id);
    }
  }, []);

  if (!userId) {
    return (
      <BottomNav>
        <div>Loading...</div>
      </BottomNav>
    );
  }
  // replace 6 with userId later
  return (
    <BottomNav>
      <TopNavtab
        isFixed={true}
        tabs={[
          {
            name: "My Tasks",
            content: (
              <TaskList userid={parseInt(userId)} states={myTasksStates} />
            ),
          },
          {
            name: "My Bids",
            content: (
              <TaskList userid={parseInt(userId)} states={myBidsStates} />
            ),
          },
        ]}
      />
    </BottomNav>
  );
}
