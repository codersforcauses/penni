import { AlignCenter, Bold } from "lucide-react";
import Image from "next/image"; // Use more efficient image tag
import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";

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

  useEffect(() => {
    const seenOnBoarding = localStorage.getItem("seenOnBoarding");
    if (seenOnBoarding) {
      setShowOnBoarding(false);
    }
  }, []);

  const handleSkip = () => {
    setShowOnBoarding(false);
    localStorage.setItem("seenOnBoarding", "true");
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleSkip();
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
      <div className="relative h-[82vh] w-full flex-grow-0">
        <Image
          src={slides[currentSlide].img}
          alt="" // Dont need alt as title covers it.
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        id="onboarding-controls"
        className="flex flex-col grow-[1] justify-center items-center h-[25vh] bg-background"
      >
        <div
        className="flex pl-[5.788vh] pr-[5.788vh] pb-[3.5vh] pt-[1vh] text-center"
        >
          <p
            className="text-penni-dark text-[1.62rem] leading-[2.2rem] font-[650] max-w-[36vh]"
          >
            {slides[currentSlide].title}
          </p>
        </div>
        <div
          className="flex mt-[0.5rem] w-[100%] items-center justify-between pl-[2.5vh] pr-[2.5vh] pb-[2.5vh]"
        >
          <Button
            onClick={handleSkip}
            className={"text-penni-main text-[0.95rem] leading-[1.438rem] font-[550]"}
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
            className={"text-penni-main text-[0.95rem] leading-[1.438rem] font-[550]"}
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
