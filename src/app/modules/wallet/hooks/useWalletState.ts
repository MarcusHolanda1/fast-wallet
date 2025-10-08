import { useState, useMemo, useCallback } from 'react';
import { Card } from '@app/shared/types/card';

import { WalletState } from '../types/wallet';

export default function useWalletState(cards: Card[]): WalletState {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const selectedCard = useMemo(() => {
    const card = cards.find((card: Card) => card.id === selectedCardId) || null;
    return {
      id: selectedCardId,
      card,
      isSelected: !!card
    };
  }, [cards, selectedCardId]);

  const nonSelectedCards = useMemo(
    () => cards.filter((card) => card.id !== selectedCardId),
    [cards, selectedCardId]
  );

  const groupedCards = useMemo(
    () => ({
      selectedCard: selectedCard.card,
      nonSelectedCards,
      hasSelection: !!selectedCard.card
    }),
    [selectedCard.card, nonSelectedCards]
  );

  const getCardState = useCallback(
    (cardId: string) => {
      const isSelected = selectedCardId === cardId;
      const isOther = !!selectedCardId && !isSelected;

      const lastNonSelectedId =
        nonSelectedCards[nonSelectedCards.length - 1]?.id;
      const shouldShow = isOther ? cardId === lastNonSelectedId : true;

      return {
        isSelected,
        isOther,
        shouldShow
      };
    },
    [selectedCardId, nonSelectedCards]
  );

  const handleToggleSelection = useCallback(
    (cardId: string) => {
      if (!selectedCardId) {
        setSelectedCardId(cardId);
        return;
      }
      if (selectedCardId === cardId) {
        return;
      }
      setSelectedCardId(null);
    },
    [selectedCardId]
  );

  return {
    selectedCard,
    nonSelectedCards,
    groupedCards,
    getCardState,
    handleToggleSelection
  };
}
