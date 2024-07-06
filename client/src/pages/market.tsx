import type { ReactElement } from "react";

import MeLayout from "@/components/ui/MeLayout";
import TaskCard, { TaskCardProps } from "@/components/ui/TaskCard";

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
  ];

  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </>
  );
};

MarketPage.getLayout = function getLayout(page: ReactElement) {
  return <MeLayout>{page}</MeLayout>;
};

export default MarketPage;
