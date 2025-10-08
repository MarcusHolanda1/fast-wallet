import { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  LinearTransition,
  ReduceMotion
} from 'react-native-reanimated';
import CreditCard from '@app/shared/components/cards/CreditCard';
import { theme } from '@app/shared/theme/theme';
import { Card } from '@app/shared/types/card';

const STACK_OFFSET = -150;
const MOVE_DISTANCE = 200;
const DURATION_SELECTED = 1000;
const DURATION_OTHER = 1000;

interface AnimatedWalletCardProps {
  card: Card;
  index: number;
  selectedCardId: string | null;
  totalCards: number;
  colors: string[];
  onPress: () => void;
}

export default function AnimatedWalletCard({
  card,
  index,
  selectedCardId,
  totalCards,
  colors,
  onPress
}: AnimatedWalletCardProps) {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const isSelected = selectedCardId === card.id;
  const isOther = !!selectedCardId && !isSelected;
  const isLastCard = index === totalCards - 1;
  const backgroundColor = colors[index % colors.length];
  const offset = isLastCard ? STACK_OFFSET / 1.4 : STACK_OFFSET;
  const screenWidth = Dimensions.get('window').width;
  const paddingVertical = 60;
  const cardWidth = screenWidth - paddingVertical;

  const translateY = useSharedValue(0);

  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (isOther) {
      translateY.value = -MOVE_DISTANCE / 1.5;
      translateY.value = withSpring(1, {
        duration: DURATION_OTHER,
        dampingRatio: 0.5,
        overshootClamping: true,
        reduceMotion: ReduceMotion.System
      });
    } else if (isSelected) {
      translateY.value = MOVE_DISTANCE;
      translateY.value = withSpring(1, {
        duration: DURATION_SELECTED,
        dampingRatio: 0.5,
        overshootClamping: true,
        reduceMotion: ReduceMotion.System
      });
    } else {
      translateY.value = MOVE_DISTANCE;
      translateY.value = withSpring(1, {
        duration: DURATION_SELECTED,
        dampingRatio: 0.5,
        overshootClamping: true,
        reduceMotion: ReduceMotion.System
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOther, isSelected, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));

  const baseStyle = isOther
    ? {
        position: 'absolute' as const,
        left: 0,
        right: 0,
        bottom: -180,
        width: cardWidth,
        height: 180,
        opacity: 0.5
      }
    : { marginTop: offset, width: cardWidth, height: 180 };

  return (
    <AnimatedTouchable
      accessibilityRole="button"
      accessibilityLabel="Cartão"
      layout={LinearTransition.springify()}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        baseStyle,
        { zIndex: isSelected ? 100 : totalCards + index },
        animatedStyle
      ]}
    >
      <CreditCard
        card={card}
        backgroundColor={backgroundColor}
        textColor={
          backgroundColor === theme.colors.text.black
            ? theme.colors.base.white
            : theme.colors.text.black
        }
      />
    </AnimatedTouchable>
  );
}
