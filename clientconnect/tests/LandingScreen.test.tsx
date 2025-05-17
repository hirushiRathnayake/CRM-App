import React from 'react';
import { render } from '@testing-library/react-native';
import { jest } from '@jest/globals';
import LandingScreen from '../app/(landingPage)/landingPage';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('LandingScreen', () => {
  it('renders the welcome text', () => {
    const { getByText } = render(<LandingScreen />);
    expect(getByText('Welcome to ClientConnect')).toBeTruthy();
  });
});
