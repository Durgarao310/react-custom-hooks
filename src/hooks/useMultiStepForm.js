import { useState } from "react";

function useMultiStepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
  };

  const back = () => {
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
  };

  const goTo = (index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  };

  return {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    next,
    back,
    goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}

export default useMultiStepForm;
