import { Inter as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"; // Adjust the import to match your structure
import Card from "@/components/ui/card"; // Adjusted the path
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
  const [showCard, setShowCard] = useState(false); // Added this line
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
      <Button onClick={() => setShowCard(true)}>Show Card</Button>{" "}
      {/* Added this line */}
      {showCard && ( // Added this line
        <Card>
          {" "}
          {/* Added this line */}
          <form>
            <label htmlFor="amount">How much would you like to add?</label>
            <input type="text" id="amount" name="amount" />
            <button type="submit">Confirm</button>
          </form>
        </Card>
      )}
    </main>
  );
}
