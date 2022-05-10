import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useIsMobile from '../../hooks/useIsMobile';
import { Grid } from '@mui/material';

export default function LinearStepper(props: {
  steps: { stepperLabel: string; stepperContent: JSX.Element }[];
}) {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = React.useState(0);
  const [currentStepContent, setCurrentStepContent] =
    React.useState<JSX.Element>(props.steps[0].stepperContent);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep < props.steps.length - 1) {
      setCurrentStepContent(props.steps[activeStep + 1].stepperContent);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentStepContent(props.steps[activeStep - 1].stepperContent);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCurrentStepContent(props.steps[0].stepperContent);
  };

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
          {props.steps.map((eachStep, index) => {
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
        {activeStep === props.steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>{currentStepContent}</Typography>
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

              <Button onClick={handleNext}>
                {activeStep === props.steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Grid>
    </Box>
  );
}
