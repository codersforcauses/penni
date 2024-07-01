import { Inter as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

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

  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center gap-4 p-24 font-sans",
        fontSans.variable,
      )}
    >
      <h1 className="largetitle text-primary">Largetitle</h1>
      <h1 className="title1 text-primary">Title1</h1>
      <h2 className="title2 text-primary">Title2</h2>
      <h3 className="title3 text-primary">Title3</h3>
      <h3 className="headline text-primary">Headline</h3>
      <body className="body text-primary">Body</body>
      <p className="callout text-primary">Callout</p>
      <h3 className="subheadline-medium text-primary">Subheadline - Medium</h3>
      <h3 className="subheadline text-primary">Subheadline</h3>
      <p className="footnote text-primary">Footnote</p>
      <p className="caption-semibold text-primary">Caption - Semibold</p>
      <p className="caption text-primary">Caption</p>
      <p className="navigationlabel text-primary">Navigation Label</p>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
    </main>
  );
}
