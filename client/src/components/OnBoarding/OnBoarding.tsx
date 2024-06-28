import Image from "next/image"; // Use more efficient image tag
import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";

interface OnBoardingProps {
  followingContent: React.ReactNode;
}

const OnBoarding: React.FC<OnBoardingProps> = ({ followingContent }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOnBoarding, setShowOnBoarding] = useState(true);

  const slides = [
    {
      title: "Penni jobs for some extra cash",
      description: "",
      img: "/img/OnBoarding/carousel-1.svg",
    },
    {
      title: "Give back to someone who has given a lot",
      description: "",
      img: "/img/OnBoarding/carousel-2.svg",
    },
    {
      title: "Extra spare time with the loves ones",
      description: "",
      img: "/img/OnBoarding/carousel-3.svg",
    },
  ];

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
        className="flex h-[18vh] flex-grow flex-col items-center justify-center bg-white"
      >
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
          {/* <p className="mt-2 text-lg">{slides[currentSlide].description}</p>   ....Unused...*/}
        </div>
        <div className="mt-3 flex w-full justify-between px-4">
          <Button
            onClick={handleSkip}
            className={`text-blue-600`}
            variant="ghost"
          >
            Skip
          </Button>
          <Button
            onClick={handleNext}
            className="text-blue-600"
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
