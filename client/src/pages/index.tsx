import { Inter as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import SplashScreen from "@/components/ui/SplashScreen";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showCard, setShowCard] = useState(false);
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
    <main className={cn("flex min-h-screen flex-col items-center gap-4 p-24")}>
      <Button onClick={() => setShowCard(true)}>Show Card</Button>{" "}
      {showCard && <Card> </Card>}
    </main>
  );
}
