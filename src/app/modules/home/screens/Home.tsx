import PageContainer from '@app/shared/components/containers/PageContainer';
import { theme } from '@app/shared/theme/theme';
import Button from '@shared/components/buttons/Button';
import { useAppNavigation } from '@app/shared/hooks/useAppNavigation';
import { View } from 'react-native';

export default function HomeScreen() {
  const navigation = useAppNavigation();

  return (
    <PageContainer>
      <Button
        onPress={() => navigation.navigate('WalletScreen')}
        title="meus cartões"
        backgroundColor={theme.colors.base.blueLight}
        textColor={theme.colors.base.white}
      />
      <View style={{ height: 20 }} />
      <Button
        onPress={() => navigation.navigate('RegisterScreen')}
        title="cadastrar cartão"
        backgroundColor={theme.colors.base.greenLight}
        textColor={theme.colors.base.blueDark}
      />
    </PageContainer>
  );
}
