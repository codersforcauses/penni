import Image from "next/image"; // Use more efficient image tag
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Contents of a slide
interface Slide {
  title: string;
  img: string;
}

interface OnBoardingProps {
  followingContent: React.ReactNode; // Content to follow onboarding carousel
  slides: Slide[]; // Slides used for onboarding to be passed as a prop
}

/**
 * The on-boarding component that creates a carousel using slides.
 *
 * @param props - The properties for the OnBoarding component.
 * @param props.slides - The slides used to make the carousel for on-boarding.
 * @param props.followingContent - The content following the onboarding carousel. (After they are skipped or completed)
 * @returns The onboarding component
 *
 * @example
 * // Example Usage:
 * const slides = [
 *  {
 *    title: "Penni jobs for some extra cash",
 *    img: "/img/OnBoarding/carousel-1.svg",
 *  },
 *  {
 *    title: "Give back to someone who has given a lot",
 *    img: "/img/OnBoarding/carousel-2.svg",
 *  },
 *   title: "Extra spare time with the loves ones",
 *   img: "/img/OnBoarding/carousel-3.svg",
 *  }
 * ];
 * <OnBoarding followingContent={<Ping />} slides={slides}
 */
export default function OnBoarding({
  followingContent,
  slides,
}: OnBoardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOnBoarding, setShowOnBoarding] = useState(true);
  const [api, setApi] = useState<CarouselApi | undefined>(undefined); // Allow no state when initialised

  useEffect(() => {
    if (!api) return;

    // Move current slide with transition
    const updateCurrentSlide = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    setCurrentSlide(api.selectedScrollSnap());
    api.on("select", updateCurrentSlide);

    return () => {
      api.off("select", updateCurrentSlide);
    };
  }, [api]);

  // Skip onboarding carousel
  const handleSkip = () => {
    setShowOnBoarding(false);
  };

  // Move to next slide or finish if on last slide
  const handleNext = () => {
    if (api) {
      if (currentSlide < slides.length - 1) {
        api.scrollNext();
      } else {
        handleSkip();
      }
    }
  };

  // Move to previous slide if not at first slide (....not used in design)
  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return showOnBoarding ? (
    <div id="onboarding" className="flex min-h-screen flex-col items-center">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col items-center justify-center">
                <div className="relative -mt-4 ml-1 h-[82vh] w-full">
                  <Image
                    src={slide.img}
                    alt="" // No alt as title handles that
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className="title1 -mt-[0.7vh] ml-1 max-w-[39vh] text-center text-penni-text-regular-light-mode">
                  {slide.title}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div
        id="onboarding-controls"
        className="bg-light-mode flex h-full flex-col items-center justify-center"
      >
        <div className="mt-[4vh] flex w-screen max-w-[50vh] items-center justify-between pl-[2.5vh] pr-[2.5vh]">
          <Button
            onClick={handleSkip}
            className="headline hover:bg-light-mode text-penni-grey-inactive hover:text-penni-main"
            variant="ghost"
          >
            Skip
          </Button>
          <div className="flex items-center space-x-1.5">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-[0.6rem] w-[0.6rem] rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-[1.1rem] rounded-full bg-penni-main"
                    : "bg-penni-grey-border-light-mode"
                }`}
              />
            ))}
          </div>
          <Button
            onClick={handleNext}
            className="headline text-penni-main hover:bg-background hover:text-penni-text-regular-light-mode"
            variant="ghost"
          >
            {currentSlide === slides.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <>{followingContent}</> // Ensure following content is direct child of parent (completely remove onboarding related tags)
  );
}
