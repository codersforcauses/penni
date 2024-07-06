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
        estimatePrice="300"
        myOfferPrice="250"
        state="BIDDING"
        priceType="Estimated Price"
      />
      <TaskCard
        title="Walking my dog"
        category="WALKING DOGS"
        date="21 Aug, 2022"
        location="Richmond, VIC"
        duration="4"
        estimatePrice="400"
        myOfferPrice="250"
        state="BIDDING"
        priceType="My Offer"
      />
      <TaskCard
        title="Clean up my house"
        category="CLEANING"
        date="21 Aug, 2022"
        location="Richmond, VIC"
        duration="5"
        estimatePrice="400"
        myOfferPrice="400"
        state="EXPIRED"
        priceType="My Offer"
      />
    </div>
  );
};

export default Test;
