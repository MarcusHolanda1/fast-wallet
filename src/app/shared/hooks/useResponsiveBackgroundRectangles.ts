import { useWindowDimensions, StyleProp, ViewStyle } from 'react-native';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ResponsiveBackgroundRects {
  topStyle: StyleProp<ViewStyle>;
  bottomStyle: StyleProp<ViewStyle>;
}

export interface UseResponsiveBackgroundRectanglesOptions {
  designWidth?: number;
  designHeight?: number;
  rectBaseWidth?: number;
  rectBaseHeight?: number;
  rotationOvershoot?: number;
  topVerticalFactor?: number;
  topHorizontalFactor?: number;
  bottomVerticalFactor?: number;
  bottomHorizontalFactor?: number;
  borderRadius?: number;
}

export default function useResponsiveBackgroundRectangles({
  designWidth = 390,
  designHeight = 844,
  rectBaseWidth = 300,
  rectBaseHeight = 800,
  rotationOvershoot = 1.12,
  topVerticalFactor = 0.76,
  topHorizontalFactor = 0.84,
  bottomVerticalFactor = 0.77,
  bottomHorizontalFactor = 0.95,
  borderRadius = 50
}: UseResponsiveBackgroundRectanglesOptions = {}): ResponsiveBackgroundRects {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const scaleW = width / designWidth;
  const scaleH = height / designHeight;
  const scale = (scaleW + scaleH) / 2;

  const widthRatio = rectBaseWidth / designWidth;
  const heightRatio = rectBaseHeight / designHeight;

  const rectWidth = width * widthRatio * rotationOvershoot;
  const rectHeight = height * heightRatio * rotationOvershoot;

  const topStyle: StyleProp<ViewStyle> = useMemo(() => {
    const common = {
      position: 'absolute' as const,
      width: rectWidth,
      height: rectHeight,
      borderBottomStartRadius: borderRadius * scale,
      borderBottomEndRadius: borderRadius * scale,
      zIndex: -1
    };

    const verticalOffset = -rectHeight * topVerticalFactor - insets.top * 0.25;
    const horizontalOffset = -rectWidth * topHorizontalFactor;
    return {
      ...common,
      top: verticalOffset,
      left: horizontalOffset,
      transform: [{ rotate: '-36deg' }]
    };
  }, [
    rectWidth,
    rectHeight,
    insets.top,
    scale,
    topVerticalFactor,
    topHorizontalFactor,
    borderRadius
  ]);

  const bottomStyle: StyleProp<ViewStyle> = useMemo(() => {
    const common = {
      position: 'absolute' as const,
      width: rectWidth,
      height: rectHeight,
      borderBottomStartRadius: borderRadius * scale,
      borderBottomEndRadius: borderRadius * scale,
      zIndex: -1
    };

    const topPos = height - rectHeight * (1 - (bottomVerticalFactor - 0.02));
    const leftPos = width - rectWidth * (1 - bottomHorizontalFactor);
    return {
      ...common,
      top: topPos,
      left: leftPos,
      transform: [{ rotate: '-220deg' }]
    };
  }, [
    rectWidth,
    rectHeight,
    height,
    width,
    scale,
    bottomVerticalFactor,
    bottomHorizontalFactor,
    borderRadius
  ]);

  return { topStyle, bottomStyle };
}
