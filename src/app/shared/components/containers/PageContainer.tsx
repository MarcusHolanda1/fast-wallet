import { theme } from '@app/shared/theme/theme';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface PageContainerProps {
  children: React.ReactNode;
  showTitle?: boolean;
}

const PageContainer = ({ children, showTitle = true }: PageContainerProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showTitle && <Text style={styles.title}>Wallet Test</Text>}
        {children}
      </View>
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
    fontWeight: 'regular',
    color: theme.colors.base.white,
    marginBottom: 30
  }
});

export default PageContainer;
