import { Inter as FontSans } from "next/font/google";
import { useState } from "react";

import OnBoarding from "@/components/OnBoarding/OnBoarding";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Ping = () => {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  return (
    <>
      <h1 className="text-3xl text-primary">Test title</h1>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
    </>
  );
};

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  const slides = [
    {
      title: "Penni jobs for some extra cash",
      img: "/img/OnBoarding/carousel-1.svg",
    },
    {
      title: "Give back to someone who has given a lot",
      img: "/img/OnBoarding/carousel-2.svg",
    },
    {
      title: "Extra spare time with the loves ones",
      img: "/img/OnBoarding/carousel-3.svg",
    },
  ];

  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center font-sans", // removed: flex min-h-screen flex-col items-center
        fontSans.variable,
      )}
    >
      <OnBoarding followingContent={<Ping />} slides={slides} />
    </main>
  );
}
