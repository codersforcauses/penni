import React from "react";

import { Button } from "@/components/ui/button";
import CreditCardInfo from "@/components/ui/credit-card-info";
import Header from "@/components/ui/header";
import { ChevronRightIcon } from "@/components/ui/icons";
import PersonDetail from "@/components/ui/person-detail";
import { CardType } from "@/lib/card-types";
import { getCardTypeFromMII } from "@/lib/utils";

interface CardInfo {
  cardType: CardType;
  last4Digits: string;
}

interface TaskInfo {
  title: string;
  date: string;
}

interface BidderInfo {
  profileImg: string;
  username: string;
}

interface AmountInfo {
  taskCost: number;
  tip: number;
  fee: number;
}

interface PayProps {
  taskID: string;
  cardInfo: CardInfo;
  taskInfo: TaskInfo;
  bidderInfo: BidderInfo;
  amountInfo: AmountInfo;
}

export default function Pay({
  taskID,
  cardInfo,
  taskInfo,
  bidderInfo,
  amountInfo,
}: PayProps) {
  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Can be modifed for different currencies
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div id="payment" className="flex min-h-screen flex-col">
      <Header title="Payment Details" />
      <hr />
      <div className="mx-4 flex-grow">
        <div id="task-details" className="py-6">
          <h3 className="title3">Task Details</h3>
          <div className="py-4">
            <div className="text-xs text-penni-text-subheading-light-mode">
              Task Title
            </div>
            <p>{taskInfo?.title}</p>
          </div>
          <div>
            <div className="text-xs text-penni-text-subheading-light-mode">
              Date
            </div>
            <p>{taskInfo?.date}</p>
          </div>
        </div>
        <hr />
        <div id="bidder-details" className="py-6">
          <h3 className="title3 pb-2">Bidder Details</h3>
          <PersonDetail
            personName={bidderInfo?.username}
            personImg={bidderInfo?.profileImg}
          />
        </div>
        <hr />
        <div id="payment-details" className="py-6">
          <button className="flex w-full flex-row items-center justify-between">
            <div className="">
              <h3 className="title3 text-left">Payment Method</h3>
              <CreditCardInfo
                cardType={cardInfo?.cardType}
                last4Digits={cardInfo?.last4Digits}
              />
            </div>
            <ChevronRightIcon className="ml-auto" />
          </button>
        </div>
        <hr />
        <div id="payment-total" className="py-6">
          <p className="flex justify-between">
            Subtotal{" "}
            <span className="ml-auto">
              {formatMoney(amountInfo?.taskCost + amountInfo?.tip)}
            </span>
          </p>
          <p className="flex justify-between">
            Service Fee <span>{formatMoney(amountInfo?.fee)}</span>
          </p>
          <h4 className="title4 flex justify-between font-semibold">
            Total{" "}
            <span>
              {formatMoney(
                amountInfo?.taskCost + amountInfo?.tip + amountInfo?.fee,
              )}
            </span>
          </h4>
        </div>
      </div>
      <div className="mt-auto px-4 py-6">
        <Button className="w-full" size="penni">
          Confirm and Pay
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  const taskID = params?.taskID as string; // Prevent type errors if not defined

  // Define a regex pattern for a valid task ID (only numbers)
  const validTaskIDPattern = /^[0-9]+$/;

  // Validate the taskID
  if (!taskID || !validTaskIDPattern.test(taskID)) {
    return {
      notFound: true, // Redirect to an error page on invalid ID
    };
  }

  // Fetch additional data about the task if needed
  // const res = await fetch(`https://api.example.com/tasks/${sanitizedTaskID}`);
  // const taskData = await res.json();

  // Determine card type and last four digits
  const cardNumber = "411111111111111"; // This should be fetched SECURELY (alternatively, only the first digit & last 4 digits are needed)
  const firstDigit = cardNumber.charAt(0);
  const cardInfo: CardInfo = {
    cardType: getCardTypeFromMII(firstDigit),
    last4Digits: cardNumber.slice(-4),
  };

  // Determine task details
  const taskInfo: TaskInfo = {
    title: "Cleaning up my house", // Obtained from API
    date: "10 Dec, 2022", // Obtained from API & processed to match form required
  };

  // Determine bidder details
  const bidderInfo: BidderInfo = {
    profileImg: "/default-profile.svg", // Again obtained via API
    username: "Jackson Anderson",
  };

  // Determine amounts to be payed
  const amountInfo: AmountInfo = {
    taskCost: 15,
    tip: 1,
    fee: 0,
  };

  return {
    props: {
      taskID,
      cardInfo,
      taskInfo,
      bidderInfo,
      amountInfo,
    },
  };
}
