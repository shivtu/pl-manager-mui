import { fireEvent, render, screen } from '@testing-library/react';
import EnquiryPage from '../EnquiryPage';

describe('Enquiry page tests', () => {
  render(<EnquiryPage />);
  test('renders all labels and placeholders on initial render', () => {
    expect(screen.getByText('Customer name')).toBeVisible();
    expect(screen.getByText('Customer organization')).toBeVisible();
    expect(screen.getByText('Customer phone')).toBeVisible();
    expect(screen.getByText('Customer email')).toBeVisible();
    expect(screen.getByText('Customer address')).toBeVisible();
    expect(screen.getByText('customer details')).toBeVisible();
    expect(screen.getByText('requirement details')).toBeVisible();
    expect(screen.getByText('Back')).toBeDisabled();
    expect(screen.getByText('Next')).toBeVisible();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Back')).toBeEnabled();
    expect(
      screen.getByText('Short description of the requirements')
    ).toBeVisible();
    expect(screen.getByText('Submit')).toBeVisible();
  });
});
