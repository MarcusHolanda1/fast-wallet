import {
  TouchableOpacity,
  Text,
  DimensionValue,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { theme } from '@shared/theme/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  width?: DimensionValue;
  isLoading?: boolean;
  testID?: string;
}

export default function Button({
  title,
  onPress,
  disabled,
  backgroundColor,
  textColor = '#fff',
  width = '100%',
  isLoading = false,
  testID
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor, width }]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55
  },
  text: {
    ...theme.typography.h5
  }
});
