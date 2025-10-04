import RegisterScreen from '@app/modules/register/screens/Register';
import HomeScreen from '@app/modules/home/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const Routes = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

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
      </Navigator>
    </NavigationContainer>
  );
};
