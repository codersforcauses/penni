import { Inter as FontSans } from "next/font/google";
import { useEffect, useState } from "react";

import OnBoarding from "@/components/on-boarding";
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
  const [opacity, setOpacity] = useState(0);
  const [mainContentOpacity, setMainContentOpacity] = useState(0);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  useEffect(() => {
    let fadeOutInterval: NodeJS.Timeout;
    let fadeInMainContentInterval: NodeJS.Timeout;

    // Fade in effect for splash screen
    const fadeInInterval = setInterval(() => {
      setOpacity((prev) => {
        const nextOpacity = prev + 0.025;
        if (nextOpacity >= 1) {
          clearInterval(fadeInInterval);
          // After fade in, fade out splash screen after showing
          setTimeout(() => {
            fadeOutInterval = setInterval(() => {
              setOpacity((prev) => {
                const nextOpacity = prev - 0.025;
                if (nextOpacity <= 0) {
                  clearInterval(fadeOutInterval);
                  setShowSplash(false);
                  // Start fading in main content when splash screen fades out
                  fadeInMainContentInterval = setInterval(() => {
                    setMainContentOpacity((prev) => {
                      const nextOpacity = prev + 0.025;
                      if (nextOpacity >= 1) {
                        clearInterval(fadeInMainContentInterval);
                        return 1;
                      }
                      return nextOpacity;
                    });
                  }, 40);
                  return 0;
                }
                return nextOpacity;
              });
            }, 40);
          }, 1500);
          return 1;
        }
        return nextOpacity;
      });
    }, 40);

    // Clean up intervals
    return () => {
      clearInterval(fadeInInterval);
      if (fadeOutInterval) {
        clearInterval(fadeOutInterval);
      }
      if (fadeInMainContentInterval) {
        clearInterval(fadeInMainContentInterval);
      }
    };
  }, []);

  if (showSplash) {
    return (
      <div style={{ opacity }}>
        <SplashScreen />
      </div>
    );
  }

  //when you do the replace for this main page, please be careful about the FADE IN effect here
  return (
    <main
      style={{ opacity: mainContentOpacity }} // Apply dynamic opacity to main content
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
      <br />
      <h1> HELLO </h1>
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
