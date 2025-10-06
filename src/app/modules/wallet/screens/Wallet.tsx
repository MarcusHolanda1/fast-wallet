import { Text, View, StyleSheet } from 'react-native';
import { useAppSelector } from '@app/store/hooks';
import PageContainer from '@app/shared/components/containers/PageContainer';
import CreditCard from '@app/shared/components/cards/CreditCard';
import { theme } from '@app/shared/theme/theme';

import useGetCards from '../hooks/useGetCards';

export default function WalletScreen() {
  const { isLoading } = useGetCards();
  const cards = useAppSelector((state) => state.cards.cards);

  const cardColors = [theme.colors.base.greenLight, theme.colors.text.black];

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <PageContainer
      showWalletHeader
      showTitle={false}
      showBackgroundImages={false}
    >
      <View style={styles.walletContainer}>
        {cards &&
          cards.map((card, index) => {
            const offset = index * -112;
            const backgroundColor = cardColors[index % cardColors.length];
            return (
              <View
                key={card.id}
                style={[{ marginTop: offset, zIndex: cards.length + index }]}
              >
                <CreditCard
                  card={card}
                  backgroundColor={backgroundColor}
                  textColor={
                    backgroundColor === theme.colors.text.black
                      ? theme.colors.base.white
                      : theme.colors.text.black
                  }
                />
              </View>
            );
          })}
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  walletContainer: {
    marginTop: 20,
    position: 'relative'
  }
});
