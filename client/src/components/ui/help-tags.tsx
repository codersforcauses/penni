import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { ChevronRightIcon } from "./icons";

interface HelpTagProps {
  title: string;
  description: string;
  link?: string;
  nestedContent?: React.ReactNode;
}

/**
 * HelpTag component displays a Help tag with an icon, title, description, and optional nested content.
 *
 * @param {object} props - Props for the HelpTag component.
 * @param {string} props.title - Title of the Help tag.
 * @param {string} props.description - Description of the Help tag.
 * @param {string} [props.link] - Optional link URL. If provided, clicking the tag will navigate to this URL.
 * @param {React.ReactNode} [props.nestedContent] - Optional nested content to display when the tag is clicked.
 *
 * @returns {React.FC<HelpTagProps>} The HelpTag component.
 *
 * @example
 * // Usage with a URL icon and link
 * <HelpTag
 *   icon="/icons/user-icon.png"
 *   title="Help"
 *   description="View and edit your Help"
 *   link="/Help"
 * />
 *
 * @example
 * // Usage with a React component icon and nested content
 * import { LogoutIcon } from "./icons";
 * <HelpTag
 *   icon={LogoutIcon}
 *   title="Logout"
 *   description=""
 *   nestedContent={<div>Logout content goes here</div>}
 * />
 */

const HelpTag: React.FC<HelpTagProps> = ({
  title,
  description,
  link,
  nestedContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (nestedContent) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative flex flex-col bg-white">
      <Link href={link || "#"} onClick={handleClick}>
        <div
          className="flex cursor-pointer items-center justify-between p-4 hover:bg-penni-text-regular-dark-mode"
          style={{ height: "70px" }}
        >
          <div className="ml-3 flex items-center">
            <div>
              <h3 className="text-hb font-normal leading-hb text-penni-text-regular-light-mode">
                {title}
              </h3>
              <p className="text-fn font-normal leading-fn text-penni-text-secondary-light-mode">
                {description}
              </p>
            </div>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 transform">
            <ChevronRightIcon className="mr-1 h-5 w-5 text-penni-text-tertiary-light-mode" />
          </div>
        </div>
      </Link>
      {nestedContent && isOpen && <div className="p-4">{nestedContent}</div>}
    </div>
  );
};

export default HelpTag;
