import { Provider } from 'react-redux';
import {
  configureStore,
  EnhancedStore,
  StoreEnhancer,
  Tuple,
  UnknownAction,
  ReducersMapObject
} from '@reduxjs/toolkit';
import React from 'react';

const createTestStore = (
  reducer: ReducersMapObject = {
    test: (state: Record<string, unknown> = {}) => state
  }
) => {
  return configureStore({
    reducer
  });
};

export const TestWrapper = ({
  children,
  fakeStore
}: {
  children: React.ReactNode;
  fakeStore?: EnhancedStore<any, UnknownAction, Tuple<[StoreEnhancer]>>;
}) => {
  const store = fakeStore ?? createTestStore();
  return <Provider store={store}>{children}</Provider>;
};
