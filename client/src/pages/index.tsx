import { Inter as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import OnBoarding from "@/components/OnBoarding";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";
import SplashScreen from "../components/ui/SplashScreen";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Ping = () => {
  const [clicked, setClicked] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center gap-4 p-24 font-sans",
        fontSans.variable,
      )}
    >
      <h1 className="title1 text-primary">Test title</h1>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
    </main>
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
    <main className={cn("flex min-h-full min-w-full flex-col items-center")}>
      <OnBoarding followingContent={<Ping />} slides={slides} />
    </main>
  );
}
