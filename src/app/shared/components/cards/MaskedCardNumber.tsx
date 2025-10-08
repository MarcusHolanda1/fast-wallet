import React from 'react';
import { Text, TextStyle } from 'react-native';

interface MaskedCardNumberProps {
  number: string;
  visibleDigits?: number;
  groupSize?: number;
  maskChar?: string;
  color?: string;
  formattedVisible?: string;
  testIDPrefix?: string;
  style?: TextStyle;
}

const MaskedCardNumber: React.FC<MaskedCardNumberProps> = ({
  number,
  visibleDigits = 4,
  groupSize = 4,
  maskChar = '•',
  color = '#FFFFFF',
  formattedVisible,
  testIDPrefix,
  style
}) => {
  const clean = number.replace(/\D/g, '');
  const tail = clean.slice(-visibleDigits);
  const maskedLength = Math.max(clean.length - visibleDigits, 0);
  const maskedRaw = maskChar.repeat(maskedLength);

  const groupedMask =
    maskedRaw.match(new RegExp(`.{1,${groupSize}}`, 'g'))?.join(' ') || '';

  const visiblePart =
    formattedVisible ||
    tail.match(new RegExp(`.{1,${groupSize}}`, 'g'))?.join(' ') ||
    tail;

  const display = [groupedMask, visiblePart].filter(Boolean).join(' ').trim();

  return (
    <Text
      style={[{ color }, style]}
      testID={testIDPrefix}
      accessibilityLabel={`Final ${tail}`}
    >
      {display}
    </Text>
  );
};

export default MaskedCardNumber;
