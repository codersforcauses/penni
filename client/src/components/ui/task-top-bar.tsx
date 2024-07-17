import Image from "next/image";
import * as React from "react";

export default function TaskTopBar() {
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white px-4">
      <p className="text-xl font-semibold">Penni</p>
      <button>
        <Image
          // TO DO replace it with api fetch user profile.
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
