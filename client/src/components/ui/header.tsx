import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string; // Prop to pass the title of the header
  className?: string; // Optional prop to pass extra classnames to the main div
  hideBackButton?: boolean; // Optional prop to hide the back button
}

/**
 * Header component that displays a title and optionally a back button.
 *
 * @param {HeaderProps} props - The props for the component.
 * @param {string} props.title - Title of the header.
 * @param {boolean} [props.hideBackButton=false] - Flag to hide the back button. (OPTIONAL) (DEFAULT: False)
 * @param {string} [props.className] - Additional CSS classes to apply to the component. (OPTIONAL)
 * @returns {JSX.Element} The Header component.
 *
 * @example
 * <Header title="Report a problem" />
 */
export default function Header({
  title,
  className,
  hideBackButton = false,
}: HeaderProps) {
  const router = useRouter();

  // Sends the user to the last previous page they were on
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div
      id="header"
      className={`relative flex flex-grow-0 flex-row items-center justify-center bg-penni-background-light-mode px-4 pb-4 pt-6 ${className}`}
    >
      {!hideBackButton && (
        <Button
          onClick={handleBackClick}
          variant="link"
          className="absolute left-4 top-1/2 -translate-y-1/2 transform"
        >
          <Image
            src="/icons/arrow_back.svg"
            alt="Back"
            width={24}
            height={24}
          />
        </Button>
      )}
      <h2 className="body-medium flex-grow py-2 text-center">{title}</h2>
    </div>
  );
}
