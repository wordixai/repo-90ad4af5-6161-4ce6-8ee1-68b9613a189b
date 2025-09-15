import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface AnimationConfig {
  easeInOut: (input: number, inputRange: [number, number], outputRange: [number, number]) => number;
  easeOut: (input: number, inputRange: [number, number], outputRange: [number, number]) => number;
  easeIn: (input: number, inputRange: [number, number], outputRange: [number, number]) => number;
  bounce: (input: number, inputRange: [number, number], outputRange: [number, number]) => number;
}

export const useAnimationConfig = (): AnimationConfig => {
  return {
    easeInOut: (input, inputRange, outputRange) =>
      interpolate(input, inputRange, outputRange, {
        easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      }),
    
    easeOut: (input, inputRange, outputRange) =>
      interpolate(input, inputRange, outputRange, {
        easing: (t) => 1 - Math.pow(1 - t, 3),
      }),
    
    easeIn: (input, inputRange, outputRange) =>
      interpolate(input, inputRange, outputRange, {
        easing: (t) => t * t * t,
      }),
    
    bounce: (input, inputRange, outputRange) =>
      interpolate(input, inputRange, outputRange, {
        easing: (t) => {
          const n1 = 7.5625;
          const d1 = 2.75;
          
          if (t < 1 / d1) {
            return n1 * t * t;
          } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
          } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
          } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
          }
        },
      }),
  };
};