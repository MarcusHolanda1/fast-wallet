import {
  render,
  waitFor,
  RenderResult,
  fireEvent
} from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import WalletScreen from '../../WalletScreen';
import { generateFakeCardData } from '../../../../../../__mocks__/card';
import * as cardService from '../../../services/card';
import { Card } from '@app/shared/types/card';
import { TestWrapper } from '@app/shared/utils/MockedStoreWrapper';

const mockGetCards = jest.spyOn(cardService, 'getCards');
const fakeCardList = [generateFakeCardData()];

const mockSetOptions = jest.fn();

jest.mock('@assets/svgs/icons/wallet.svg', () => ({
  __esModule: true,
  default: () => <svg />
}));

jest.mock('@app/shared/hooks/useAppNavigation', () => ({
  useAppNavigation: () => ({
    setOptions: mockSetOptions
  })
}));

const mockCardsReducer = (state = { cards: fakeCardList }) => state;

const createTestStore = () => {
  return configureStore({
    reducer: {
      cards: mockCardsReducer
    }
  });
};

const makeSut = (): RenderResult => {
  return render(
    <TestWrapper fakeStore={createTestStore()}>
      <WalletScreen />
    </TestWrapper>
  );
};

const mockGetCardResponse = (
  cardData: Card[]
): Promise<{ status: number; data: Card[] }> =>
  Promise.resolve({
    status: 200,
    data: cardData
  });

const mockHandleToggleSelection = jest.fn();
const mockGetCardState = jest.fn().mockReturnValue({
  isSelected: false,
  isOther: false,
  shouldShow: true
});

let mockGroupedCardsValue = { hasSelection: true };

jest.mock('../../../hooks/useWalletState', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handleToggleSelection: mockHandleToggleSelection,
    getCardState: mockGetCardState,
    groupedCards: mockGroupedCardsValue
  }))
}));

describe('WalletScreen tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockGroupedCardsValue = { hasSelection: true };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should render loading indicator while fetching cards', async () => {
    mockGetCards.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockGetCardResponse(fakeCardList)), 4000)
        )
    );

    makeSut();

    await waitFor(() => {
      expect(mockGetCards).toHaveBeenCalled();
    });
  });

  test('should render cards after loading', async () => {
    mockGetCards.mockResolvedValueOnce({
      status: 200,
      data: fakeCardList
    });
    const sut = makeSut();
    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(
        sut.queryByText(/pagar com este cartão|usar este cartão/i)
      ).toBeTruthy();
    });
  });

  test('should hide header during loading and show it after', async () => {
    mockGetCards.mockResolvedValueOnce({
      status: 200,
      data: fakeCardList
    });

    makeSut();

    await waitFor(() => {
      expect(mockSetOptions).toHaveBeenCalledWith({ headerShown: false });
    });

    jest.advanceTimersByTime(2500);
    await waitFor(() => {
      expect(mockSetOptions).toHaveBeenCalledWith({ headerShown: true });
    });
  });

  test('should call handleToggleSelection when card is pressed', async () => {
    mockGetCards.mockResolvedValueOnce({
      status: 200,
      data: fakeCardList
    });
    const sut = makeSut();
    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      fireEvent.press(sut.getByText('pagar com este cartão'));
      expect(sut.getByTestId('animated-wallet-card')).toBeTruthy();
    });
  });

  test('should render empty state when there are no cards', async () => {
    mockGetCards.mockResolvedValueOnce({
      status: 200,
      data: []
    });
    const emptyStore = configureStore({
      reducer: {
        cards: () => ({ cards: [] })
      }
    });
    const sut = render(
      <TestWrapper fakeStore={emptyStore}>
        <WalletScreen />
      </TestWrapper>
    );
    jest.advanceTimersByTime(2500);
    await waitFor(() => {
      expect(sut.queryByTestId('animated-wallet-card')).toBeNull();
    });
  });

  test('should render "usar este cartão" when hasSelection is false', async () => {
    mockGroupedCardsValue = { hasSelection: false };

    mockGetCards.mockResolvedValueOnce({
      status: 200,
      data: fakeCardList
    });

    const sut = makeSut();
    jest.advanceTimersByTime(2500);

    await waitFor(() => {
      expect(sut.getByText('usar este cartão')).toBeTruthy();
    });
  });

  test('should render multiple cards', async () => {
    const multipleCards = [generateFakeCardData(), generateFakeCardData()];
    mockGetCards.mockResolvedValueOnce({
      status: 200,
      data: multipleCards
    });
    const multiStore = configureStore({
      reducer: {
        cards: () => ({ cards: multipleCards })
      }
    });
    const sut = render(
      <TestWrapper fakeStore={multiStore}>
        <WalletScreen />
      </TestWrapper>
    );
    jest.advanceTimersByTime(2500);
    await waitFor(() => {
      expect(sut.getAllByTestId('animated-wallet-card').length).toBe(2);
    });
  });
});
