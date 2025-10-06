import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Card } from '../types/card';

interface CardState {
  cards: Card[];
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  cards: [],
  loading: false,
  error: null
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
    },
    setCard(state, action: PayloadAction<Card>) {
      state.cards.push(action.payload);
    }
  }
});

export const { setCards, setCard } = cardsSlice.actions;
export default cardsSlice.reducer;
