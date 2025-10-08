import { Card } from '@app/shared/types/card';

export interface WalletState {
  selectedCard: {
    id: string | null;
    card: Card | null;
    isSelected: boolean;
  };
  nonSelectedCards: Card[];
  groupedCards: {
    selectedCard: Card | null;
    nonSelectedCards: Card[];
    hasSelection: boolean;
  };
  getCardState: (cardId: string) => {
    isSelected: boolean;
    isOther: boolean;
    shouldShow: boolean;
  };
  handleToggleSelection: (cardId: string) => void;
}
