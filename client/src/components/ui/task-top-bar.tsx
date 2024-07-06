import Image from "next/image";
import * as React from "react";

export default function TaskTopBar() {
  return (
    <div className="fixed flex w-full items-center justify-between px-4 py-2">
      <p className="text-xl font-semibold">Penni</p>
      <button>
        <Image
          src="/profile-2.svg"
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full"
        />
      </button>
    </div>
  );
}
