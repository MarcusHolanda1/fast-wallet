import { store } from '@app/store';
import { Routes } from '@shared/navigation/Router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import ToastManager from 'toastify-react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Routes />
        <ToastManager />
      </Provider>
    </SafeAreaProvider>
  );
}
