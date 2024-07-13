import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { ChevronRightIcon } from "./icons";

// Example usecase:
/* <ProfileTag
        icon={Logout} // Pass the component directly
        title="Logout"
        description=""
        nestedContent={<div>Logout content goes here</div>} // Use nested content for Logout
        or 
        link="/profile/about"
        or 
        link="https://example.com"
      />
*/
// Define the props for the ProfileTag component
interface ProfileTagProps {
  icon: string | React.ElementType;
  title: string;
  description: string;
  link?: string;
  nestedContent?: React.ReactNode;
}

// ProfileTag component definition
const ProfileTag: React.FC<ProfileTagProps> = ({
  icon,
  title,
  description,
  link,
  nestedContent,
}) => {
  // useState hook to manage the state of the nested content visibility
  const [isOpen, setIsOpen] = useState(false);

  // Determine if the icon is a string (URL) or a React component
  const IconComponent = typeof icon === "string" ? null : icon;

  // Function to handle click events
  const handleClick = () => {
    if (nestedContent) {
      setIsOpen(!isOpen); // Toggle the isOpen state
    }
  };

  return (
    <div className="relative flex flex-col bg-white">
      <Link href={link || "#"} onClick={handleClick}>
        <div
          className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-100"
          style={{ height: "64px" }}
        >
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
          <div className="absolute right-8 top-1/2 -translate-y-1/2 transform">
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
