import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { CardType } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * getCardTypeFromMII function
 *
 * This function determines the card type based on the first digit of the card number,
 * known as the Major Industry Identifier (MII).
 *
 * @param {string} firstDigit - The first digit of the card number.
 * @returns {CardType} Returns the corresponding CardType based on the MII.
 * @example
 * getCardTypeFromMII("4"); // Returns CardType.Visa
 * getCardTypeFromMII("7"); // Returns CardType.Unknown
 */
export function getCardTypeFromMII(firstDigit: string): CardType {
  switch (firstDigit) {
    case "4":
      return CardType.Visa;
    case "5":
      return CardType.MasterCard;
    case "3":
      return CardType.Amex;
    case "6":
      return CardType.Discover;
    default:
      return CardType.Unknown;
  }
}
