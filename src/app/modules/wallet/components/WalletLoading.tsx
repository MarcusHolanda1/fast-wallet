import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  ReduceMotion,
  withSequence,
  withSpring,
  SharedValue
} from 'react-native-reanimated';
import { theme } from '@app/shared/theme/theme';
import WalletSvg from '@assets/svgs/icons/wallet.svg';
import useResponsiveBackgroundRectangles from '@app/shared/hooks/useResponsiveBackgroundRectangles';
import type { StyleProp, ViewStyle } from 'react-native';

import BackgroundRectangle from './BackgroundRectangle';

const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;
const RECT_BASE_WIDTH = 349.21;
const RECT_BASE_HEIGHT = 800;
const ANIMATE_DURATION = 500;

const ROTATION_OVERSHOOT = 1.12;

const TOP_VERTICAL_FACTOR = 0.6;
const TOP_HORIZONTAL_FACTOR = Platform.select({
  ios: 0.6,
  android: 0.58
})!;
const BOTTOM_VERTICAL_FACTOR = Platform.select({
  ios: 0.01,
  android: 0.06
})!;
const BOTTOM_HORIZONTAL_FACTOR = 0.45;

interface BackgroundRectStyles {
  topStyle: StyleProp<ViewStyle>;
  bottomStyle: StyleProp<ViewStyle>;
}

export default function WalletLoading(): React.JSX.Element {
  const progress = useSharedValue<number>(0);
  const walletScale = useSharedValue<number>(1);
  const { topStyle, bottomStyle }: BackgroundRectStyles =
    useResponsiveBackgroundRectangles({
      designWidth: DESIGN_WIDTH,
      designHeight: DESIGN_HEIGHT,
      rectBaseWidth: RECT_BASE_WIDTH,
      rectBaseHeight: RECT_BASE_HEIGHT,
      rotationOvershoot: ROTATION_OVERSHOOT,
      topVerticalFactor: TOP_VERTICAL_FACTOR,
      topHorizontalFactor: TOP_HORIZONTAL_FACTOR,
      bottomVerticalFactor: BOTTOM_VERTICAL_FACTOR,
      bottomHorizontalFactor: BOTTOM_HORIZONTAL_FACTOR,
      borderRadius: 40
    });

  const MERGE_TRANSLATE = 140;
  const PROGRESS_RANGE = [0, 1];
  const SCALE_RANGE = [1, 1.25];

  function useMergeAnimStyle(
    progress: SharedValue<number>,
    targetTranslateY: number
  ) {
    return useAnimatedStyle(() => {
      const p = progress.value;
      return {
        transform: [
          {
            translateY: interpolate(p, PROGRESS_RANGE, [0, targetTranslateY])
          },
          {
            scale: interpolate(p, PROGRESS_RANGE, SCALE_RANGE)
          }
        ]
      };
    }, [targetTranslateY]);
  }

  const walletAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: walletScale.value
        }
      ]
    };
  });

  useEffect(() => {
    progress.value = withSequence(
      withSpring(
        1,
        {
          duration: ANIMATE_DURATION,
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
          }
        }
      )
    );
  }, [progress, walletScale]);

  const topAnimStyle = useMergeAnimStyle(progress, MERGE_TRANSLATE);
  const bottomAnimStyle = useMergeAnimStyle(progress, -MERGE_TRANSLATE);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.topStyle, topAnimStyle]}>
        <BackgroundRectangle rotation="-36deg" style={topStyle} />
      </Animated.View>
      <Animated.View style={walletAnimStyle}>
        <WalletSvg />
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
