import { Typography } from '@mui/material';
import { useState } from 'react';
import LinearStepper from '../../../components/stepper/LinearStepper';
import { ICustomer } from '../../../utils/types';
import CustomerDetails from './CustomerDetails';
import CustomerRequirements from './CustomerRequirements';

const NewEnquiryPage = () => {
  const steps = [
    {
      stepperLabel: 'customer details',
    },
    {
      stepperLabel: 'customer requirements',
    },
  ];

  const [customerDetails, setCustomerDetails] = useState({
    customerName: '',
    customerOrganization: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
  });

  const [customerRequirements, setCustomerRequirements] = useState({
    shortDescription: '',
    description: '',
  });

  const [options, setOptions] = useState<ICustomer[]>([
    {
      _id: '',
      customerName: '',
      customerPhone: undefined,
      customerEmail: '',
      customerAddress: '',
      customerOrganization: '',
      projects: [],
      createdAt: undefined,
    },
  ]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    const isLastStep = activeStep === steps.length - 1;
    if (isLastStep) console.log('>>', customerDetails, customerRequirements);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {};

  const currentStepContent = (step: number): JSX.Element => {
    switch (step) {
      case 0:
        return (
          <CustomerDetails
            customerDetails={customerDetails}
            setCustomerDetails={setCustomerDetails}
            options={options}
            setOptions={setOptions}
          />
        );
      case 1:
        return (
          <CustomerRequirements
            customerRequirements={customerRequirements}
            setCustomerRequirements={setCustomerRequirements}
          />
        );
      default:
        return <Typography>No content available here</Typography>;
    }
  };

  return (
    <LinearStepper
      steps={steps}
      handleNext={handleNext}
      handleBack={handleBack}
      handleReset={handleReset}
      activeStep={activeStep}
      currentStepContent={currentStepContent(activeStep)}
    />
  );
};

export default NewEnquiryPage;
