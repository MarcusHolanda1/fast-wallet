import RegisterScreen from '@app/modules/register/screens/Register';
import HomeScreen from '@app/modules/home/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '@app/modules/wallet/screens/Wallet';
import RegisterSuccessScreen from '@app/modules/register/screens/RegisterSuccessScreen';

import { RootStackParamList } from './types';
import { CustomTransparentHeader } from './CustomHeaders';
import { CustomWalletHeader } from './CustomWalletHeader';

export const Routes = () => {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={{
          contentStyle: {
            backgroundColor: 'transparent'
          },
          gestureEnabled: true,
          animation: 'none',
          header: ({ navigation, route, options }) => (
            <CustomTransparentHeader
              title={options.title || route.name}
              navigation={navigation}
              canGoBack={navigation.canGoBack()}
            />
          )
        }}
      >
        <Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: true
          }}
        />
        <Screen
          name="RegisterSuccessScreen"
          component={RegisterSuccessScreen}
          options={{
            headerShown: true
          }}
        />
        <Screen
          name="WalletScreen"
          component={WalletScreen}
          options={{
            headerShown: true,
            header: ({ navigation, route, options }) => (
              <CustomWalletHeader
                title={options.title || route.name}
                navigation={navigation}
                canGoBack={navigation.canGoBack()}
              />
            )
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
