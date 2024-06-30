import * as React from "react";

interface BottomNavIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  alt?: string;
}

const BottomNavIcon1: React.FC<BottomNavIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const BottomNavIcon2: React.FC<BottomNavIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 3H3v7h7V3zM21 3h-7v7h7V3zM21 14h-7v7h7v-7zM10 14H3v7h7v-7z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const BottomNavIcon3: React.FC<BottomNavIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { BottomNavIcon1, BottomNavIcon2, BottomNavIcon3 };

const iconLists = [
  {
    IconComponent: BottomNavIcon1,
    alt: "Icon of my tasks",
    text: "My Tasks",
  },
  {
    IconComponent: BottomNavIcon2,
    alt: "Icon of market",
    text: "Market",
  },
  {
    IconComponent: BottomNavIcon3,
    alt: "Icon of me",
    text: "Me",
  },
];

export default function BottomNav() {
  return (
    <div className="border-t-penni-border-light-mode h-[83px] border-t-2">
      <div className="flex h-[49px] cursor-pointer text-[10px] leading-3">
        {iconLists.map((iconItem, index) => (
          <div
            key={index}
            className="flex w-1/3 flex-col items-center pt-[6px] text-penni-text-tertiary-light-mode"
          >
            <div>
              <iconItem.IconComponent
                className="text-penni-text-tertiary-light-mode"
                alt={iconItem.alt}
              />
            </div>
            <p>{iconItem.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
