import { fireEvent, render, RenderResult } from '@testing-library/react-native';
import { TestWrapper } from '@app/shared/utils/MockedStoreWrapper';
import { Text } from 'react-native';

import InputText from '../InputText';

const mockOnChangeText = jest.fn();

const makeSut = (props = {}) => {
  const defaultProps = {
    label: 'Test Label',
    onChangeText: mockOnChangeText,
    ...props
  };

  return render(
    <TestWrapper>
      <InputText {...defaultProps} />
    </TestWrapper>
  );
};

describe('InputText Component', () => {
  let sut: RenderResult;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('should render label correctly', () => {
      sut = makeSut({ label: 'Email Address' });
      expect(sut.getByText('Email Address')).toBeTruthy();
    });

    test('should render with placeholder', () => {
      sut = makeSut({ placeholder: 'Enter your email' });
      expect(sut.getByPlaceholderText('Enter your email')).toBeTruthy();
    });

    test('should render error text when provided', () => {
      sut = makeSut({ errorText: 'This field is required' });
      expect(sut.getByText('This field is required')).toBeTruthy();
    });

    test('should not render error text when not provided', () => {
      sut = makeSut();
      expect(sut.queryByTestId('error-text')).toBeNull();
    });

    test('should render icon when provided', () => {
      const mockIcon = <Text testID="test-icon">Icon</Text>;
      sut = makeSut({ icon: mockIcon });
      expect(sut.getByTestId('test-icon')).toBeOnTheScreen();
    });

    test('should render prefix when provided', () => {
      const mockPrefix = <Text testID="test-prefix">$</Text>;
      sut = makeSut({ prefix: mockPrefix });
      expect(sut.getByTestId('test-prefix')).toBeOnTheScreen();
    });
  });

  describe('Text Input Functionality', () => {
    test('should call onChangeText when text is entered (without mask)', () => {
      sut = makeSut();

      fireEvent.changeText(sut.getByDisplayValue(''), 'test text');

      expect(mockOnChangeText).toHaveBeenCalledWith('test text', 'test text');
    });

    test('should handle empty onChangeText prop', () => {
      sut = makeSut({ onChangeText: undefined });
      expect(() =>
        fireEvent.changeText(sut.getByDisplayValue(''), 'test')
      ).not.toThrow();
    });

    test('should render with initial value', () => {
      sut = makeSut({ value: 'Initial Value' });
      expect(sut.getByDisplayValue('Initial Value')).toBeTruthy();
    });

    test('should handle focus and blur events', () => {
      const mockOnFocus = jest.fn();
      const mockOnBlur = jest.fn();

      sut = makeSut({ onFocus: mockOnFocus, onBlur: mockOnBlur });

      fireEvent(sut.getByDisplayValue(''), 'focus');
      expect(mockOnFocus).toHaveBeenCalled();

      fireEvent(sut.getByDisplayValue(''), 'blur');
      expect(mockOnBlur).toHaveBeenCalled();
    });
  });

  describe('Masked Input Functionality', () => {
    test('should render MaskInput when mask is provided', () => {
      const mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
      sut = makeSut({ mask });

      fireEvent.changeText(sut.getByDisplayValue(''), '12/34/5678');

      expect(mockOnChangeText).toHaveBeenCalled();
    });

    test('should handle masked input changes', () => {
      const mask = [/\d/, /\d/, '/', /\d/, /\d/];
      sut = makeSut({ mask });

      fireEvent.changeText(sut.getByDisplayValue(''), '1234');

      expect(mockOnChangeText).toHaveBeenCalled();
    });
  });

  describe('Styling and Props', () => {
    test('should apply custom container style', () => {
      const customStyle = { backgroundColor: 'red' };
      sut = makeSut({ containerStyle: customStyle });

      expect(sut.getByText('Test Label')).toBeTruthy();
    });

    test('should apply custom input style', () => {
      const customStyle = { fontSize: 20 };
      sut = makeSut({ style: customStyle });

      expect(sut.getByText('Test Label')).toBeTruthy();
    });

    test('should pass through TextInput props', () => {
      sut = makeSut({
        autoCapitalize: 'none',
        keyboardType: 'email-address',
        secureTextEntry: true
      });

      expect(sut.getByText('Test Label')).toBeTruthy();
    });

    test('should handle multiline prop', () => {
      sut = makeSut({ multiline: true });
      expect(sut.getByText('Test Label')).toBeTruthy();
    });

    test('should handle editable prop', () => {
      sut = makeSut({ editable: false });
      expect(sut.getByText('Test Label')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    test('should handle null/undefined values gracefully', () => {
      sut = makeSut({
        value: null,
        errorText: undefined,
        icon: null,
        prefix: undefined
      });

      expect(sut.getByText('Test Label')).toBeTruthy();
    });

    test('should handle empty string values', () => {
      sut = makeSut({
        value: '',
        errorText: '',
        label: ''
      });

      expect(sut.getByDisplayValue('')).toBeTruthy();
    });

    test('should render both prefix and icon together', () => {
      const mockPrefix = <Text testID="test-prefix">$</Text>;
      const mockIcon = <Text testID="test-icon">Icon</Text>;

      sut = makeSut({ prefix: mockPrefix, icon: mockIcon });

      expect(sut.getByTestId('test-prefix')).toBeOnTheScreen();
      expect(sut.getByTestId('test-icon')).toBeOnTheScreen();
    });
  });

  test('should match snapshot', () => {
    sut = makeSut({
      label: 'Snapshot Label',
      placeholder: 'Snapshot Placeholder',
      errorText: 'Snapshot Error',
      icon: <Text>Icon</Text>,
      prefix: <Text>$</Text>,
      style: { fontSize: 18 },
      containerStyle: { padding: 10 },
      value: 'Snapshot Value',
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
    });
    expect(sut.toJSON()).toMatchSnapshot();
  });
});
