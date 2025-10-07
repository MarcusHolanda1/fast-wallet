import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useEffect, useState, JSX } from 'react';
import { useAppSelector } from '@app/store/hooks';
import { useAppNavigation } from '@app/shared/hooks/useNavigation';
import PageContainer from '@app/shared/components/containers/PageContainer';
import { theme } from '@app/shared/theme/theme';
import Button from '@app/shared/components/buttons/Button';

import WalletLoading from '../components/WalletLoading';
import AnimatedWalletCard from '../components/AnimatedWalletCard';
import useGetCards from '../hooks/useGetCards';

const LOADING_FAKE_DELAY = 3000;
const CARD_COLORS = [theme.colors.base.greenLight, theme.colors.text.black];

export default function WalletScreen(): JSX.Element {
  const [initialDelay, setInitialDelay] = useState<boolean>(true);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const cards = useAppSelector((state) => state.cards.cards);
  const { isLoading } = useGetCards();
  const navigation = useAppNavigation();

  const screenWidth = Dimensions.get('window').width;
  const paddingVertical = 60;
  const buttonWidth = screenWidth - paddingVertical;

  const handleSelectCard = (cardId: string) => {
    if (!selectedCardId) return setSelectedCardId(cardId);
    if (selectedCardId === cardId) return;
    setSelectedCardId(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => setInitialDelay(false), LOADING_FAKE_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const isBusy = isLoading || initialDelay;

  useEffect(() => {
    navigation.setOptions({ headerShown: !isBusy });
  }, [isBusy, navigation]);

  if (isBusy) return <WalletLoading />;

  return (
    <PageContainer
      showWalletHeader
      showTitle={false}
      showBackgroundRectangle={false}
    >
      <View style={styles.walletContainer}>
        {cards?.map((card, index) => (
          <AnimatedWalletCard
            key={card.id}
            card={card}
            index={index}
            selectedCardId={selectedCardId}
            totalCards={cards.length}
            colors={CARD_COLORS}
            onPress={() => handleSelectCard(card.id)}
          />
        ))}
        {selectedCardId && (
          <View style={{ marginTop: 120 }}>
            <Button
              title="pagar com este cartão"
              onPress={() => {}}
              backgroundColor={theme.colors.base.blueLight}
              width={buttonWidth}
            />
          </View>
        )}
        {!selectedCardId && (
          <View style={{ marginTop: 120 }}>
            <Text
              style={{
                ...theme.typography.p,
                color: theme.colors.base.white
              }}
            >
              usar este cartão
            </Text>
          </View>
        )}
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  walletContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
