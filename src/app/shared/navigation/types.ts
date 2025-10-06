import { Card } from '../types/card';

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  RegisterSuccessScreen: {
    card: Card;
  };
  WalletScreen: undefined;
};
