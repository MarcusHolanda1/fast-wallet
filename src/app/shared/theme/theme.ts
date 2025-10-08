import { colors } from './colors';
import { typography } from './typography';
import { AppTheme } from './types';

export const theme: AppTheme = {
  colors,
  typography
};

export const CARD_COLORS = [
  theme.colors.base.greenLight,
  theme.colors.text.black
];
export type { AppTheme };
