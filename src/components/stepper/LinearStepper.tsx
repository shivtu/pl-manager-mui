import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { StepContent, Grid, Typography } from '@mui/material';
import StyledTextField from '../text-field/StyledTextField';

export default function LinearStepper(props: {
  orientation: 'vertical' | 'horizontal';
  // TODO: Add types for steps
  steps: any[];
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [currentForm, setCurrentForm] = useState(props.steps[0]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    setCurrentForm(props.steps[activeStep]);
  }, [activeStep]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} orientation={props.orientation}>
        {props.steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
              {props.orientation === 'vertical' && (
                <StepContent>
                  {currentForm?.elements}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant='contained'
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === props.steps.length - 1
                          ? 'Finish'
                          : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              )}
            </Step>
          );
        })}
      </Stepper>

      {props.orientation === 'horizontal' && (
        <>
          {currentForm?.elements}

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
            <Button variant='contained' onClick={handleNext}>
              {activeStep === props.steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
