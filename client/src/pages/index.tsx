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

const sampleTaskData = {
  category: "Cleaning",
  title: "Cleaning Up My House",
  created_at: "10 Dec, 2022",
  suburb: "Richmond",
  state: "VIC",
  estimated_time: "4 Hours",
  budget: "$250",
  description:
    "I need someone to help me clean my 2 bedroom apartment. I am moving out and I need to make sure it’s all clean.",
};

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
      className={cn("flex min-h-screen flex-col font-sans", fontSans.variable)}
    >
      <TaskDetails data={sampleTaskData} />
    </main>
  );

  /*
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
    </main>
  );*/
}
