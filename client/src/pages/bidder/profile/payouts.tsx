import React from "react";

import PayoutCard from "@/components/ui/bidder/payout-card";
import Header from "@/components/ui/header";

export default function Payouts() {
  return (
    <div className="flex min-h-screen flex-col bg-penni-background-light-mode">
      <Header title="Payouts" />
      <div className="h-[0.12rem] grow-0 bg-penni-background-input-light-mode"></div>
      <div>
        <div className="lineHeight-co ml-4 mt-4 py-4 text-hb text-penni-text-regular-light-mode">
          Bank Details
        </div>
        <PayoutCard title="Account Holder Name" description="Jane Doe" />
        <PayoutCard title="BSB" description="123 456" />
        <PayoutCard title="Account Number" description="1234 567 89" />
        <div className="border-penni-border-light-mode mx-4 mt-12 flex items-center rounded-penni-border border-2 p-4">
          <span className="lineHeight-co grow text-center text-hb text-penni-main">
            ID Verified
          </span>
          <span className="flex-none">
            {" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                fill="#2C66D5"
              />
              <path
                d="M10.0001 16.636C9.9123 16.6354 9.82547 16.6174 9.74463 16.5831C9.66379 16.5488 9.59053 16.4988 9.52911 16.436L6.19614 13.103C6.13412 13.0411 6.0849 12.9676 6.05133 12.8867C6.01776 12.8058 6.00049 12.7191 6.00049 12.6315C6.00049 12.5439 6.01776 12.4572 6.05133 12.3763C6.0849 12.2953 6.13412 12.2219 6.19614 12.16C6.258 12.098 6.33148 12.0488 6.41238 12.0152C6.49329 11.9816 6.58004 11.9644 6.66763 11.9644C6.75523 11.9644 6.84194 11.9816 6.92285 12.0152C7.00376 12.0488 7.07727 12.098 7.13913 12.16L10.0011 15.021L16.8631 8.15999C16.925 8.09798 16.9985 8.04878 17.0794 8.01521C17.1603 7.98164 17.247 7.96436 17.3346 7.96436C17.4222 7.96436 17.509 7.98164 17.5899 8.01521C17.6708 8.04878 17.7443 8.09798 17.8061 8.15999C17.8681 8.22185 17.9173 8.29534 17.9509 8.37625C17.9845 8.45716 18.0018 8.54389 18.0018 8.63149C18.0018 8.71909 17.9845 8.80582 17.9509 8.88673C17.9173 8.96763 17.8681 9.04113 17.8061 9.10299L10.4731 16.436C10.4115 16.499 10.3379 16.5492 10.2567 16.5835C10.1755 16.6178 10.0883 16.6357 10.0001 16.636Z"
                fill="white"
              />
            </svg>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
