import React, { useEffect,useState } from 'react';

import { Button } from "../ui/button";

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);

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
      const onboardingSeen = localStorage.getItem('onboardingSeen');
      if (onboardingSeen) {
          setShowOnboarding(false);
      }
  }, []);

  const handleSkip = () => {
      setShowOnboarding(false);
      localStorage.setItem('onboardingSeen', 'true');
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

  return (
      showOnboarding ? (
          <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-50">
              <Button
                onClick={handleSkip}
                className='absolute top-5 right-5 text-blue-600'  // Hide the button if its on the first slide
                variant='ghost'
              >
                Skip
              </Button>
              <div className="w-full max-w-md mx-auto">
                  <div className="text-center">
                      <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
                      <p className="mt-2 text-lg">{slides[currentSlide].description}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                      <Button 
                        onClick={handlePrev}
                        className={`text-blue-600 ${currentSlide === 0 ? 'invisible' : ''}`} // Hide the button if its on the first slide
                        variant='ghost'
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="text-blue-600"
                        variant='ghost'
                      >
                        {currentSlide === slides.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                  </div>
              </div>
          </div>
      ) : (
          '' // Main content is handled after <Onboarding /> tag
      )
  );
};

export default Onboarding;