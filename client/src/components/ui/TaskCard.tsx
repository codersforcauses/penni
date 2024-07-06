import Image from "next/image";
import React from "react";

// please try to understand the "pricetype", not sure if we need to do useState for this part

// the props
type TaskCardProps = {
  state: "BIDDING" | "EXPIRED";
  category: string;
  title: string;
  date: string;
  location: string;
  duration: string;
  estimatePrice: string;
  myOfferPrice: string;
  priceType: "Estimated Price" | "My Offer";
};

// the task card
const TaskCard: React.FC<TaskCardProps> = ({
  title,
  category,
  date,
  location,
  duration,
  estimatePrice,
  myOfferPrice,
  state,
  priceType,
}) => {
  return (
    <div
      className={`m-4 rounded-lg border p-4 ${state === "EXPIRED" ? "bg-gray-200 opacity-80" : "bg-white"} transition duration-300 ease-in-out`}
    >
      {/* the state (expried or bidding) */}
      <div
        className={`inline-block rounded-lg px-2 py-1 text-sm font-medium ${state === "BIDDING" ? "bg-blue-100 text-blue-600" : "bg-gray-300 text-gray-500"}`}
      >
        {state}
      </div>

      {/* the category & title (in 1 column) */}
      <div className="mb-4 mt-2">
        <h5 className="mb-1 mt-1 text-sm text-gray-500">{category}</h5>
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
      </div>

      {/* the date, location, duration & Price, price type (estimate or myoffer price)   (in 2 columns)*/}
      <div className="mb-2 grid grid-cols-2 items-center gap-8 text-sm">
        {/* Column 1 with icons */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="relative h-4 w-4">
              <Image
                src="/icons/calendar.svg"
                alt="Date"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative h-4 w-4">
              <Image
                src="/icons/marker.svg"
                alt="Location"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative h-4 w-4">
              <Image
                src="/icons/clock.svg"
                alt="Duration"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-xs text-gray-500">{duration} hours</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-2 text-right">
          <p className="text-lg font-bold">
            {/* show the different price based on the different price type */}$
            {priceType === "My Offer" ? myOfferPrice : estimatePrice}
          </p>
          <p className="caption-semibold">{priceType}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
