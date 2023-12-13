"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@/components/ui/button";
import Typography from "@mui/material/Typography";

type ActionButton = {
  title: string;
  isActivate: boolean;
  action: () => void;
};

type Step = {
  stepNum: number;
  title: string;
  description: string;
  content: React.ReactNode;
  isOptional: boolean;
  onSubmit: () => void | boolean;
  isNextActivated: boolean;
  additionalActions?: ActionButton[];
};

type StepModalProps = {
  steps: Step[];
};

const DummyComponent = () => {
  return <div>placeholder</div>;
};

const StepperComponent: React.FC<StepModalProps> = ({
  steps = [
    {
      stepNum: 1,
      title: "just for test",
      description: "idk...",
      isOptional: true,
      content: <DummyComponent />,
      onSubmit: () => {},
      isNextActivated: true,
    },
  ],
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const firstStep: Step = steps[0];
  const [step, setStep] = useState<Step>(firstStep);

  useEffect(() => {
    const newStep = steps.find((step) => step.stepNum === activeStep);
    if (!newStep) {
      console.log("There is no step for this Id!");
      setActiveStep(step.stepNum);
      return;
    }
    setStep(newStep);
  }, [activeStep]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (skipped.has(step.stepNum)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleFinish = () => {
    // resetting states
    setActiveStep(0);
    setSkipped(new Set<number>());
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!step.isOptional) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <Stepper sx={{ width: "100%" }} activeStep={activeStep}>
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (step.isOptional) {
            labelProps.optional = (
              <Typography variant="caption">(اختیاری)</Typography>
            );
          }
          if (skipped.has(step.stepNum)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.stepNum} {...stepProps}>
              <StepLabel {...labelProps}>{step.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="w-full h-full mt-4">
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <div className="flex flex-col justify-between h-full">
            {step.content}
            <div className="flex flex-row justify-between items-center">
              <Button
                color="inherit"
                onClick={activeStep === 0 ? handleFinish : handleBack}
              >
                {activeStep === 0 ? "لغو" : "بازگشت"}
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {step.isOptional && (
                <Button color="inherit" onClick={handleSkip}>
                  رد
                </Button>
              )}
              <div className="flex flex-row justify-center items-center gap-2">
                {step.additionalActions?.map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.action}
                    disabled={!action.isActivate}
                  >
                    {action.title}
                  </Button>
                ))}
                <Button
                  disabled={!step.isNextActivated}
                  onClick={async () => {
                    try {
                      const result = step.onSubmit();
                      await result;
                      console.log("hey");
                      console.log(result);
                      console.log(result);
                      if (activeStep === steps.length - 1) {
                        handleFinish();
                      } else {
                        handleNext();
                        // TODO: fixe this bug. it should not go to the next page if the form had an error.
                      }
                    } catch (error) {
                      console.log("error: ", error);
                      handleBack();
                    }
                  }}
                >
                  {activeStep === steps.length - 1 ? "پایان" : "بعدی"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepperComponent;
