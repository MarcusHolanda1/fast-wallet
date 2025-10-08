import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@shared/theme/theme';
import { Card } from '@app/shared/types/card';
import { formatCardNumber } from '@app/shared/utils/replaces';

import MaskedCardNumber from './MaskedCardNumber';

interface CreditCardProps {
  card: Card;
  backgroundColor?: string;
  textColor?: string;
  testID?: string;
}

export default function CreditCard({
  card,
  backgroundColor,
  textColor,
  testID
}: CreditCardProps) {
  const renderCardNameByBackgroundColor = () => {
    if (!backgroundColor) return card.name;

    if (backgroundColor === theme.colors.base.greenLight) {
      return 'Green';
    }
    return 'Black';
  };

  return (
    <View
      testID={testID || `credit-card-${card.id}`}
      style={[styles.cardContainer, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.cardType, { color: textColor }]}>
        {renderCardNameByBackgroundColor()}
      </Text>

      <View style={styles.cardContent}>
        <Text style={[styles.cardholderName, { color: textColor }]}>
          {card.name}
        </Text>
        <MaskedCardNumber
          number={card.number}
          formattedVisible={formatCardNumber(card.number)}
          color={textColor || '#FFFFFF'}
          testIDPrefix={`credit-card-${card.id}-number`}
          style={styles.cardNumber}
        />
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
    marginBottom: 3,
    letterSpacing: 1
  },
  expiryDate: {
    ...theme.typography.pSmall
  }
});
