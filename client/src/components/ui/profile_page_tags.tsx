import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { ChevronRightIcon } from './icons'; // Adjust the import path as necessary

interface ProfileTagProps {
  icon: string | React.ElementType;
  title: string;
  description: string;
  link?: string;
  nestedContent?: React.ReactNode;
}

const ProfileTag: React.FC<ProfileTagProps> = ({ icon, title, description, link, nestedContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = typeof icon === 'string' ? null : icon;

  const handleClick = () => {
    if (nestedContent) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative flex flex-col bg-white">
      <Link href={link || "#"} onClick={handleClick}>
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-4 ml-4">
              {IconComponent ? (
                <IconComponent className="w-full h-full" />
              ) : (
                <Image src={icon as string} alt={title} width={24} height={24} />
              )}
            </div>
            <div>
              <h3 className="text-hb leading-hb font-normal text-penni-text-regular-light-mode">{title}</h3>
              <p className="text-fn leading-fn font-normal text-penni-text-secondary-light-mode">{description}</p>
            </div>
          </div>
          <div className="absolute right-8 top-5">
            <ChevronRightIcon className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </Link>
      {nestedContent && isOpen && (
        <div className="p-4">
          {nestedContent}
        </div>
      )}
      <div className="border-t border-penni-grey-border-light-mode w-full"></div>
    </div>
  );
};

export default ProfileTag;
