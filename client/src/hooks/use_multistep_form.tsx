import { ReactElement, useState } from "react";

export interface MultistepForm {
  stepIdx: number;
  step: ReactElement;
  steps: ReactElement[];
  isFirstStep: boolean;
  isLastStep: boolean;
  Continue: () => void;
  Back: () => void;
}

export function useMultistepForm(steps: ReactElement[]): MultistepForm {
  const [stepIdx, setStepIdx] = useState(0);

  function Continue() {
    // passing updater function is a more stable way than direct changing state value.
    // receive current state value as index.
    setStepIdx((index) => {
      if (index >= steps.length - 1) {
        return index;
      }
      return index + 1;
    });
  }

  function Back() {
    setStepIdx((index) => {
      if (index <= 0) {
        return index;
      }
      return index - 1;
    });
  }

  function Skip() {}
  const multistepFrom: MultistepForm = {
    stepIdx,
    step: steps[stepIdx],
    steps,
    isFirstStep: stepIdx === 0,
    isLastStep: stepIdx === steps.length - 1,
    Continue,
    Back,
  };
  return multistepFrom;
}
