import Image from "next/image";
import React from "react";

// please try to understand the "pricetype", not sure if we need to do useState for this part

// the props
interface TaskCardProps {
  state?: "BIDDING" | "EXPIRED" | "ONGOING" | "COMPLETED";
  category: string;
  title: string;
  date: string;
  location: string;
  duration: string;
  estimatePrice: string;
  myOfferPrice: string;
  priceType: "Estimated Price" | "My Offer";
  key?: number; //to use map to iterate
}

// the task card
const TaskCard = ({
  title,
  category,
  date,
  location,
  duration,
  estimatePrice,
  myOfferPrice,
  state,
  priceType,
}: TaskCardProps) => {
  return (
    <div
      className={`m-4 rounded-lg border p-4 ${state === "EXPIRED" ? "bg-gray-100 opacity-60" : "bg-white"} transition duration-300 ease-in-out`}
    >
      {/* the state (expried or bidding) */}
      {state && (
        <div
          className={`footnote inline-block rounded-lg px-3 py-1.5 font-medium ${state === "BIDDING" ? "bg-blue-100 text-blue-800" : state === "ONGOING" ? "bg-orange-100 text-orange-700" : state === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-gray-300 text-gray-700"}`}
        >
          {state}
        </div>
      )}

      {/* the category & title (in 1 column) */}
      <div className="mb-4 mt-2">
        <h5 className="footnote mb-1 mt-1 text-gray-500">{category}</h5>
        <h3 className="body-medium">{title}</h3>
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
            <p className="subheadline text-gray-500">{date}</p>
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
            <p className="subheadline text-gray-500">{location}</p>
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
            <p className="subheadline text-gray-500">{duration}</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-2 text-right">
          <p className="title3">
            {/* show the different price based on the different price type */}$
            {priceType === "My Offer" ? myOfferPrice : estimatePrice}
          </p>
          <p className="caption">{priceType}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
