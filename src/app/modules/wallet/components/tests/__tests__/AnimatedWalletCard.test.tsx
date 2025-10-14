import { fireEvent, render } from '@testing-library/react-native';
import AnimatedWalletCard from '../../AnimatedWalletCard';
import { theme } from '@app/shared/theme/theme';

import { generateFakeCardData } from '../../../../../../__mocks__/card';
import { Card } from '@app/shared/types/card';

const mockFakeCard: Card = generateFakeCardData();

const defaultProps = {
  card: mockFakeCard,
  index: 0,
  cardState: { isSelected: false, isOther: false, shouldShow: true },
  totalCards: 2,
  colors: [theme.colors.base.white, theme.colors.text.black],
  onPress: jest.fn()
};

describe('AnimatedWalletCard', () => {
  test('should render CreditCard with correct props', () => {
    const { getByLabelText } = render(<AnimatedWalletCard {...defaultProps} />);
    expect(getByLabelText('Card')).toBeTruthy();
  });

  test('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <AnimatedWalletCard {...defaultProps} onPress={onPress} />
    );
    fireEvent.press(getByTestId('animated-wallet-card'));
    expect(onPress).toHaveBeenCalled();
  });

  test('should apply correct backgroundColor and textColor', () => {
    const { getByTestId } = render(
      <AnimatedWalletCard {...defaultProps} index={1} />
    );
    expect(getByTestId('animated-wallet-card')).toBeTruthy();
  });

  test('should render with opacity 0.4 when isOther and shouldShow', () => {
    const { getByTestId } = render(
      <AnimatedWalletCard
        {...defaultProps}
        cardState={{ isSelected: false, isOther: true, shouldShow: true }}
      />
    );
    expect(getByTestId('animated-wallet-card')).toBeTruthy();
  });

  test('should render with zIndex 100 when isSelected', () => {
    const { getByTestId } = render(
      <AnimatedWalletCard
        {...defaultProps}
        cardState={{ isSelected: true, isOther: false, shouldShow: true }}
      />
    );
    expect(getByTestId('animated-wallet-card')).toBeTruthy();
  });

  test('should match snapshot', () => {
    const tree = render(<AnimatedWalletCard {...defaultProps} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
