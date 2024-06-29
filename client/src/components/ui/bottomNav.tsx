import Image from "next/image";

const iconLists = [
  {
    ref: "/img/bottomNavIcon1.svg",
    alt: "Icon of my tasks",
    text: "My Tasks",
  },
  {
    ref: "/img/bottomNavIcon2.svg",
    alt: "Icon of market",
    text: "Market",
  },
  {
    ref: "/img/bottomNavIcon3.svg",
    alt: "Icon of me",
    text: "Me",
  },
];

export default function BottomNav() {
  return (
    <div className="flex h-20 pt-2 text-xs leading-3">
      {iconLists.map((iconItem, index) => (
        <div key={index} className="flex w-1/3 flex-col items-center">
          <div>
            <Image
              src={iconItem.ref}
              alt={iconItem.alt}
              width={24}
              height={24}
            />
          </div>
          <p>{iconItem.text}</p>
        </div>
      ))}
    </div>
  );
}
