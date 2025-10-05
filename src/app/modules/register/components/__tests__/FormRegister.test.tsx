import {
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react-native';

import { cardValidatorMessages } from '../../constants/cardValidator';
import FormRegisterCard from '../FormRegisterCard';

const makeSut = (): RenderResult => {
  return render(<FormRegisterCard />);
};

describe('Form Register Card tests', () => {
  test('should render the form correctly', () => {
    const sut = makeSut();

    expect(sut.getByText('número do cartão')).toBeTruthy();
    expect(sut.getByText('nome do titular do cartão')).toBeTruthy();
    expect(sut.getByText('vencimento')).toBeTruthy();
    expect(sut.getByText('código de segurança')).toBeTruthy();
    expect(sut.getByText('avançar')).toBeTruthy();
  });

  test('should button been disabled on initial render', () => {
    const sut = makeSut();

    expect(sut.getByText('avançar')).toBeDisabled();
  });

  test('should show error on credit card input does not show 16 chars', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('card-number-input'), '1234');

    fireEvent(sut.getByTestId('card-number-input'), 'blur');

    await waitFor(() => {
      expect(
        sut.getByText(cardValidatorMessages.cardNumber.matches)
      ).toBeTruthy();
    });
  });

  test('should show required credit card error', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('card-number-input'), '');

    fireEvent(sut.getByTestId('card-number-input'), 'blur');

    await waitFor(() => {
      expect(
        sut.getByText(cardValidatorMessages.cardNumber.required)
      ).toBeTruthy();
    });
  });

  test('should show required name error', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('card-holder-input'), '');

    fireEvent(sut.getByTestId('card-holder-input'), 'blur');

    await waitFor(() => {
      expect(
        sut.getByText(cardValidatorMessages.cardHolder.required)
      ).toBeTruthy();
    });
  });

  test('should show error on card holder input', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('card-holder-input'), 'H');
    fireEvent(sut.getByTestId('card-holder-input'), 'blur');

    await waitFor(() => {
      expect(sut.getByText(cardValidatorMessages.cardHolder.min)).toBeTruthy();
    });
  });

  test('not should is possible to type number on card holder input', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('card-holder-input'), 'H3LL0');
    fireEvent(sut.getByTestId('card-holder-input'), 'blur');

    await waitFor(() => {
      expect(sut.getByTestId('card-holder-input')).toHaveProp('value', 'HLL');
    });
  });

  test('should show required expiry date error', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('expiry-date-input'), '');
    fireEvent(sut.getByTestId('expiry-date-input'), 'blur');

    await waitFor(() => {
      expect(
        sut.getByText(cardValidatorMessages.expiryDate.required)
      ).toBeTruthy();
    });
  });

  test('should show error on expiry date input with invalid format', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('expiry-date-input'), '4444');
    fireEvent(sut.getByTestId('expiry-date-input'), 'blur');

    await waitFor(() => {
      expect(
        sut.getByText(cardValidatorMessages.expiryDate.matches)
      ).toBeTruthy();
    });
  });

  test('should show error on expiry date input with expired date', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('expiry-date-input'), '11/24');
    fireEvent(sut.getByTestId('expiry-date-input'), 'blur');

    await waitFor(() => {
      expect(
        sut.getByText(cardValidatorMessages.expiryDate.notExpired)
      ).toBeTruthy();
    });
  });

  test('should show required cvv error', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('cvv-input'), '');
    fireEvent(sut.getByTestId('cvv-input'), 'blur');

    await waitFor(() => {
      expect(sut.getByText(cardValidatorMessages.cvv.required)).toBeTruthy();
    });
  });

  test('should show error on cvv input with less than 3 digits', async () => {
    const sut = makeSut();

    fireEvent.changeText(sut.getByTestId('cvv-input'), '12');
    fireEvent(sut.getByTestId('cvv-input'), 'blur');

    await waitFor(() => {
      expect(sut.getByText(cardValidatorMessages.cvv.matches)).toBeTruthy();
    });
  });
});
