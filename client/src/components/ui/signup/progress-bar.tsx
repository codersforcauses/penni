import React from "react";

type ProgressBarProps = {
  steps: number;
  currentStep: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div
      className="relative top-0 flex h-4 items-center justify-center rounded-xl"
      style={{ gap: "2px" }}
    >
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          style={{
            width: `calc(${100 / steps}% - ${(steps - 1) * 5}px / ${steps})`,
            backgroundColor: index < currentStep ? "penni-main" : "gray",
          }}
          className="h-full rounded-xl to-penni-main"
        ></div>
      ))}
    </div>
  );
};
