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

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({ children }) => children(inset)),
    SafeAreaView: ({ children }) => children,
    SafeAreaProvider: ({ children }) => children,
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset)
  };
});

jest.mock('@react-navigation/elements', () => ({
  ...jest.requireActual('@react-navigation/elements'),
  useHeaderHeight: jest.fn(() => 0)
}));

jest.mock('react-native-reanimated', () => {
  const ActualReanimated = jest.requireActual('react-native-reanimated/mock');
  return {
    ...ActualReanimated,
    useSharedValue: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn(() => ({})),
    withSpring: jest.fn((v) => v),
    LinearTransition: { springify: jest.fn() },
    ReduceMotion: { System: false },
    createAnimatedComponent: (comp) => comp
  };
});

global.mockNavigate = mockNavigate;
global.mockGoBack = mockGoBack;
