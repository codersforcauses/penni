import { useRouter } from "next/router";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { ChevronRightIcon } from "@/components/ui/icons";
import CreditCardInfo from "@/components/ui/payment/credit-card-info";
import Tip from "@/components/ui/payment/tip";
import PersonDetail from "@/components/ui/person-detail";
import { formatDate } from "@/lib/format";
import { CardType } from "@/lib/types";
import { getCardTypeFromMII } from "@/lib/utils";
import { validateTaskID } from "@/lib/validation";

interface CardInfo {
  cardType: CardType;
  last4Digits: string;
}

interface TaskInfo {
  title: string;
  date: string;
}

export interface BidderInfo {
  profileImg: string;
  name: string;
}

interface AmountInfo {
  taskCost: number;
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
  const router = useRouter();
  const [tipAmount, setTipAmount] = useState<number | null>(null); // Handled from tip page

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Can be modifed for different currencies
      minimumFractionDigits: 2,
    }).format(value);
  };

  const onConfirm = () => {
    // Send info to database via API
    alert("Payment Successful. You have successfully paid.");
    router.back(); // Send back to task view??
  };

  const handleTipSubmit = (amount: number) => {
    setTipAmount(amount);
  };

  if (tipAmount === null) {
    return (
      <Tip
        taskID={taskID}
        onTipSubmit={handleTipSubmit}
        bidderInfo={bidderInfo}
      />
    );
  }

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
            personName={bidderInfo?.name}
            personImg={bidderInfo?.profileImg}
          />
        </div>
        <hr />
        <div id="payment-details" className="py-6">
          <button
            className="flex w-full flex-row items-center justify-between" /* NO DESIGNS EXIST FOR PAYMENT CHANGES! */
          >
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
              {formatMoney(amountInfo?.taskCost + tipAmount)}
            </span>
          </p>
          <p className="flex justify-between">
            Service Fee <span>{formatMoney(amountInfo?.fee)}</span>
          </p>
          <h4 className="title4 flex justify-between font-semibold">
            Total{" "}
            <span>
              {formatMoney(amountInfo?.taskCost + tipAmount + amountInfo?.fee)}
            </span>
          </h4>
        </div>
      </div>
      <div className="mt-auto px-4 py-6">
        <Button className="w-full" size="penni" onClick={onConfirm}>
          Confirm and Pay
        </Button>
      </div>
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

  // Fetch additional data about the task
  const res = await fetch(`http://localhost:3000/api/tasks-test/${taskID}`);
  if (!res.ok) {
    return {
      notFound: true, // Handle error response from the API
    };
  }
  const taskData = await res.json();

  // Determine card type and last four digits
  const cardNumber = "411111111111111"; // This should be fetched SECURELY (alternatively, only the first digit & last 4 digits are needed)
  const firstDigit = cardNumber.charAt(0);
  const cardInfo: CardInfo = {
    cardType: getCardTypeFromMII(firstDigit),
    last4Digits: cardNumber.slice(-4),
  };

  // Determine task details
  const taskInfo: TaskInfo = {
    title: taskData.title ?? "N/A", // Default to N/A if missing from API call
    date: taskData.date ? formatDate(taskData.date) : "N/A", // Format date to match specifications OR N/A if missing
  };

  // Determine bidder details
  const bidderInfo: BidderInfo = {
    profileImg: taskData.profileImg ?? "/default-profile.svg", // **Again obtained via API (might be seperate api call if not with data)**
    name: taskData.username ?? "N/A", // **NOT SURE IF ITS USERNAME OR JUST NAME**
  };

  // Determine amounts to be payed
  const amountInfo: AmountInfo = {
    taskCost: taskData.budget, // Error on missing budget data (cant be payed regardless)
    fee: 0, // **Not sure how fee is calculated or obtained**
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
