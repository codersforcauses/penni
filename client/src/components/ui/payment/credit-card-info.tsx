import Image from "next/image";
import React from "react";

import { CardType } from "@/lib/types";

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

/**
 * CreditCardInfo component
 *
 * This component displays credit card information, including the card type icon
 * and the last four digits of the card number. The first 12 digits are obfuscated
 * for security reasons.
 *
 * @param {CardType} cardType - The type of the credit card (Visa, MasterCard, Amex, Discover, or Unknown).
 * @param {string} last4Digits - The last four digits of the credit card number.
 * @returns {JSX.Element} The rendered CreditCardInfo component.
 *
 * @example
 * <CreditCardInfo cardType={CardType.Visa} last4Digits="1234" />
 */
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
