import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { CardType } from "@/lib/card-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
