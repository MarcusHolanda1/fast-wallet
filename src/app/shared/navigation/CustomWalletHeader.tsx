import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

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
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Fast Wallet</Text>
        <TouchableOpacity onPress={onPlusPress} style={styles.plusButton}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.base.white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 21,
    backgroundColor: theme.colors.base.white,
    shadowColor: theme.colors.base.blueDark,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1
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
  rightSpace: {
    width: 40
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
  }
});
