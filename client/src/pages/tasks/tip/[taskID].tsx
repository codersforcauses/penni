import Image from "next/image"; // Import the Image component
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import CreditCardInfo from "@/components/ui/payment/credit-card-info";
import { CardType } from "@/lib/card-types";
import { validateTaskID } from "@/lib/task-id";

interface TipProps {
  taskID: string;
}

export default function Tip({ taskID }: TipProps) {
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [customTip, setCustomTip] = useState("");
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(e.target.value);
  };

  const toggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white p-4">
      <div className="relative mb-6 h-24 w-24">
        <Image
          src="/default-profile.svg" // Replace with actual image source if available
          alt="Profile"
          className="rounded-full object-cover"
          width={96} // Adjust the width and height as needed
          height={96}
        />
      </div>
      <p className="mb-4 text-xl font-medium">
        Would you like to tip Jackson Anderson?
      </p>
      <div className="mb-4 flex space-x-4">
        <Button variant="round" size="round">
          $10
        </Button>
        <Button variant="round" size="round">
          $20
        </Button>
        <Button variant="round" size="round">
          $30
        </Button>
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
          <CreditCardInfo cardType={CardType.Visa} last4Digits="1234" />
        </div>
      </Card>
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  const taskID = params?.taskID as string; // Prevent type errors if not defined

  // Validate the task ID
  if (!validateTaskID(taskID)) {
    return {
      notFound: true, // Redirect to an error page on invalid ID
    };
  }

  // Fetch additional data about the task if needed
  // const res = await fetch(`https://api.example.com/tasks/${sanitizedTaskID}`);
  // const taskData = await res.json();

  return {
    props: {
      taskID,
      // taskData, // Pass additional task data as props
    },
  };
}
