import { theme } from '@shared/theme/theme';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Text
} from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

interface InputTextProps extends Omit<TextInputProps, 'onChangeText'> {
  icon?: React.ReactNode;
  containerStyle?: object;
  label: string;
  mask?: MaskInputProps['mask'];
  onChangeText?: (masked: string, unmasked: string) => void;
  errorText?: string;
}

const InputText: React.FC<InputTextProps> = ({
  icon,
  containerStyle,
  style,
  label,
  mask,
  errorText,
  onChangeText,
  ...props
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.container, containerStyle]}>
        {mask ? (
          <MaskInput
            style={[styles.input, style]}
            mask={mask}
            onChangeText={onChangeText}
            {...props}
          />
        ) : (
          <TextInput
            style={[styles.input, style]}
            onChangeText={(text) => onChangeText?.(text, text)}
            {...props}
          />
        )}
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
      <Text style={styles.errorText}>{errorText}</Text>
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
    marginVertical: 8,
    backgroundColor: theme.colors.base.greyLight
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.black,
    backgroundColor: 'transparent'
  },
  iconContainer: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: theme.colors.text.grey,
    fontSize: theme.typography.pSmall.fontSize
  },
  errorText: {
    color: theme.colors.alert.red,
    fontSize: theme.typography.pSmall.fontSize
  }
});

export default InputText;
