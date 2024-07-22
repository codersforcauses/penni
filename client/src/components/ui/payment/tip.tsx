import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { BidderInfo } from "@/pages/tasks/pay/[taskID]";

interface TipProps {
  taskID: string;
  onTipSubmit: (tipAmount: number) => void; // Callback to pass the tip amount to the parent
  bidderInfo: BidderInfo;
}

/**
 * Tip component
 *
 * This component renders a tipping interface where users can choose to tip a bidder.
 * It allows users to select predefined tip amounts or enter a custom tip.
 * The component also includes a profile image and name of the bidder.
 *
 * @param {string} props.taskID - The ID of the task for which the tip is being given.
 * @param {function} props.onTipSubmit - Callback to pass the tip amount to the parent component.
 * @param {BidderInfo} props.bidderInfo - Object containing information about the bidder, including their profile image and name.
 * @returns {JSX.Element} The rendered Tip component.
 * @example
 * <Tip
    taskID={taskID}
    onTipSubmit={handleTipSubmit}
    bidderInfo={bidderInfo}
   />
 */
export default function Tip({
  taskID,
  onTipSubmit,
  bidderInfo,
}: TipProps): JSX.Element {
  const [tip, setTip] = useState<number | null>(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [customTip, setCustomTip] = useState<string>("");

  const toggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev);
  };

  // Handle custom tip change (different from pre-select tips)
  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTip(value);
    setTip(value !== "" ? Number(value) : null);
  };

  // Select and unselect tip buttons
  const handleTipClick = (tipAmount: number) => {
    setCustomTip(""); // Clear custom tip input
    setTip((prev) => (prev === tipAmount ? null : tipAmount));
  };

  const handleSubmit = () => {
    if (tip !== null) {
      onTipSubmit(tip);
    }
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-white p-4">
      <div className="absolute right-4 top-8">
        <Button
          variant="link"
          onClick={() => {
            handleTipClick(Number(0));
            handleSubmit();
          }}
        >
          Skip
        </Button>
      </div>
      <div className="relative mb-6 h-32 w-32">
        <Image
          src={bidderInfo.profileImg}
          alt={`${bidderInfo.name}'s profile image.`}
          className="rounded-full object-cover"
          width={128} // Adjust the width and height to make it bigger
          height={128}
        />
      </div>
      <p className="mb-4 text-xl font-medium">
        Would you like to tip {bidderInfo.name}?
      </p>
      <div className="mb-4 flex space-x-4">
        {[10, 20, 30].map((amount) => (
          <Button
            key={amount}
            variant="round"
            size="round"
            className={
              tip === amount
                ? "bg-penni-main text-white hover:bg-penni-main"
                : ""
            }
            onClick={() => handleTipClick(amount)}
          >
            ${amount}
          </Button>
        ))}
      </div>
      <Button variant="link" onClick={toggleCardVisibility}>
        Enter a custom number
      </Button>
      <Card isVisible={isCardVisible} onClose={toggleCardVisibility}>
        <div className="flex flex-col items-center">
          <input
            type="number"
            value={customTip}
            onChange={handleCustomTipChange}
            placeholder="Enter custom tip"
            className="mb-4 rounded border px-2 py-1"
          />
          <Button
            onClick={() => {
              handleSubmit();
            }}
            className={
              customTip !== ""
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white"
            }
            disabled={customTip === ""}
          >
            Confirm
          </Button>
        </div>
      </Card>
      <div className="absolute bottom-12 w-1/3 px-4">
        <Button
          variant="default"
          className={tip !== null ? "w-full py-3" : "hidden"}
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}