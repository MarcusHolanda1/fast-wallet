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
  prefix?: React.ReactNode;
}

const InputText: React.FC<InputTextProps> = ({
  icon,
  containerStyle,
  style,
  label,
  mask,
  errorText,
  prefix,
  onChangeText,
  ...props
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.container, containerStyle]}>
        {prefix}
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
    height: 45,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.base.greyLight,
    backgroundColor: theme.colors.base.white
  },
  input: {
    ...theme.typography.p,
    color: theme.colors.text.black,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    flex: 1
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: theme.colors.text.grey,
    fontSize: theme.typography.pSmall.fontSize
  },
  errorText: {
    color: theme.colors.alert.red,
    fontSize: theme.typography.pSmall.fontSize,
    marginBottom: 4
  }
});

export default InputText;
