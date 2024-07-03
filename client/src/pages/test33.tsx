// pages/tes33.tsx

import React from "react";

import TaskCard from "../components/ui/TaskCard";

const Test = () => {
  return (
    <div>
      <TaskCard
        title="Clean up my house"
        category="CLEANING"
        date="21 Aug, 2022"
        location="Richmond, VIC"
        duration="4"
        price="300"
        state="BIDDING"
      />
      <TaskCard
        title="Clean up my house"
        category="CLEANING"
        date="21 Aug, 2022"
        location="Richmond, VIC"
        duration="4"
        price="300"
        state="EXPIRED"
      />
    </div>
  );
};

export default Test;
