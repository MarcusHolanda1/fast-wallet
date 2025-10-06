import { store } from '@app/store';
import { Routes } from '@shared/navigation/Router';
import { Provider } from 'react-redux';
import ToastManager from 'toastify-react-native';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <ToastManager />
    </Provider>
  );
}
