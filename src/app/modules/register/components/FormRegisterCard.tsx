import Button from '@shared/components/buttons/Button';
import InputText from '@shared/components/inputs/InputText';
import { useAppNavigation } from '@shared/hooks/useNavigation';
import { theme } from '@shared/theme/theme';
import { Text, View } from 'react-native';

const FormRegisterCard = () => {
  const navigation = useAppNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#121212',
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
        Wallet Test
      </Text>

      <View style={{ flex: 1 }}>
        <InputText label="número do cartão" style={{ marginBottom: 20 }} />
        <InputText
          label="nome do titular do cartão"
          style={{ marginBottom: 20 }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 40
          }}
        >
          <View style={{ flex: 0.45 }}>
            <InputText label="vencimento" placeholder="00/00" />
          </View>
          <View style={{ flex: 0.45 }}>
            <InputText label="código de segurança" placeholder="***" />
          </View>
        </View>
      </View>

      <Button
        onPress={() => navigation.navigate('RegisterScreen')}
        title="avançar"
        backgroundColor="red"
      />
    </View>
  );
};

export default FormRegisterCard;
