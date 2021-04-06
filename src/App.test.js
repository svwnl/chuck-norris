import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Chuck', () => {
  render(<App />);
  const linkElement = screen.getByText(/Chuck/i);
  expect(linkElement).toBeInTheDocument();
});
