import Button from '@shared/components/buttons/Button';
import InputText from '@shared/components/inputs/InputText';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { Controller } from 'react-hook-form';
import { Masks } from 'react-native-mask-input';
import { replaceWithTextOnly } from '@app/shared/utils/replaces';
import { theme } from '@app/shared/theme/theme';
import CameraSvg from '@assets/svgs/icons/camera.svg';
import { useHeaderHeight } from '@react-navigation/elements';
import useKeyboardVisibility from '@app/shared/hooks/useKeyboardVisibility';

import useRegisterCard from '../hooks/useRegisterCard';
import { cardMask } from '../constants/masks';

const FormRegisterCard = () => {
  const { control, handleSubmit, errors, isValid, onSubmit, isLoading } =
    useRegisterCard();
  const height = useHeaderHeight();

  const keyboardIsVisible: boolean = useKeyboardVisibility();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, width: '100%' }}
      keyboardVerticalOffset={height - 70}
    >
      <View style={styles.centerContent}>
        {!keyboardIsVisible && <Text style={styles.title}>Fast Wallet</Text>}
        <Controller
          control={control}
          name="cardNumber"
          render={({ field: { onChange, value } }) => (
            <InputText
              label="número do cartão"
              value={value}
              onChangeText={(_, unmasked) => onChange(unmasked)}
              mask={Masks.CREDIT_CARD}
              placeholder="XXXX XXXX XXXX XXXX"
              keyboardType="numeric"
              errorText={errors.cardNumber?.message}
              testID="card-number-input"
              prefix={
                <View style={{ marginRight: -6, marginLeft: 10 }}>
                  <CameraSvg width={24} height={24} />
                </View>
              }
            />
          )}
        />
        <Controller
          control={control}
          name="cardHolder"
          render={({ field: { onChange, value } }) => (
            <InputText
              label="nome do titular do cartão"
              value={value}
              onChangeText={(text) => {
                onChange(replaceWithTextOnly(text));
              }}
              keyboardType="default"
              autoCapitalize="words"
              errorText={errors.cardHolder?.message}
              testID="card-holder-input"
            />
          )}
        />
        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            <Controller
              control={control}
              name="expiryDate"
              render={({ field: { onChange, value } }) => (
                <InputText
                  label="vencimento"
                  placeholder="00/00"
                  value={value}
                  onChangeText={(masked, _) => onChange(masked)}
                  mask={cardMask.expiryDate}
                  keyboardType="numeric"
                  errorText={errors.expiryDate?.message}
                  testID="expiry-date-input"
                />
              )}
            />
          </View>
          <View style={styles.halfWidth}>
            <Controller
              control={control}
              name="cvv"
              render={({ field: { onChange, value } }) => (
                <InputText
                  label="código de segurança"
                  placeholder="***"
                  value={value}
                  onChangeText={(_, unmasked) => onChange(unmasked)}
                  mask={cardMask.cvv}
                  errorText={errors.cvv?.message}
                  keyboardType="numeric"
                  testID="cvv-input"
                />
              )}
            />
          </View>
        </View>
        <Button
          width="auto"
          onPress={() => void handleSubmit(onSubmit)()}
          title="avançar"
          backgroundColor={
            isValid ? theme.colors.base.blueLight : theme.colors.base.greyLight
          }
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          testID="submit-register-card-button"
          textColor={isValid ? theme.colors.base.white : theme.colors.text.grey}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    paddingVertical: 20
  },
  container: {
    flex: 1,
    width: '100%'
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.base.white,
    marginBottom: 30,
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    width: '100%'
  },
  halfWidth: {
    flex: 0.45
  }
});

export default FormRegisterCard;
