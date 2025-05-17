// __tests__/LandingScreen.test.tsx

import React from 'react';
import { render, act } from '@testing-library/react-native';
import LandingScreen from '../app/(landingPage)/landingPage'; // adjust path
import { Circle } from 'react-native-svg';
import { Image } from 'react-native';

// Mock react-native-reanimated hooks to simplify tests
jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock');
  Reanimated.useSharedValue = (initial: any) => ({ value: initial });
  Reanimated.useAnimatedStyle = (fn: (...args: any[]) => any) => fn();
  Reanimated.withTiming = jest.fn((value) => value);
  Reanimated.withRepeat = jest.fn((value) => value);
  Reanimated.withDelay = jest.fn((delay, value) => value);
  Reanimated.Easing = { inOut: () => {}, ease: {}, out: () => {}, exp: () => {} };
  return Reanimated;
});

// Mock expo-router's useRouter
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.useFakeTimers();

describe('LandingScreen', () => {
  it('renders correctly with stars and logo', () => {
    const { getByText, getAllByTestId, UNSAFE_getAllByType } = render(<LandingScreen />);

    // Check app name text
    expect(getByText('ClientConnect')).toBeTruthy();

    // Since Star returns Animated.View with Svg Circle,
    // we check number of Svg circles rendered
    const svgCircles = UNSAFE_getAllByType(Circle);
    expect(svgCircles.length).toBe(25);
    expect(svgCircles.length).toBe(25);

    // React Native Testing Library adds an accessibilityRole=image by default
    const images = UNSAFE_getAllByType(Image);
    expect(images.length).toBeGreaterThanOrEqual(1);
    expect(images.length).toBeGreaterThanOrEqual(1);
  });

  it('calls router.replace("/login") after 3 seconds', () => {
    render(<LandingScreen />);

    expect(mockReplace).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockReplace).toHaveBeenCalledWith('/login');
  });
});
