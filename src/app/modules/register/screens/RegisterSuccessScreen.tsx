import { Text, View } from 'react-native';
import { theme } from '@app/shared/theme/theme';

export default function RegisterSuccessScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#4444',
        paddingHorizontal: 20,
        paddingTop: 100,
        paddingBottom: 40
      }}
    >
      <Text
        style={{
          fontSize: theme.typography.h1.fontSize,
          textAlign: 'center',
          color: 'white',
          marginBottom: 60
        }}
      >
        cartão cadastrado com sucesso
      </Text>
    </View>
  );
}
