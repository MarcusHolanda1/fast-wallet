import Button from '@shared/components/buttons/Button';
import InputText from '@shared/components/inputs/InputText';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Masks } from 'react-native-mask-input';
import { replaceWithTextOnly } from '@app/shared/utils/replaces';
import { theme } from '@app/shared/theme/theme';

import useRegisterCard from '../hooks/useRegisterCard';
import { cardMask } from '../constants/masks';

const FormRegisterCard = () => {
  const { control, handleSubmit, errors, isValid, onSubmit, isLoading } =
    useRegisterCard();

  return (
    <View style={{ width: '100%' }}>
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 40
        }}
      >
        <View style={{ flex: 0.45 }}>
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
        <View style={{ flex: 0.45 }}>
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
  );
};

export default FormRegisterCard;
