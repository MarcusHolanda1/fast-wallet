import { fireEvent, render, RenderResult } from '@testing-library/react-native';
import { TestWrapper } from '@app/shared/utils/MockedStoreWrapper';

import HomeScreen from '../Home';

const makeSut = () => {
  return render(
    <TestWrapper>
      <HomeScreen />
    </TestWrapper>
  );
};

describe('Home Screen', () => {
  let sut: RenderResult;

  beforeEach(() => {
    jest.clearAllMocks();
    sut = makeSut();
  });

  test('should be render all components', () => {
    expect(sut.getByText('Fast Wallet')).toBeTruthy();
    expect(sut.getByText('meus cartões')).toBeTruthy();
    expect(sut.getByText('cadastrar cartão')).toBeTruthy();
  });

  test('should navigate to WalletScreen on "meus cartões" button press', () => {
    fireEvent.press(sut.getByText('meus cartões'));

    expect(mockNavigate).toHaveBeenCalledWith('WalletScreen');
  });

  test('should navigate to RegisterScreen on "cadastrar cartão" button press', () => {
    fireEvent.press(sut.getByText('cadastrar cartão'));

    expect(mockNavigate).toHaveBeenCalledWith('RegisterScreen');
  });
});
