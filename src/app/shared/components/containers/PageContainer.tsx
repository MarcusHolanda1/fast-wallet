import { theme } from '@app/shared/theme/theme';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BackgroundTopAppSvg from '@assets/svgs/background-top-app.svg';
import BackgroundBottomAppSvg from '@assets/svgs/background-bottom-app.svg';

interface PageContainerProps {
  children: React.ReactNode;
  showTitle?: boolean;
  showWalletHeader?: boolean;
}

const PageContainer = ({
  children,
  showTitle = true,
  showWalletHeader = false
}: PageContainerProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <BackgroundTopAppSvg style={styles.backgroundTopSvg} />

      {showWalletHeader && (
        <View style={styles.walletHeader}>
          <Text style={styles.myWalletText}>Meus cartões</Text>
        </View>
      )}

      <View style={styles.container}>
        {showTitle && <Text style={styles.title}>Wallet Test</Text>}
        {children}
      </View>
      <BackgroundBottomAppSvg style={styles.backgroundBottomSvg} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.base.blueDark
  },
  backgroundTopSvg: {
    position: 'absolute',
    top: -172,
    left: -129,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  backgroundBottomSvg: {
    position: 'absolute',
    top: 630,
    left: 130,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
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
  },
  walletHeader: {
    height: 66,
    backgroundColor: theme.colors.base.white,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  myWalletText: {
    ...theme.typography.h4,
    color: theme.colors.base.blueLight
  }
});

export default PageContainer;
