import { combineReducers } from '@reduxjs/toolkit';

import cardsReducer from '../shared/store/cardSlice';

export const rootReducer = combineReducers({
  cards: cardsReducer
});
