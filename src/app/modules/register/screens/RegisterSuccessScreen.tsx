import { Text, View } from 'react-native';
import { theme } from '@app/shared/theme/theme';
import CreditCard from '@app/shared/components/cards/CreditCard';
import Button from '@app/shared/components/buttons/Button';
import { Card } from '@app/shared/types/card';

export default function RegisterSuccessScreen({
  route
}: {
  route: { params: { card: Card } };
}) {
  const { card: cardData } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#4444',
        paddingHorizontal: 20,
        paddingTop: 100,
        paddingBottom: 40
      }}
    >
      <Text
        style={{
          fontSize: theme.typography.h1.fontSize,
          textAlign: 'center',
          color: 'white',
          marginBottom: 60
        }}
      >
        Wallet Test
      </Text>
      <Text
        style={{
          fontSize: theme.typography.h1.fontSize,
          textAlign: 'center',
          color: 'white',
          marginBottom: 60
        }}
      >
        cartão cadastrado com sucesso
      </Text>
      <CreditCard
        backgroundColor="red"
        cardNumber={cardData.number}
        cardholderName={cardData.name}
        expiryDate={cardData.expires}
        cardType="VISA"
        textColor="#FFFFFF"
      />
      <Button
        title="avançar"
        onPress={() => {}}
        backgroundColor={theme.colors.base.blueLight}
      />
    </View>
  );
}
