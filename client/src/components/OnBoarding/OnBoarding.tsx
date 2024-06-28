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
      img: "../../../public/img/OnBoarding/carousel-1.svg",
    },
    {
      title: "Give back to someone who has given a lot",
      description: "",
      img: "../../../public/img/OnBoarding/carousel-2.svg",
    },
    {
      title: "Extra spare time with the loves ones",
      description: "",
      img: "../../../public/img/OnBoarding/carousel-3.svg",
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
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return showOnBoarding ? (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-white">
      <Button
        onClick={handleSkip}
        className="absolute right-5 top-5 text-blue-600" // Hide the button if its on the first slide
        variant="ghost"
      >
        Skip
      </Button>
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
          <p className="mt-2 text-lg">{slides[currentSlide].description}</p>
        </div>
        <div className="mt-4 flex justify-between">
          <Button
            onClick={handlePrev}
            className={`text-blue-600 ${currentSlide === 0 ? "invisible" : ""}`} // Hide the button if its on the first slide
            variant="ghost"
          >
            Previous
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
    followingContent
  );
};

export default OnBoarding;
