import Link from "next/link";

import { ChevronRightIcon } from "../icons";

type TaskState = "BIDDING" | "ONGOING" | "COMPLETED" | "EXPIRED";

export type PosterTaskCardProps = {
  title: string;
  numberOfBidders: number;
  date: string;
  state: TaskState;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function PosterTaskCard({
  title,
  numberOfBidders,
  date,
  state,
  className,
  onClick,
}: PosterTaskCardProps) {
  const compClassName = `cursor-pointer relative m-4 rounded-lg border p-4 ${state === "EXPIRED" ? "bg-gray-100 opacity-60" : "bg-white"} transition duration-300 ease-in-out`;
  if (className) {
    compClassName.concat(` ${className}`);
  }
  return (
    <div onClick={onClick} id="poster-task-card" className={compClassName}>
      {state && (
        <div
          className={`footnote inline-block rounded-lg px-3 py-1.5 font-medium ${state === "BIDDING" ? "bg-blue-100 text-blue-800" : state === "ONGOING" ? "bg-orange-100 text-orange-700" : state === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-gray-300 text-gray-700"}`}
        >
          {state}
        </div>
      )}
      <h2 className="mt-2 text-lg font-bold">{title}</h2>
      <p
        id="date"
        className="mt-1 text-gray-400"
      >{`${date} · ${numberOfBidders} Bids`}</p>
      <div className="absolute right-2 top-14">
        <ChevronRightIcon />
      </div>
    </div>
  );
}
