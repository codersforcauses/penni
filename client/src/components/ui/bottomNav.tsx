import Link from "next/link";
import * as React from "react";
import { useState } from "react";

import {
  BidderNavIconMarket,
  BidderNavIconMe,
  BidderNavIconTasks,
} from "./icons";

interface BidderNavIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string; // use to change color of the svg pic
  alt?: string;
}

interface Icon {
  IconComponent: React.FC<BidderNavIconProps>;
  alt: string;
  text: string;
  link?: string; // in case link to other page when the component is used in the page
  id: 0 | 1 | 2;
}

const iconLists: Icon[] = [
  {
    IconComponent: BidderNavIconTasks,
    alt: "Icon of my tasks",
    text: "My Tasks",
    id: 0,
  },
  {
    IconComponent: BidderNavIconMarket,
    alt: "Icon of market",
    text: "Market",
    id: 1,
  },
  {
    IconComponent: BidderNavIconMe,
    alt: "Icon of me",
    text: "Me",
    id: 2,
  },
];

// navIndex prop can only be 0,1,2, representing the index of these icons. Can be used to define the initial color of the ui
const BottomNav = ({ navIndex }: { navIndex: 0 | 1 | 2 }) => {
  const [changeColor, setChangeColor] = useState(navIndex);
  const handleItemClick = (idx: 0 | 1 | 2) => {
    setChangeColor(idx);
  };

  return (
    <div className="border-t-penni-border-light-mode fixed bottom-0 h-20 w-full border-t-2">
      <ul className="flex h-12 cursor-pointer text-[10px] leading-3">
        {iconLists.map((iconItem) => (
          <li
            key={iconItem.id}
            className={`${changeColor === iconItem.id ? "text-penni-main" : "text-penni-text-tertiary-light-mode"} w-1/3`}
            onClick={() => handleItemClick(iconItem.id)}
          >
            <Link
              href={iconItem.link || ""}
              className="flex flex-col items-center pt-2"
            >
              <div>
                <iconItem.IconComponent alt={iconItem.alt} />
              </div>
              <p>{iconItem.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomNav;
