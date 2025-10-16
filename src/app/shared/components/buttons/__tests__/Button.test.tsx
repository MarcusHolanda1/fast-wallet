import { render, RenderResult } from '@testing-library/react-native';
import { TestWrapper } from '@app/shared/utils/MockedStoreWrapper';

import Button from '../Button';

const backgroundColor = '#000';
const textColor = '#fff';

const makeSut = (isLoading: boolean = false) => {
  return render(
    <TestWrapper>
      <Button
        onPress={jest.fn}
        title="Test Button"
        backgroundColor={backgroundColor}
        textColor={textColor}
        testID="button-component"
        disabled={false}
        isLoading={isLoading}
        width={200}
      />
    </TestWrapper>
  );
};

describe('Button test', () => {
  let sut: RenderResult;

  beforeEach(() => {
    jest.clearAllMocks();
    sut = makeSut();
  });

  test('should render button correctly', () => {
    expect(sut.getByTestId('button-component')).toBeTruthy();
    expect(sut.getByText('Test Button')).toBeTruthy();
  });

  test('should render loading indicator when isLoading is true', () => {
    sut = makeSut(true);
    expect(sut.getByTestId('button-component')).toBeTruthy();
    expect(sut.queryByText('Test Button')).toBeNull();
    expect(sut.getByTestId('activity-indicator')).toBeTruthy();
  });

  test('should match snapshot', () => {
    expect(sut.toJSON()).toMatchSnapshot();
  });
});
