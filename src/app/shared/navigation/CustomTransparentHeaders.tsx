import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import GoBackSvg from '@assets/svgs/icons/go-back.svg';

import { theme } from '../theme/theme';

export const CustomTransparentHeader = ({
  title,
  navigation,
  canGoBack
}: {
  title: string;
  navigation: NavigationProp<ParamListBase>;
  canGoBack: boolean;
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
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.rightSpace} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    zIndex: 10
  },
  backButton: {
    padding: 8
  },
  headerTitle: {
    ...theme.typography.h3,
    color: theme.colors.base.blueLight
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
