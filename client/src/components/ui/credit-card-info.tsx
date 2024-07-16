import Image from "next/image";
import React from "react";

import { CardType } from "@/lib/card-types";

// Map of card types to their respective icons
const cardTypeIcons: { [key in CardType]: string } = {
  [CardType.Visa]: "/icons/card-visa.svg",
  [CardType.MasterCard]: "/icons/card-mastercard.svg",
  [CardType.Amex]: "/icons/card-amex.svg",
  [CardType.Discover]: "/icons/card-discover.svg",
  [CardType.Unknown]: "/icons/card-unknown.svg",
};

interface CreditCardInfoProps {
  cardType: CardType;
  last4Digits: string;
}

export default function CreditCardInfo({
  cardType,
  last4Digits,
}: CreditCardInfoProps) {
  const obfuscatedNumber = `•••• •••• •••• ${last4Digits}`;
  return (
    <div id="credit-card-info" className="flex items-center">
      <Image
        src={cardTypeIcons[cardType]}
        alt={`${cardType} logo`}
        width={40}
        height={25}
      />
      <p className="ml-2">{obfuscatedNumber}</p>
    </div>
  );
}
