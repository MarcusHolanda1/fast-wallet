import { render, RenderResult, waitFor } from '@testing-library/react-native';
import { fillAndBlur } from '@app/shared/utils/helperTests';

import { cardValidatorMessages } from '../../constants/cardValidator';
import FormRegisterCard from '../FormRegisterCard';

const makeSut = (): RenderResult => {
  return render(<FormRegisterCard />);
};

describe('Form Register Card tests', () => {
  describe('Form Register', () => {
    test('should button been disabled on initial render', () => {
      const sut = makeSut();

      expect(sut.getByText('avançar')).toBeDisabled();
    });

    test('should render the form correctly', () => {
      const sut = makeSut();

      expect(sut.getByText('número do cartão')).toBeTruthy();
      expect(sut.getByText('nome do titular do cartão')).toBeTruthy();
      expect(sut.getByText('vencimento')).toBeTruthy();
      expect(sut.getByText('código de segurança')).toBeTruthy();
      expect(sut.getByText('avançar')).toBeTruthy();
    });

    test('should enable button and submit form when all fields are valid', async () => {});
  });

  describe('Card Number Input', () => {
    test('should show error on credit card input does not show 16 chars', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'card-number-input', '1234');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.cardNumber.matches)
        ).toBeTruthy();
      });
    });

    test('should show required credit card error', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'card-number-input', '');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.cardNumber.required)
        ).toBeTruthy();
      });
    });
  });

  describe('Card Holder Input', () => {
    test('should show required name error', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'card-holder-input', '');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.cardHolder.required)
        ).toBeTruthy();
      });
    });

    test('should show error on card holder input', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'card-holder-input', 'H');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.cardHolder.min)
        ).toBeTruthy();
      });
    });

    test('not should is possible to type number on card holder input', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'card-holder-input', 'H3LL0');

      await waitFor(() => {
        expect(sut.getByTestId('card-holder-input')).toHaveProp('value', 'HLL');
      });
    });
  });

  describe('Expiry Date Input', () => {
    test('should show required expiry date error', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'expiry-date-input', '');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.expiryDate.required)
        ).toBeTruthy();
      });
    });

    test('should show error on expiry date input with invalid format', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'expiry-date-input', '4444');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.expiryDate.matches)
        ).toBeTruthy();
      });
    });

    test('should show error on expiry date input with expired date', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'expiry-date-input', '11/24');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.expiryDate.notExpired)
        ).toBeTruthy();
      });
    });
  });

  describe('CVV Input', () => {
    test('should show required cvv error', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'cvv-input', '');

      await waitFor(() => {
        expect(sut.getByText(cardValidatorMessages.cvv.required)).toBeTruthy();
      });
    });

    test('should show error on cvv input with less than 3 digits', async () => {
      const sut = makeSut();

      fillAndBlur(sut, 'cvv-input', '12');

      await waitFor(() => {
        expect(sut.getByText(cardValidatorMessages.cvv.matches)).toBeTruthy();
      });
    });
  });
});
