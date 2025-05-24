import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to Academic Program Matching Platform/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders Hebrew title', () => {
  render(<App />);
  const hebrewTitle = screen.getByText(/ברוך הבא לפלטפורמת התאמת התוכניות האקדמיות/i);
  expect(hebrewTitle).toBeInTheDocument();
});

test('renders setup status indicators', () => {
  render(<App />);
  const reactSetup = screen.getByText(/React \+ TypeScript Setup Complete/i);
  const tailwindSetup = screen.getByText(/Tailwind CSS Configured/i);
  const readyStatus = screen.getByText(/Ready for Implementation/i);
  
  expect(reactSetup).toBeInTheDocument();
  expect(tailwindSetup).toBeInTheDocument();
  expect(readyStatus).toBeInTheDocument();
});
