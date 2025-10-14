import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  interpolate,
  interpolateColor,
  ReduceMotion,
  withSequence,
  withSpring,
  SharedValue
} from 'react-native-reanimated';
import { theme } from '@app/shared/theme/theme';
import WalletSvg from '@assets/svgs/icons/wallet.svg';
import useResponsiveBackgroundRectangles from '@app/shared/hooks/useResponsiveBackgroundRectangles';

import BackgroundRectangle from './BackgroundRectangle';

const animationConfig = {
  designWidth: 390,
  designHeight: 844,
  rectBaseWidth: 349.21,
  rectBaseHeight: 800,
  rotationOvershoot: 1.12,
  topVerticalFactor: 0.6,
  topHorizontalFactor: Platform.select({ ios: 0.6, android: 0.58 })!,
  bottomVerticalFactor: Platform.select({ ios: 0.01, android: 0.06 })!,
  bottomHorizontalFactor: 0.45,
  borderRadius: 40,
  mergeTranslate: 140,
  progressRange: [0, 1],
  scaleRange: [1, 1.25],
  animateDuration: 500
};

const AnimatedWalletSvg = Animated.createAnimatedComponent(WalletSvg);

function useMergeAnimStyle(
  progress: SharedValue<number>,
  targetTranslateY: number,
  progressRange: number[],
  scaleRange: number[]
) {
  return useAnimatedStyle(() => {
    const p = progress.value;
    return {
      transform: [
        {
          translateY: interpolate(p, progressRange, [0, targetTranslateY])
        },
        {
          scale: interpolate(p, progressRange, scaleRange)
        }
      ]
    };
  }, [targetTranslateY]);
}

function useWalletAnimation() {
  const progress = useSharedValue<number>(0);
  const walletScale = useSharedValue<number>(1);
  const colorProgress = useSharedValue<number>(0);

  useEffect(() => {
    progress.value = withSequence(
      withSpring(
        1,
        {
          duration: animationConfig.animateDuration,
          dampingRatio: 0.33,
          overshootClamping: false,
          reduceMotion: ReduceMotion.System
        },
        (finished) => {
          if (finished) {
            walletScale.value = withSpring(1.8, {
              duration: 300,
              dampingRatio: 0.6,
              reduceMotion: ReduceMotion.System
            });

            colorProgress.value = withSpring(1.8, {
              duration: 300,
              dampingRatio: 0.6,
              reduceMotion: ReduceMotion.System
            });
          }
        }
      )
    );
  }, [progress, walletScale, colorProgress]);

  return { progress, walletScale, colorProgress };
}

export default function WalletLoading(): React.JSX.Element {
  const { progress, walletScale, colorProgress } = useWalletAnimation();

  const { topStyle, bottomStyle } = useResponsiveBackgroundRectangles({
    designWidth: animationConfig.designWidth,
    designHeight: animationConfig.designHeight,
    rectBaseWidth: animationConfig.rectBaseWidth,
    rectBaseHeight: animationConfig.rectBaseHeight,
    rotationOvershoot: animationConfig.rotationOvershoot,
    topVerticalFactor: animationConfig.topVerticalFactor,
    topHorizontalFactor: animationConfig.topHorizontalFactor,
    bottomVerticalFactor: animationConfig.bottomVerticalFactor,
    bottomHorizontalFactor: animationConfig.bottomHorizontalFactor,
    borderRadius: animationConfig.borderRadius
  });

  const topAnimStyle = useMergeAnimStyle(
    progress,
    animationConfig.mergeTranslate,
    animationConfig.progressRange,
    animationConfig.scaleRange
  );
  const bottomAnimStyle = useMergeAnimStyle(
    progress,
    -animationConfig.mergeTranslate,
    animationConfig.progressRange,
    animationConfig.scaleRange
  );

  const walletAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: walletScale.value }]
  }));

  const animatedProps = useAnimatedProps(() => ({
    color: interpolateColor(
      colorProgress.value,
      [0, 1],
      [theme.colors.base.blueLight, theme.colors.base.greenLight]
    )
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.topStyle, topAnimStyle]}>
        <BackgroundRectangle rotation="-36deg" style={topStyle} />
      </Animated.View>
      <Animated.View style={walletAnimStyle}>
        <AnimatedWalletSvg animatedProps={animatedProps} />
      </Animated.View>
      <Animated.View style={[styles.bottomStyle, bottomAnimStyle]}>
        <BackgroundRectangle rotation="-218deg" style={bottomStyle} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.base.blueDark,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topStyle: {
    position: 'absolute',
    top: -40,
    left: -70,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  bottomStyle: {
    position: 'absolute',
    top: 700,
    left: 138,
    right: 0,
    bottom: 0,
    zIndex: -1
  }
});
