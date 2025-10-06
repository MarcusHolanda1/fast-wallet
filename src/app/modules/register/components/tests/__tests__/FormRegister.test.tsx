import {
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react-native';
import { fillAndBlur } from '@app/shared/utils/helperTests';
import { Toast } from 'toastify-react-native';
import { TestWrapper } from '@app/shared/utils/MockedStoreWrapper';
import { generateFakeCardData } from '@app/modules/register/__mocks__/registerMocks';

import { cardValidatorMessages } from '../../../constants/cardValidator';
import FormRegisterCard from '../../FormRegisterCard';
import * as cardService from '../../../services/card';
import { mockCreateCardResponse } from '../__mocks__/FormRegisterMock';

const mockedCardData = generateFakeCardData();
const mockCreateCard = jest.spyOn(cardService, 'createCard');

const makeSut = (): RenderResult => {
  return render(
    <TestWrapper>
      <FormRegisterCard />
    </TestWrapper>
  );
};

describe('Form Register Card tests', () => {
  let sut: RenderResult;

  beforeEach(() => {
    jest.clearAllMocks();
    sut = makeSut();
  });

  describe('Form Register', () => {
    test('should button been disabled on initial render', () => {
      expect(sut.getByText('avançar')).toBeDisabled();
    });

    test('should render the form correctly', () => {
      expect(sut.getByText('número do cartão')).toBeTruthy();
      expect(sut.getByText('nome do titular do cartão')).toBeTruthy();
      expect(sut.getByText('vencimento')).toBeTruthy();
      expect(sut.getByText('código de segurança')).toBeTruthy();
      expect(sut.getByText('avançar')).toBeTruthy();
    });

    test('should submit form and navigate to RegisterSuccessScreen when all fields are valid', async () => {
      mockCreateCard.mockResolvedValueOnce(
        mockCreateCardResponse(mockedCardData)
      );

      fireEvent.changeText(
        sut.getByTestId('card-number-input'),
        mockedCardData.number
      );
      fireEvent.changeText(
        sut.getByTestId('card-holder-input'),
        mockedCardData.name
      );
      fireEvent.changeText(
        sut.getByTestId('expiry-date-input'),
        mockedCardData.expires
      );
      fireEvent.changeText(sut.getByTestId('cvv-input'), mockedCardData.cvv);

      await waitFor(() => {
        expect(sut.getByText('avançar')).toBeEnabled();
      });

      fireEvent.press(sut.getByText('avançar'));

      await waitFor(() => {
        expect(mockCreateCard).toHaveBeenCalledWith(
          expect.objectContaining({
            number: mockedCardData.number,
            name: mockedCardData.name,
            expires: mockedCardData.expires,
            cvv: mockedCardData.cvv
          })
        );
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('RegisterSuccessScreen', {
          card: mockedCardData
        });
      });
    });

    test('should loading button when submitting form', async () => {
      mockCreateCard.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve(mockCreateCardResponse(mockedCardData)),
              1000
            )
          )
      );

      fireEvent.changeText(
        sut.getByTestId('card-number-input'),
        mockedCardData.number
      );
      fireEvent.changeText(
        sut.getByTestId('card-holder-input'),
        mockedCardData.name
      );
      fireEvent.changeText(
        sut.getByTestId('expiry-date-input'),
        mockedCardData.expires
      );
      fireEvent.changeText(sut.getByTestId('cvv-input'), mockedCardData.cvv);

      await waitFor(() => {
        expect(sut.getByText('avançar')).toBeEnabled();
      });

      fireEvent.press(sut.getByText('avançar'));

      await waitFor(() => {
        expect(sut.getByTestId('submit-register-card-button')).toBeDisabled();
      });

      await waitFor(
        () => {
          expect(mockCreateCard).toHaveBeenCalled();
        },
        { timeout: 2000 }
      );
    });

    test('should show error toast when createCard throws an error', async () => {
      mockCreateCard.mockRejectedValueOnce(new Error('API Error'));

      fireEvent.changeText(
        sut.getByTestId('card-number-input'),
        mockedCardData.number
      );
      fireEvent.changeText(
        sut.getByTestId('card-holder-input'),
        mockedCardData.name
      );
      fireEvent.changeText(
        sut.getByTestId('expiry-date-input'),
        mockedCardData.expires
      );
      fireEvent.changeText(sut.getByTestId('cvv-input'), mockedCardData.cvv);

      await waitFor(() => {
        expect(sut.getByText('avançar')).toBeEnabled();
      });

      fireEvent.press(sut.getByText('avançar'));

      await waitFor(() => {
        expect(mockCreateCard).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(Toast.error).toHaveBeenCalled();
      });
    });
  });

  describe('Card Number Input', () => {
    test('should show error on credit card input does not show 16 chars', async () => {
      fillAndBlur(sut, 'card-number-input', '1234');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.cardNumber.matches)
        ).toBeTruthy();
      });
    });

    test('should show required credit card error', async () => {
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
      fillAndBlur(sut, 'card-holder-input', '');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.cardHolder.required)
        ).toBeTruthy();
      });
    });

    test('should show error on card holder input', async () => {
      fillAndBlur(sut, 'card-holder-input', 'H');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.cardHolder.min)
        ).toBeTruthy();
      });
    });

    test('not should is possible to type number on card holder input', async () => {
      fillAndBlur(sut, 'card-holder-input', 'H3LL0');

      await waitFor(() => {
        expect(sut.getByTestId('card-holder-input')).toHaveProp('value', 'HLL');
      });
    });
  });

  describe('Expiry Date Input', () => {
    test('should show required expiry date error', async () => {
      fillAndBlur(sut, 'expiry-date-input', '');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.expiryDate.required)
        ).toBeTruthy();
      });
    });

    test('should show error on expiry date input with invalid format', async () => {
      fillAndBlur(sut, 'expiry-date-input', '4444');

      await waitFor(() => {
        expect(
          sut.getByText(cardValidatorMessages.expiryDate.matches)
        ).toBeTruthy();
      });
    });

    test('should show error on expiry date input with expired date', async () => {
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
      fillAndBlur(sut, 'cvv-input', '');

      await waitFor(() => {
        expect(sut.getByText(cardValidatorMessages.cvv.required)).toBeTruthy();
      });
    });

    test('should show error on cvv input with less than 3 digits', async () => {
      fillAndBlur(sut, 'cvv-input', '12');

      await waitFor(() => {
        expect(sut.getByText(cardValidatorMessages.cvv.matches)).toBeTruthy();
      });
    });
  });
});
