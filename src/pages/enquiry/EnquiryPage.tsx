import LinearStepper from '../../components/stepper/LinearStepper';
import CustomerDetails from './CustomerDetails';
import CustomerRequirements from './CustomerRequirements';

const EnquiryPage = () => {
  const steps = [
    {
      stepperLabel: 'customer details',
      stepperContent: <CustomerDetails />,
    },
    {
      stepperLabel: 'requirement details',
      stepperContent: <CustomerRequirements />,
    },
  ];

  return <LinearStepper steps={steps} />;
};

export default EnquiryPage;
