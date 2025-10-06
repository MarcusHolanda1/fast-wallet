import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@app/shared/theme/theme';
import CreditCard from '@app/shared/components/cards/CreditCard';
import Button from '@app/shared/components/buttons/Button';
import { Card } from '@app/shared/types/card';
import { useAppNavigation } from '@app/shared/hooks/useNavigation';
import PageContainer from '@app/shared/components/containers/PageContainer';

export default function RegisterSuccessScreen({
  route
}: {
  route: { params: { card: Card } };
}) {
  const { card: cardData } = route.params;

  const navigate = useAppNavigation();

  return (
    <PageContainer>
      <Text style={styles.title}>cartão cadastrado com sucesso</Text>
      <CreditCard
        backgroundColor="red"
        cardNumber={cardData.number}
        cardholderName={cardData.name}
        expiryDate={cardData.expires}
        cardType="VISA"
        textColor="#FFFFFF"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="avançar"
          onPress={() => navigate.navigate('WalletScreen')}
          backgroundColor={theme.colors.base.blueLight}
        />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.base.blueDark,
    padding: 20,
    justifyContent: 'space-between'
  },
  title: {
    ...theme.typography.h4,
    color: theme.colors.base.white,
    marginBottom: 20
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30
  }
});
