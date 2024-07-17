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
  const obfuscatedText = `···· ···· ···· `;
  return (
    <div id="credit-card-info" className="flex items-center">
      <Image
        src={cardTypeIcons[cardType]}
        alt={`${cardType} logo`}
        width={40}
        height={25}
      />
      <p className="ml-2">
        <span className="text-t3 tracking-widest text-penni-text-subheading-light-mode">
          {obfuscatedText}
        </span>
        <span className="text-penni-text-regular-light-mode">
          {last4Digits}
        </span>
      </p>
    </div>
  );
}
