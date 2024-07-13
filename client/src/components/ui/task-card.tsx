import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { ChevronRightIcon } from "./icons"; // Adjust the import path as necessary

// the props
export interface TaskCardProps {
  id: string;
  state?: "BIDDING" | "EXPIRED" | "ONGOING" | "COMPLETED";
  category: string;
  title: string;
  description: string;
  link?: string;
  nestedContent?: React.ReactNode;
}

const ProfileTag: React.FC<ProfileTagProps> = ({
  icon,
  title,
  description,
  link,
  nestedContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = typeof icon === "string" ? null : icon;

  const handleClick = () => {
    if (nestedContent) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className="relative flex flex-col bg-white"
      style={{ height: "64px", width: "375px" }}
    >
      <Link href={link || "#"} onClick={handleClick}>
        <div className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-100">
          <div className="flex items-center">
            <div className="ml-4 mr-4 h-6 w-6">
              {IconComponent ? (
                <IconComponent className="h-full w-full" />
              ) : (
                <Image
                  src={icon as string}
                  alt={title}
                  width={24}
                  height={24}
                />
              )}
            </div>
            <div>
              <h3 className="text-hb font-normal leading-hb text-penni-text-regular-light-mode">
                {title}
              </h3>
              <p className="text-fn font-normal leading-fn text-penni-text-secondary-light-mode">
                {description}
              </p>
            </div>
          </div>
          <div className="absolute right-8 top-5">
            <ChevronRightIcon className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </Link>
      {nestedContent && isOpen && <div className="p-4">{nestedContent}</div>}
      <div className="w-full border-t border-penni-grey-border-light-mode"></div>
    </div>
  );
};

export default ProfileTag;
