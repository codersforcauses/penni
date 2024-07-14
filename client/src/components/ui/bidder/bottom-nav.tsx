// "use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { BottomNavIconProps, MarketIcon, MeIcon, MyTasksIcon } from "../icons";

const activeStyle = "text-penni-main";
const inactiveStyle = "text-penni-text-tertiary-light-mode";

interface Nav {
  IconComponent: React.FC<BottomNavIconProps>;
  alt: string;
  text: string;
  link: string; // in case link to other page when the component is used in the page
}

const navLists: Nav[] = [
  {
    IconComponent: MyTasksIcon,
    alt: "Icon of my tasks",
    text: "My Tasks",
    link: "/bidder",
  },
  {
    IconComponent: MarketIcon,
    alt: "Icon of market",
    text: "Market",
    link: "/bidder/market",
  },
  {
    IconComponent: MeIcon,
    alt: "Icon of me",
    text: "Me",
    link: "/bidder/market",
  },
];

// navIndex prop can only be 0,1,2, representing the index of these icons. Can be used to define the initial color of the ui
export default function BottomNav({
  isFixed = true,
  children,
}: {
  isFixed?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [paddingBottom, setPaddingBottom] = useState<number>(0);
  const isActive = (path: string) => {
    return router.pathname === path;
  };
  const targetDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (targetDivRef.current) {
      setPaddingBottom(targetDivRef.current.offsetHeight);
    }
  });
  return (
    <div>
      <div style={{ paddingBottom: `${isFixed ? paddingBottom : 0}px` }}>
        {children}
      </div>
      <div
        ref={targetDivRef}
        className={`border-t-penni-border-light-mode ${isFixed ? "fixed bottom-0" : ""} h-20 w-full border-t-2 bg-penni-background-light-mode`}
      >
        <ul className="navigationlabel flex h-full cursor-pointer items-start">
          {navLists.map((navItem, index) => (
            <li
              key={index}
              className={`${isActive(navItem.link) ? activeStyle : inactiveStyle} h-full w-1/3`}
            >
              {isActive(navItem.link) ? (
                <div className="flex flex-col items-center pt-2">
                  <div>
                    <navItem.IconComponent alt={navItem.alt} />
                  </div>
                  <p>{navItem.text}</p>
                </div>
              ) : (
                <Link
                  href={navItem.link}
                  className="flex flex-col items-center pt-2"
                >
                  <div>
                    <navItem.IconComponent alt={navItem.alt} />
                  </div>
                  <p>{navItem.text}</p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
