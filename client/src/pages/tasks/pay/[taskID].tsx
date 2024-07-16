import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import PersonDetail from "@/components/ui/person-detail";

interface PayProps {
  taskID: string;
}

export default function Pay({ taskID }: PayProps) {
  return (
    <div id="payment" className="flex min-h-screen flex-col">
      <Header title="Payment Details" />
      <hr />
      <div className="mx-4">
        <div id="task-details">
          <h3 className="title3 h py-4">Task Details</h3>
          <div>
            <div className="text-xs">Task Title</div>
            <p>Cleaning my house.</p>
          </div>
          <div>
            <div className="text-xs">Date</div>
            <p>10 Dec, 2022</p>
          </div>
        </div>
        <hr />
        <div id="bidder-details">
          <h2>Bidder Details</h2>
          <PersonDetail personName="abc" />
        </div>
        <hr />
        <div id="payment-details" className="flex flex-row">
          <button>
            <div>
              <h2>Payment Method</h2>
              <p>1300</p>
            </div>
            <div>{">"}</div>
          </button>
        </div>
        <hr />
        <div id="payment-total"></div>
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

  return {
    props: {
      taskID,
      // taskData, // Pass additional task data as props
    },
  };
}
