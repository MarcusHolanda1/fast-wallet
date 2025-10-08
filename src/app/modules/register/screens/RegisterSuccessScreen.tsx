import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@app/shared/theme/theme';
import Button from '@app/shared/components/buttons/Button';
import { Card } from '@app/shared/types/card';
import { useAppNavigation } from '@app/shared/hooks/useNavigation';
import PageContainer from '@app/shared/components/containers/PageContainer';

import CreditCard from '../../../shared/components/cards/CreditCard';

export default function RegisterSuccessScreen({
  route
}: {
  route: { params: { card: Card } };
}) {
  const { card: cardData } = route.params;

  const navigate = useAppNavigation();

  return (
    <PageContainer showBackgroundRectangle showTitle>
      <Text style={styles.title}>cartão cadastrado com sucesso</Text>
      <CreditCard
        backgroundColor={theme.colors.text.black}
        card={cardData}
        textColor={theme.colors.base.white}
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
