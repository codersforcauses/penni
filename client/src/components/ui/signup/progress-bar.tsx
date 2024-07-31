import React from "react";

type ProgressBarProps = {
  steps: number;
  currentStep: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
}) => {
  const stepWidth = `calc(100% / ${steps} - ${(steps - 1) * 2}px / ${steps})`;

  return (
    <div className="relative flex h-[8px] items-center justify-center rounded-xl">
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`h-full rounded-xl ${index < currentStep ? "bg-penni-main" : "bg-penni-grey-progressbar"}`}
          style={{ width: stepWidth }}
        />
      ))}
    </div>
  );
};
