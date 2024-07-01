import { Inter as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import TaskCard from "@/components/ui/TaskCard";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";
import SplashScreen from "../components/ui/SplashScreen";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sampleTask = [
  "Clean up my house",
  "CLEANING",
  "BIDDING",
  "21 Aud, 2022",
  "4",
  "300",
];

export default function Home() {
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
      <h1 className="text-3xl text-primary">Test title</h1>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
      <br />
      <TaskCard
        title="Clean up my house"
        category="cleaning"
        state="expired"
        time="21 Aug, 2022"
        location="Richmond, VIC"
        duration="4"
        price="300"
      />
    </main>
  );
}
