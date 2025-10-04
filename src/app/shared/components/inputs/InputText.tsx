import { theme } from '@shared/theme/theme';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Text
} from 'react-native';

interface InputTextProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: object;
  label: string;
}

const InputText: React.FC<InputTextProps> = ({
  icon,
  containerStyle,
  style,
  label,
  ...props
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.container, containerStyle]}>
        <TextInput style={[styles.input, style]} {...props} />
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.black,
    backgroundColor: theme.colors.base.greyLight
  },
  iconContainer: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: theme.colors.text.grey,
    fontSize: theme.typography.pSmall.fontSize
  }
});

export default InputText;
