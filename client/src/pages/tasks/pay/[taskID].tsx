import { GetServerSideProps } from "next";
import React from "react";

import { Button } from "@/components/ui/button";
import CreditCardInfo from "@/components/ui/credit-card-info";
import Header from "@/components/ui/header";
import PersonDetail from "@/components/ui/person-detail";
import { CardType } from "@/lib/card-types";
import { getCardTypeFromMII } from "@/lib/utils";

interface CardInfo {
  cardType: CardType;
  last4Digits: string;
}

interface PayProps {
  taskID: string;
  cardInfo: CardInfo;
}

export default function Pay({ taskID, cardInfo }: PayProps) {
  return (
    <div id="payment" className="flex min-h-screen flex-col">
      <Header title="Payment Details" />
      <hr />
      <div className="mx-4">
        <div id="task-details" className="py-6">
          <h3 className="title3">Task Details</h3>
          <div className="py-4">
            <div className="text-xs text-penni-text-subheading-light-mode">
              Task Title
            </div>
            <p>Cleaning my house.</p>
          </div>
          <div>
            <div className="text-xs text-penni-text-subheading-light-mode">
              Date
            </div>
            <p>10 Dec, 2022</p>
          </div>
        </div>
        <hr />
        <div id="bidder-details" className="py-6">
          <h3 className="title3 pb-2">Bidder Details</h3>
          <PersonDetail personName="abc" />
        </div>
        <hr />
        <div id="payment-details" className="flex flex-row py-6">
          <button>
            <div>
              <h3 className="title3">Payment Method</h3>
              <CreditCardInfo
                cardType={cardInfo.cardType}
                last4Digits={cardInfo.last4Digits}
              />
            </div>
            <div>{">"}</div>
          </button>
        </div>
        <hr />
        <div id="payment-total" className="py-6">
          <p className="flex justify-between">
            Subtotal <span className="ml-auto">$15.00</span>
          </p>
          <p className="flex justify-between">
            Service Fee <span>$0.00</span>
          </p>
          <h4 className="title4 flex justify-between font-semibold">
            Total <span>$15.00</span>
          </h4>
        </div>
        <Button>Confirm and Pay</Button>
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

  const cardNumber = "511111111111111"; // This should be fetched SECURELY

  // Determine card type and last four digits
  const firstDigit = cardNumber.charAt(0);
  const cardInfo: CardInfo = {
    cardType: getCardTypeFromMII(firstDigit),
    last4Digits: cardNumber.slice(-4),
  };

  return {
    props: {
      taskID,
      cardInfo,
      // taskData, // Pass additional task data as props
    },
  };
}
