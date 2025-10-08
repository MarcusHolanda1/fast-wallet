import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@shared/theme/theme';
import { Card } from '@app/shared/types/card';

interface CreditCardProps {
  card: Card;
  backgroundColor?: string;
  textColor?: string;
}

export default function CreditCard({
  card,
  backgroundColor,
  textColor
}: CreditCardProps) {
  return (
    <View style={[styles.cardContainer, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.cardType, { color: textColor }]}>{card.id}</Text>

      <View style={styles.cardContent}>
        <Text style={[styles.cardholderName, { color: textColor }]}>
          {card.name}
        </Text>
        <Text style={[styles.cardNumber, { color: textColor }]}>
          {card.number}
        </Text>
        <Text style={[styles.expiryDate, { color: textColor }]}>
          Validade {card.expires}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 200,
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 40,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  cardType: {
    ...theme.typography.h5,
    marginBottom: 3
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  cardholderName: {
    ...theme.typography.p,
    marginBottom: 3
  },
  cardNumber: {
    ...theme.typography.pSmall,
    marginBottom: 3
  },
  expiryDate: {
    ...theme.typography.pSmall
  }
});
