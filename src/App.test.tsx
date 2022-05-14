import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const title = screen.getByText('Magnum Engineers');
  const emailPlaceHolder = screen.getByText('Magnum Engineers');
  const passwordPlaceholder = screen.getByText('Magnum Engineers');
  const firstLoginLink = screen.getByText('Magnum Engineers');
  expect(title).toBeInTheDocument();
  expect(emailPlaceHolder).toBeInTheDocument();
  expect(passwordPlaceholder).toBeInTheDocument();
  expect(firstLoginLink).toBeInTheDocument();
});
