import { jest } from '@jest/globals';
import { Card } from '@app/shared/types/card';
import { generateFakeCardData } from '../../../../../../__mocks__/card';

export const fakeCardList: Card[] = [generateFakeCardData()];

export const mockSetOptions = jest.fn();

export const mockCardsReducer = (state = { cards: fakeCardList }) => state;

export const mockGetCardResponse = (
  cardData: Card[]
): Promise<{ status: number; data: Card[] }> =>
  Promise.resolve({
    status: 200,
    data: cardData
  });

export const mockHandleToggleSelection = jest.fn();

export const mockGetCardState = jest.fn().mockReturnValue({
  isSelected: false,
  isOther: false,
  shouldShow: true
});

export const mockGroupedCardsValue: { hasSelection: boolean } = {
  hasSelection: true
};

export const setMockGroupedCardsValue = (value: { hasSelection: boolean }) => {
  mockGroupedCardsValue.hasSelection = value.hasSelection;
};

export const resetMocks = () => {
  mockSetOptions.mockClear();
  mockHandleToggleSelection.mockClear();
  mockGetCardState.mockClear();
  mockGroupedCardsValue.hasSelection = true;
};
