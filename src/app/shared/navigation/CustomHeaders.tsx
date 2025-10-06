import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

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
            <Text style={styles.backText}>←</Text>
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
    backgroundColor: theme.colors.base.blueDark
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: 'transparent'
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
    color: theme.colors.base.blueLight
  },
  rightSpace: {
    width: 40
  }
});
