import { fireEvent, render, RenderResult } from '@testing-library/react-native';
import { TestWrapper } from '@app/shared/utils/MockedStoreWrapper';
import { Card } from '@app/shared/types/card';
import { generateFakeCardData } from '@app/modules/register/__mocks__/registerMocks';

import RegisterSuccessScreen from '../../RegisterSuccessScreen';

const mockFakeCard = generateFakeCardData();

const makeSut = (cardProps: Card) => {
  return render(
    <TestWrapper>
      <RegisterSuccessScreen
        route={{
          params: { card: cardProps }
        }}
      />
    </TestWrapper>
  );
};

describe('Register Success Screen', () => {
  let sut: RenderResult;

  beforeEach(() => {
    jest.clearAllMocks();
    sut = makeSut(mockFakeCard);
  });

  test('should render the success messages and button correctly', () => {
    expect(sut.getByText('cartão cadastrado com sucesso')).toBeTruthy();
    expect(sut.getByText('Fast Wallet')).toBeTruthy();
    expect(sut.getByText('avançar')).toBeTruthy();
  });

  test('should display the credit card with correct details', () => {
    expect(sut.getByText(mockFakeCard.number)).toBeTruthy();
    expect(sut.getByText(mockFakeCard.name)).toBeTruthy();
    expect(sut.getByText(`Validade ${mockFakeCard.expires}`)).toBeTruthy();
  });

  test('should navigate to WalletScreen on button press', () => {
    fireEvent.press(sut.getByText('avançar'));

    expect(mockNavigate).toHaveBeenCalledWith('WalletScreen');
  });
});
