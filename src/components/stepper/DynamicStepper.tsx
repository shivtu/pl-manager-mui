import { FocusEventHandler, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Grid, Button } from '@mui/material';
import StyledTextField from '../text-field/StyledTextField';
import { IFormField, IStepperForms } from '../../utils/types';

const DynamicStepper = ({
  stepperForms,
  orientation,
  formTitle,
}: {
  stepperForms: IStepperForms;
  orientation: 'vertical' | 'horizontal';
  formTitle: string;
}) => {
  const [inputFields, setInputFields] = useState<{ [key: string]: string }>({});
  const [activeStep, setActiveStep] = useState(0);
  const stepperFormElements = stepperForms.elements;

  const handleSubmit = () => {
    // Make the API call here
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === stepperFormElements.length - 1) {
      stepperForms.actionOnSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOnBlurEvent = async (
    onBlurAction: {
      isPromise: boolean;
      action: any;
    },
    name: string
  ) => {
    if (onBlurAction?.isPromise && inputFields[name]) {
      console.log('>>><<<', typeof onBlurAction.action);
      const result = await onBlurAction.action();
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* <Typography variant='h6'>{formTitle}</Typography> */}
      <Stepper
        activeStep={activeStep}
        orientation={orientation}
        sx={{ marginBottom: 5 }}
      >
        {stepperFormElements.map((steps: any) => {
          return (
            <Step key={steps.stepperLabel}>
              <StepLabel>{steps.stepperLabel}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Grid container spacing={2} style={{ marginLeft: 8 }}>
        {stepperFormElements[activeStep]?.formFields.map(
          (eachFormField: IFormField) => {
            return (
              <Grid item key={eachFormField.name}>
                {eachFormField.type === 'textInput' && (
                  <StyledTextField
                    label={eachFormField.label || ''}
                    name={eachFormField.name}
                    helperText={eachFormField.helperText}
                    onChange={eachFormField.onChange}
                    onBlur={() =>
                      eachFormField.actionOnBlur &&
                      handleOnBlurEvent(
                        eachFormField.actionOnBlur,
                        eachFormField.name
                      )
                    }
                  />
                )}
              </Grid>
            );
          }
        )}
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
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
          variant='contained'
          onClick={handleNext}
          sx={{
            display:
              activeStep === stepperFormElements.length ? 'none' : 'inline',
          }}
        >
          {activeStep === stepperFormElements.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};
export default DynamicStepper;
