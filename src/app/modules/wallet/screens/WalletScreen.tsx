import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { useEffect, useState, JSX } from 'react';
import { useAppSelector } from '@app/store/hooks';
import { useAppNavigation } from '@app/shared/hooks/useAppNavigation';
import PageContainer from '@app/shared/components/containers/PageContainer';
import { CARD_COLORS, theme } from '@app/shared/theme/theme';
import Button from '@app/shared/components/buttons/Button';

import { WalletLoading } from '../components/WalletLoading';
import AnimatedWalletCard from '../components/AnimatedWalletCard';
import useGetCards from '../hooks/useGetCards';
import useWalletState from '../hooks/useWalletState';

const LOADING_FAKE_DELAY = 2000;

export default function WalletScreen(): JSX.Element {
  const [initialDelay, setInitialDelay] = useState<boolean>(true);

  const cards = useAppSelector((state) => state.cards.cards);
  const { isLoading } = useGetCards();
  const navigation = useAppNavigation();
  const walletState = useWalletState(cards);

  const { width: screenWidth } = useWindowDimensions();
  const paddingVertical = 60;
  const buttonWidth = screenWidth - paddingVertical;
  const isLoadingWallet = isLoading || initialDelay;

  useEffect(() => {
    const timer = setTimeout(() => setInitialDelay(false), LOADING_FAKE_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    navigation.setOptions({ headerShown: !isLoadingWallet });
  }, [isLoadingWallet, navigation]);

  if (isLoadingWallet) return <WalletLoading />;

  return (
    <PageContainer showTitle={false} showBackgroundRectangle={false}>
      <View style={styles.walletContainer}>
        {cards?.map((card, index) => {
          const state = walletState.getCardState(card.id);
          return (
            <AnimatedWalletCard
              key={card.id}
              card={card}
              index={index}
              cardState={{
                isSelected: state.isSelected,
                isOther: state.isOther,
                shouldShow: state.shouldShow
              }}
              totalCards={cards.length}
              colors={CARD_COLORS}
              onPress={() => walletState.handleToggleSelection(card.id)}
            />
          );
        })}
        {walletState.groupedCards.hasSelection && (
          <View style={{ marginTop: 120 }}>
            <Button
              title="pagar com este cartão"
              onPress={() => {}}
              backgroundColor={theme.colors.base.blueLight}
              width={buttonWidth}
            />
          </View>
        )}
        {!walletState.groupedCards.hasSelection && (
          <View style={{ marginTop: 60 }}>
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
