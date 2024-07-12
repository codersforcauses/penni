import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string; // Prop to pass the title of the header
  className?: string; // Optional prop to pass extra classnames to the main div
  hideBackButton?: boolean; // Optional prop to hide the back button
}

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
      className={`flex flex-grow-0 flex-row items-center justify-center bg-penni-background-light-mode px-4 pb-4 pt-6 ${className}`}
    >
      {!hideBackButton && (
        <Button onClick={handleBackClick} variant="link">
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
