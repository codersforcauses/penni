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
      <Button onClick={() => setShowCard(true)}>Show Card</Button>{" "}
      {showCard && (
        <Card>
          {" "}
          <form>
            <label htmlFor="amount">
              <b>How much would you like to add?</b>
            </label>
            <div className="input-container">
              <span className="dollar-sign">$</span>
              <input type="number" id="amount" name="amount" />
            </div>
            <button id="confirm-button" type="submit">
              Confirm
            </button>
          </form>
        </Card>
      )}
    </main>
  );
}
