import { View, StyleSheet } from 'react-native';
import { useAppSelector } from '@app/store/hooks';
import PageContainer from '@app/shared/components/containers/PageContainer';
import CreditCard from '@app/shared/components/cards/CreditCard';
import { theme } from '@app/shared/theme/theme';
import { JSX, useEffect, useState } from 'react';
import { useAppNavigation } from '@app/shared/hooks/useNavigation';

import useGetCards from '../hooks/useGetCards';
import WalletLoading from '../components/WalletLoading';

export default function WalletScreen(): JSX.Element {
  const [delayLoading, setDelayLoading] = useState<boolean>(true);

  const cards = useAppSelector((state) => state.cards.cards);
  const { isLoading } = useGetCards();
  const navigation = useAppNavigation();

  useEffect(() => {
    const t = setTimeout(() => setDelayLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: !(isLoading || delayLoading)
    });
  }, [isLoading, delayLoading, navigation]);

  const cardColors = [theme.colors.base.greenLight, theme.colors.text.black];

  if (isLoading || delayLoading) {
    return <WalletLoading />;
  }

  return (
    <PageContainer
      showWalletHeader
      showTitle={false}
      showBackgroundRectangle={false}
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
    position: 'relative'
  }
});
