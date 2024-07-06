import Image from "next/image";
import React from "react";

import { Button } from "../button";

export default function NewTask() {
  const backImg = "/back.svg";
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="fixed top-5 mt-3 flex h-12 w-screen justify-center bg-gray-300">
          <Image
            className="absolute left-10 top-2"
            src={backImg}
            alt="back"
            width={30}
            height={30}
          />
          <h1 className="absolute top-2 text-center font-mono text-2xl font-bold">
            New Task
          </h1>
          <hr className="mt-12 w-full border-2 border-gray-600" />
        </div>
        <div className="mt-24 flex h-2/3 w-11/12 flex-col items-center justify-between bg-gray-300">
          <p className="mt-10 h-96 w-screen pt-10 text-center text-2xl font-bold">
            Place Task Card Here
          </p>
          <Button className="font-lg bottom-1 mb-5 h-12 w-10/12 rounded-2xl text-center font-mono text-2xl">
            Post Task
          </Button>
        </div>
      </div>
    </div>
  );
}
