import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const createTestStore = () => {
  return configureStore({
    reducer: {
      test: (state: Record<string, unknown> = {}) => state
    }
  });
};

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createTestStore();
  return <Provider store={store}>{children}</Provider>;
};
