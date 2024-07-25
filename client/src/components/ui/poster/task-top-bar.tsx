import jwt from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";

export default function TaskTopBar() {
  const router = useRouter();
  const handleOnClick = async () => {
    // const token = localStorage.getItem("token");
    // if (!token) throw new Error("No token found");

    // const decoded = jwt.decode(token) as { user_id: string };
    // const user_id = decoded.user_id;
    router.push(`/poster/profile`);
  };
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white">
      <p className="text-xl font-semibold">Penni</p>
      <button onClick={handleOnClick}>
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
