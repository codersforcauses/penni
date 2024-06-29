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

const OnBoarding: React.FC<OnBoardingProps> = ({
  followingContent,
  slides,
}) => {
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
    <div id="onboarding" className="flex h-screen flex-col">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col items-center justify-center">
                <div className="relative h-[78vh] w-full">
                  <Image
                    src={slide.img}
                    alt="" // No alt as title handles that
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className="max-w-[36vh] pt-6 text-center text-[1.62rem] font-[650] leading-[2.2rem] text-penni-dark">
                  {slides[currentSlide]?.title}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div
        id="onboarding-controls"
        className="flex grow-[1] flex-col items-center justify-center bg-background"
      >
        <div className="mt-[0.5rem] flex w-[100%] items-center justify-between pb-[2.5vh] pl-[2.5vh] pr-[2.5vh]">
          <Button
            onClick={handleSkip}
            className={
              "text-[0.95rem] font-[550] leading-[1.438rem] text-[#858D9C] hover:bg-background hover:text-penni-main"
            }
            variant="ghost" // Button variant
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
                    : "bg-[#F3F3F5]"
                }`}
              />
            ))}
          </div>
          <Button
            onClick={handleNext}
            className={
              "text-[0.95rem] font-[550] leading-[1.438rem] text-penni-main hover:bg-background hover:text-penni-dark"
            }
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
};

export default OnBoarding;
