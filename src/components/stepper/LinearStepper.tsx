import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useIsMobile from '../../hooks/useIsMobile';
import { Grid } from '@mui/material';

interface ILenearStepperProps {
  steps: { stepperLabel: string }[];
  disableStepperBtn?: boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  activeStep: number;
  currentStepContent: JSX.Element;
}

export default function LinearStepper({
  steps,
  disableStepperBtn,
  handleNext,
  handleBack,
  handleReset,
  activeStep,
  currentStepContent,
}: ILenearStepperProps) {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{ width: '100%' }}
      style={{ display: isMobile ? 'flex' : 'block' }}
    >
      <Grid>
        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? 'vertical' : 'horizontal'}
        >
          {steps.map((eachStep, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={eachStep.stepperLabel} {...stepProps}>
                <StepLabel {...labelProps}>{eachStep.stepperLabel}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      <Grid>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <>{currentStepContent}</>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button
                onClick={handleNext}
                disabled={disableStepperBtn ? disableStepperBtn : false}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Grid>
    </Box>
  );
}
