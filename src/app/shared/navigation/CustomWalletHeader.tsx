import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBackSvg from '@assets/svgs/icons/go-back.svg';
import AddSvg from '@assets/svgs/icons/add-rounded.svg';

import { theme } from '../theme/theme';

export const CustomWalletHeader = ({
  navigation,
  canGoBack,
  onPlusPress
}: {
  title: string;
  navigation: NavigationProp<ParamListBase>;
  canGoBack: boolean;
  onPlusPress?: () => void;
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {canGoBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <GoBackSvg />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Fast Wallet</Text>
        <TouchableOpacity onPress={onPlusPress} style={styles.plusButton}>
          <AddSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.walletHeader}>
        <Text style={styles.myWalletText}>Meus cartões</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.base.blueDark
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 21,
    backgroundColor: theme.colors.base.white,
    shadowColor: theme.colors.base.blueDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 10,
    marginBottom: 0.1
  },
  backButton: {
    padding: 8
  },
  backText: {
    ...theme.typography.h3,
    color: theme.colors.base.blueLight
  },
  headerTitle: {
    ...theme.typography.h3,
    color: theme.colors.base.blueDark
  },
  plusButton: {
    padding: 8,
    width: 40,
    alignItems: 'center'
  },
  plusText: {
    ...theme.typography.h3,
    color: theme.colors.base.blueLight,
    fontSize: 24
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
