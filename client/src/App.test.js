import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the homepage', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Homepage/i);
  expect(titleElement).toBeInTheDocument();
});
