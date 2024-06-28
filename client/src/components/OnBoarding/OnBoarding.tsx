import { AlignCenter, Bold } from "lucide-react";
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
        style={{
          display: "flow",
          height: "25vh",
          flexGrow: "1",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            paddingLeft: "5.788vh",
            paddingRight: "5.788vh",
            paddingBottom: "3.5vh",
            paddingTop: "1vh",
            textAlign: "center",
            display: "flex",
          }}
        >
          <p
            style={{
              color: "#081428",
              fontSize: "1.6rem",
              lineHeight: "2.125rem",
              fontWeight: 650,
              maxWidth: "36vh",
            }}
          >
            {slides[currentSlide].title}
          </p>
          {slides[currentSlide].description === "" ? (
            ""
          ) : (
            <p className="text-lg">{slides[currentSlide].description}</p>
          )}
        </div>
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "2.5vh",
            paddingRight: "2.5vh",
            paddingBottom: "2.5vh",
          }}
        >
          <Button
            onClick={handleSkip}
            style={{
              color: "#0051CA",
              fontSize: "0.95rem",
              lineHeight: "1.438rem",
              fontWeight: 550,
            }}
            variant="ghost"
          >
            Skip
          </Button>
          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-5 rounded-full bg-blue-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <Button
            onClick={handleNext}
            style={{
              color: "#0051CA",
              fontSize: "0.95rem",
              lineHeight: "1.438rem",
              fontWeight: 550,
            }}
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
