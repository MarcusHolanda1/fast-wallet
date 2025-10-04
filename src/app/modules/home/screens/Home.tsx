import Button from '@shared/components/buttons/Button';
import { useAppNavigation } from '@shared/hooks/useNavigation';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useAppNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Fast wallet</Text>
      <Button
        onPress={() => navigation.navigate('RegisterScreen')}
        title="meus cartões"
        backgroundColor="red"
      />
      <Button
        onPress={() => navigation.navigate('RegisterScreen')}
        title="cadastrar cartão"
        backgroundColor="red"
      />
    </View>
  );
}
