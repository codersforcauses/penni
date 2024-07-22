/**
 * PayoutCard component that displays payment information.
 *
 * @param props - The properties passed to the PayoutCard component.
 * @param props.title - The title or label for the information displayed.
 * @param props.description - The detailed description or value associated with the title.
 *
 * @returns A React functional component that renders a styled card with a title and description.
 *
 * @example
 * // Example usage:
 * <PayoutCard title="Account Holder Name" description="Jane Doe" />
 */
import React from "react";

interface PayoutCardProps {
  title: string;
  description: string;
}

const PayoutCard: React.FC<PayoutCardProps> = ({ title, description }) => {
  return (
    <div className="w-full border-b-1 border-penni-border-light-mode p-4">
      <p className="mb-1 text-fn font-normal leading-fn text-penni-text-regular-light-mode text-opacity-60">
        {title}
      </p>
      <p className="text-hb leading-co text-penni-text-regular-light-mode">{description}</p>
    </div>
  );
};

export default PayoutCard;
