import Image from "next/image"; // Use more efficient image tag
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Slide {
  title: string;
  img: string;
}

interface OnBoardingProps {
  followingContent: React.ReactNode;
  slides: Slide[];
}

const OnBoarding: React.FC<OnBoardingProps> = ({
  followingContent,
  slides,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOnBoarding, setShowOnBoarding] = useState(true);
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);

  useEffect(() => {
    if (!api) return;

    const updateCurrentSlide = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    setCurrentSlide(api.selectedScrollSnap());
    api.on("select", updateCurrentSlide);

    return () => {
      api.off("select", updateCurrentSlide);
    };
  }, [api]);

  const handleSkip = () => {
    setShowOnBoarding(false);
  };

  const handleNext = () => {
    if (api) {
      if (currentSlide < slides.length - 1) {
        api.scrollNext();
      } else {
        handleSkip();
      }
    }
  };

  const handlePrev = () => {
    // Unused... (not in design)
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
    <>{followingContent}</> // Ensure following content is direct child of parent
  );
};

export default OnBoarding;
