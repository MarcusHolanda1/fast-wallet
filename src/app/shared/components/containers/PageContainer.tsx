import { theme } from '@app/shared/theme/theme';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundRectangle from '@app/modules/wallet/components/BackgroundRectangle';
import useResponsiveBackgroundRectangles from '@app/shared/hooks/useResponsiveBackgroundRectangles';

interface PageContainerProps {
  children: React.ReactNode;
  showTitle?: boolean;
  showBackgroundRectangle?: boolean;
}

const PageContainer = ({
  children,
  showTitle = true,
  showBackgroundRectangle = true
}: PageContainerProps) => {
  const { topStyle, bottomStyle } = useResponsiveBackgroundRectangles();
  return (
    <SafeAreaView style={styles.safeArea}>
      {showBackgroundRectangle && (
        <BackgroundRectangle style={topStyle} rotation="-34deg" />
      )}

      <View style={styles.container}>
        {showTitle && <Text style={styles.title}>Wallet Test</Text>}
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
