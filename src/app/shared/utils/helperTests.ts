import { fireEvent, RenderResult } from '@testing-library/react-native';

export const fillAndBlur = (
  sut: RenderResult,
  testId: string,
  value: string
) => {
  fireEvent.changeText(sut.getByTestId(testId), value);
  fireEvent(sut.getByTestId(testId), 'blur');
};

export const expectFormattedCardNumber = (cardNumber: string) => {
  return '•••• •••• •••• ' + cardNumber.slice(-4);
};
