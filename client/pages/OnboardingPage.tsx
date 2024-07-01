import React, { useState } from "react";

function OnboardingBackground({ imgUrl }: { imgUrl: string }) {
  return <></>; // TODO
}

function Navigation() {
  return <></>; // TODO
}

export default function OnboardingPage() {
  const imageUrls: string[] = ["image.png", "image2.png", "image3.png"]; // TODO: Replace with actual URLS
  const contentTexts: string[] = [
    "Penni jobs for some extra cash",
    "Give back to someone who has given a lot",
    "Extra spare time with the loved ones",
  ];
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <OnboardingBackground imgUrl={imageUrls[currentPage]} />
      <h1>{contentTexts[currentPage]}</h1>
      <Navigation />
    </>
  );
}
