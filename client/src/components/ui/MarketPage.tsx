// TODO:
// - import Dropdown component(#72) once its been merged onto main
// - edit bottom navbar component so it's no longer transparent

import React from "react";

import BottomNav from "./bottom-nav";
// import Dropdown from './Dropdown';
import TaskCard, { TaskCardProps } from "./TaskCard";

const MarketPage: React.FC = () => {
  const tasks: TaskCardProps[] = [
    {
      state: "BIDDING",
      category: "Construction",
      title: "Fix the roof",
      date: "2024-07-10",
      location: "123 Main St",
      duration: "2",
      estimatePrice: "500",
      myOfferPrice: "450",
      priceType: "Estimated Price",
    },
    {
      state: "EXPIRED",
      category: "Painting",
      title: "Paint the fence",
      date: "2024-07-12",
      location: "456 Elm St",
      duration: "1",
      estimatePrice: "200",
      myOfferPrice: "180",
      priceType: "My Offer",
    },
    {
      state: "BIDDING",
      category: "Cleaning",
      title: "Clean the house",
      date: "2024-07-15",
      location: "789 Oak St",
      duration: "4",
      estimatePrice: "100",
      myOfferPrice: "90",
      priceType: "Estimated Price",
    },
  ];

  return (
    <div>
      <div>
        {tasks.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>
      <div>
        <BottomNav navIndex={0} />
      </div>
    </div>
  );
};

export default MarketPage;
