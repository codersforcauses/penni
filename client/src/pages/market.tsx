import type { ReactElement } from "react";
import React, { useState } from "react";

import { MarketDropdown } from "@/components/ui/dropdown";
import MeLayout from "@/components/ui/me-page";
import TaskCard, { TaskCardProps } from "@/components/ui/task-card";

import type { NextPageWithLayout } from "./_app";

const MarketPage: NextPageWithLayout = () => {
  const tasks: TaskCardProps[] = [
    {
      id: "abc123",
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
      id: "xyz000",
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
      id: "lol223",
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
    {
      id: "loo223",
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
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [selectedLocation, setSelectedLocation] = useState("All Location");
  const categories = ["All Category", "Cleaning", "Painting", "Construction"];
  const locations = ["All Location", "123 Main St", "456 Elm St", "789 Oak St"];

  return (
    <MeLayout>
      <div className="m-4 flex justify-start space-x-4">
        <MarketDropdown
          value={selectedCategory}
          options={categories}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
        <MarketDropdown
          value={selectedLocation}
          options={locations}
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
      </div>
      {tasks
        .filter(
          (task) =>
            (selectedCategory === "All Category" ||
              task.category === selectedCategory) &&
            (selectedLocation === "All Location" ||
              task.location === selectedLocation),
        )
        .map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}

      <br />
      <br />
      <br />
    </MeLayout>
  );
};

export default MarketPage;
