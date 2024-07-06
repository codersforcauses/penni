import { Inter as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import TaskDetails from "../components/TaskDetails";
import { Button } from "../components/ui/button";
import SplashScreen from "../components/ui/SplashScreen";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
  return(
    <main
      className={cn(
        "flex min-h-screen flex-col",
      )}
    >
      <TaskDetails data={{}}></TaskDetails>
    </main>
  )
}
