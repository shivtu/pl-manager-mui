import { Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LinearStepper from '../../../components/stepper/LinearStepper';
import { createCustomer } from '../../../services/http.services';
import { IAppState, ICustomer } from '../../../utils/types';
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

  const appState = useSelector((state: IAppState) => state);

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

  const [options, setOptions] = useState<ICustomer[]>([]);

  const [activeStep, setActiveStep] = useState(0);

  const addNewCustomer = async () => {
    const customer: ICustomer = {
      customerEmail: customerDetails.customerEmail,
      customerName: customerDetails.customerName,
      customerOrganization: customerDetails.customerOrganization,
      customerPhone: Number(customerDetails.customerPhone),
      customerAddress: customerDetails.customerAddress,
    };

    const newCustomer = await createCustomer(`${appState.token}`, customer);
  };

  const createEnquiry = async () => {
    console.log('>>>>', options.length);
    if (!options.length) await addNewCustomer();
  };

  const handleNext = async () => {
    const isLastStep = activeStep === steps.length - 1;
    if (isLastStep) await createEnquiry();
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
