global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn()
};

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack
    })
  };
});

jest.mock('toastify-react-native', () => ({
  Toast: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

global.mockNavigate = mockNavigate;
global.mockGoBack = mockGoBack;
