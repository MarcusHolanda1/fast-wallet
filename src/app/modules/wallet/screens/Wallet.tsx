import { useAppSelector } from '@app/store/hooks';
import { Text, View } from 'react-native';
import PageContainer from '@app/shared/components/containers/PageContainer';

import useGetCards from '../hooks/useGetCards';

export default function WalletScreen() {
  const { isLoading } = useGetCards();

  const cards = useAppSelector((state) => state.cards.cards);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <PageContainer showWalletHeader={true} showTitle={false}>
      <Text>Meus cartões</Text>

      {cards.map((card) => (
        <View key={card.id} style={{ marginTop: 20 }}>
          <Text>Número: {card.number}</Text>
          <Text>Nome: {card.name}</Text>
          <Text>Validade: {card.expires}</Text>
        </View>
      ))}
    </PageContainer>
  );
}
