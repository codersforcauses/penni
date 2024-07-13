import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { ChevronRightIcon } from "./icons";

interface ProfileTagProps {
  icon: string | React.ElementType;
  title: string;
  description: string;
  link?: string;
  nestedContent?: React.ReactNode;
}

/**
 * ProfileTag component displays a profile tag with an icon, title, description, and optional nested content.
 *
 * @param {object} props - Props for the ProfileTag component.
 * @param {string | React.ElementType} props.icon - Icon to display. It can be a URL string or a React component.
 * @param {string} props.title - Title of the profile tag.
 * @param {string} props.description - Description of the profile tag.
 * @param {string} [props.link] - Optional link URL. If provided, clicking the tag will navigate to this URL.
 * @param {React.ReactNode} [props.nestedContent] - Optional nested content to display when the tag is clicked.
 *
 * @returns {React.FC<ProfileTagProps>} The ProfileTag component.
 *
 * @example
 * // Usage with a URL icon and link
 * <ProfileTag
 *   icon="/icons/user-icon.png"
 *   title="Profile"
 *   description="View and edit your profile"
 *   link="/profile"
 * />
 *
 * @example
 * // Usage with a React component icon and nested content
 * import { LogoutIcon } from "./icons";
 * <ProfileTag
 *   icon={LogoutIcon}
 *   title="Logout"
 *   description=""
 *   nestedContent={<div>Logout content goes here</div>}
 * />
 */

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