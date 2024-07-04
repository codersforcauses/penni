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
        duration= {4}
        estimatePrice= {300}
        myOfferPrice={250}
        state="BIDDING"
        priceType ="Estimate Price"
      />
      <TaskCard
        title="Clean up my house"
        category="CLEANING"
        date="21 Aug, 2022"
        location="Richmond, VIC"
        duration= {5}
        estimatePrice= {400}
        myOfferPrice={300}
        state="EXPIRED"
        priceType ="My Offer"
      />
    </div>
  );
};

export default Test;
