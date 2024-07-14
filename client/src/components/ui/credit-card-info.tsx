import Image from "next/image";
import React from "react";

export default function CreditCardInfo(last4Digits: string) {
  return <div id="credit-card-info">{last4Digits}</div>;
}
