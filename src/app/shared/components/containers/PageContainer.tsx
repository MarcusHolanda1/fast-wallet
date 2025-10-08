import { theme } from '@app/shared/theme/theme';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundRectangle from '@app/modules/wallet/components/BackgroundRectangle';
import useResponsiveBackgroundRectangles from '@app/shared/hooks/useResponsiveBackgroundRectangles';
import Animated from 'react-native-reanimated';
import React from 'react';
import useSpringTranslateY from '@app/shared/hooks/useSpringTranslateY';

interface PageContainerProps {
  children: React.ReactNode;
  showTitle?: boolean;
  showBackgroundRectangle?: boolean;
}
const TITLE_MOVE_DISTANCE = 200;
const TITLE_DURATION = 1000;

const PageContainer = ({
  children,
  showTitle = true,
  showBackgroundRectangle = true
}: PageContainerProps) => {
  const { topStyle, bottomStyle } = useResponsiveBackgroundRectangles();

  const animatedTitleStyle = useSpringTranslateY(
    TITLE_MOVE_DISTANCE,
    TITLE_DURATION
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {showBackgroundRectangle && (
        <BackgroundRectangle style={topStyle} rotation="-34deg" />
      )}

      <View style={styles.container}>
        {showTitle && (
          <Animated.Text
            style={[styles.title, animatedTitleStyle]}
            accessibilityRole="header"
          >
            Fast Wallet
          </Animated.Text>
        )}
        {children}
      </View>
      {showBackgroundRectangle && (
        <BackgroundRectangle style={bottomStyle} rotation="-220deg" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.base.blueDark
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.base.white,
    marginBottom: 30
  }
});

export default PageContainer;
