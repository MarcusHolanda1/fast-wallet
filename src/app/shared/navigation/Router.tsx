import RegisterScreen from '@app/modules/register/screens/Register';
import HomeScreen from '@app/modules/home/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps
} from '@react-navigation/native-stack';
import WalletScreen from '@app/modules/wallet/screens/Wallet';
import RegisterSuccessScreen from '@app/modules/register/screens/RegisterSuccessScreen';

import { RootStackParamList } from './types';
import { CustomTransparentHeader } from './CustomTransparentHeaders';
import { CustomWalletHeader } from './CustomWalletHeader';

const WalletHeader = (props: NativeStackHeaderProps) => (
  <CustomWalletHeader
    navigation={props.navigation}
    onPlusPress={() => props.navigation.navigate('RegisterScreen')}
    canGoBack={props.navigation.canGoBack()}
  />
);

const CustomHeader = (props: NativeStackHeaderProps) => (
  <CustomTransparentHeader
    title={props.options.title ?? ''}
    navigation={props.navigation}
    canGoBack={props.navigation.canGoBack()}
  />
);

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
          headerTransparent: true,
          header: CustomHeader
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
            headerShown: true,
            title: 'Cadastro'
          }}
        />
        <Screen
          name="RegisterSuccessScreen"
          component={RegisterSuccessScreen}
          options={{
            headerShown: true,
            title: 'Cadastro'
          }}
        />
        <Screen
          name="WalletScreen"
          component={WalletScreen}
          options={{
            headerShown: false,
            headerTransparent: false,
            title: 'Minha Carteira',
            header: WalletHeader
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
