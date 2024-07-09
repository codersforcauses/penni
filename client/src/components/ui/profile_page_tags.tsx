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
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className="w-6 h-6 mr-4 ml-4">
            {IconComponent ? (
              <IconComponent className="w-full h-full" />
            ) : (
              <Image src={icon as string} alt={title} width={24} height={24} />
            )}
          </div>
          <div>
            <h3 className="text-hb leading-hb font-normal text-penni-text-regular-light-mode font-sans">{title}</h3>
            <p className="text-fn leading-fn font-normal text-penni-text-secondary-light-mode font-sans">{description}</p>
          </div>
        </div>
        <div className="w-6 h-6 text-penni-grey-inactive">
          <ChevronRightIcon className={`w-full h-full ${isOpen ? 'rotate-90' : ''}`} />
        </div>
      </div>
      <div className="border-t border-penni-grey-border-light-mode w-full"></div>
      {isOpen && nestedContent && <div className="p-4">{nestedContent}</div>}
    </div>
  );
};

export default ProfileTag;
