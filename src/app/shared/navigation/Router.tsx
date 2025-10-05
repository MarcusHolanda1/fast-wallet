import RegisterScreen from '@app/modules/register/screens/Register';
import HomeScreen from '@app/modules/home/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '@app/modules/wallet/screens/Wallet';
import RegisterSuccessScreen from '@app/modules/register/screens/RegisterSuccessScreen';

import { RootStackParamList } from './types';

export const Routes = () => {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent'
          },
          gestureEnabled: false,
          animation: 'none'
        }}
      >
        <Screen name="HomeScreen" component={HomeScreen} />
        <Screen name="RegisterScreen" component={RegisterScreen} />
        <Screen
          name="RegisterSuccessScreen"
          component={RegisterSuccessScreen}
        />
        <Screen name="WalletScreen" component={WalletScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
