import Image from "next/image";
import React from "react";

import { Button } from "./button";

interface EmptyListDisplayProp {
  type: "poster" | "bidder";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function EmptyListDisplay({
  type,
  onClick,
}: EmptyListDisplayProp) {
  return (
    <div className="relative flex flex-col items-center gap-5 px-4">
      <Image
        width={178}
        height={171}
        src="/empty-list-img.svg"
        alt="Image of a girl and flowers"
      />
      <p className="body">
        You do not have any {type === "poster" ? "orders" : "tasks"} yet
      </p>
      <Button
        className="headline h-14 w-full"
        {...(onClick ? { onClick } : {})}
      >
        {type === "poster" ? "Create a Task" : "Start Browsing"}
      </Button>
    </div>
  );
}
