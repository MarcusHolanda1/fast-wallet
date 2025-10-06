import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@shared/theme/theme';

interface CreditCardProps {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cardType: string;
  backgroundColor: string;
  textColor: string;
}

export default function CreditCard({
  cardholderName,
  cardNumber,
  expiryDate,
  cardType,
  backgroundColor,
  textColor
}: CreditCardProps) {
  return (
    <View style={[styles.cardContainer, { backgroundColor: backgroundColor }]}>
      <Text style={styles.cardType}>{cardType}</Text>

      <View style={styles.cardContent}>
        <Text style={[styles.cardholderName, { color: textColor }]}>
          {cardholderName}
        </Text>
        <Text style={[styles.cardNumber, { color: textColor }]}>
          {cardNumber}
        </Text>
        <Text style={[styles.expiryDate, { color: textColor }]}>
          Validade {expiryDate}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 180,
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 30,
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
    fontSize: theme.typography.h5.fontSize,
    fontWeight: '600',
    marginBottom: 3
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  cardholderName: {
    fontSize: theme.typography.p.fontSize,
    fontWeight: '500',
    marginBottom: 3
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 2
  },
  expiryDate: {
    fontSize: 14,
    fontWeight: '400'
  }
});
