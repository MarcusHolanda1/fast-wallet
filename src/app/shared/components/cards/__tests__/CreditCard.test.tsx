import { render, RenderResult } from '@testing-library/react-native';
import { TestWrapper } from '@app/shared/utils/MockedStoreWrapper';
import { Card } from '@app/shared/types/card';

import { generateFakeCardData } from '../../../../../__mocks__/card';
import CreditCard from '../CreditCard';

const mockFakeCard = generateFakeCardData();

const backgroundColor = '#000';
const textColor = '#fff';

const makeSut = (cardProps: Card) => {
  return render(
    <TestWrapper>
      <CreditCard
        card={cardProps}
        backgroundColor={backgroundColor}
        textColor={textColor}
        testID={`credit-card-${cardProps.id}`}
      />
    </TestWrapper>
  );
};

describe('Credit card', () => {
  let sut: RenderResult;

  beforeEach(() => {
    jest.clearAllMocks();
    sut = makeSut(mockFakeCard);
  });

  test('should render the credit card with correct details', () => {
    expect(sut.getByText(mockFakeCard.id)).toBeTruthy();
    expect(sut.getByText(mockFakeCard.number)).toBeTruthy();
    expect(sut.getByText(mockFakeCard.name)).toBeTruthy();
    expect(sut.getByText(`Validade ${mockFakeCard.expires}`)).toBeTruthy();
  });

  test('should apply background and text colors', () => {
    expect(sut.getByTestId(`credit-card-${mockFakeCard.id}`)).toHaveStyle({
      backgroundColor
    });

    expect(sut.getByText(mockFakeCard.id)).toHaveStyle({ color: textColor });
    expect(sut.getByText(mockFakeCard.name)).toHaveStyle({ color: textColor });
    expect(sut.getByText(mockFakeCard.number)).toHaveStyle({
      color: textColor
    });
    expect(sut.getByText(`Validade ${mockFakeCard.expires}`)).toHaveStyle({
      color: textColor
    });
  });

  test('should match snapshot', () => {
    expect(sut.toJSON()).toMatchSnapshot();
  });
});
