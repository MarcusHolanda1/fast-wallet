import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  ReduceMotion
} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function useSpringTranslateY(
  moveDistance: number,
  duration: number
) {
  const translateY = useSharedValue(-moveDistance);

  useEffect(() => {
    translateY.value = withSpring(1, {
      duration,
      dampingRatio: 0.5,
      overshootClamping: true,
      reduceMotion: ReduceMotion.System
    });
  }, [translateY, duration, moveDistance]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));

  return animatedStyle;
}
