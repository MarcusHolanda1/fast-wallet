import { theme } from '@app/shared/theme/theme';
import { forwardRef } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface BackgroundRectangleProps {
  style?: StyleProp<ViewStyle>;
  rotation?: string;
}

export const BackgroundRectangle = forwardRef<View, BackgroundRectangleProps>(
  ({ style, rotation }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.container,
          style,
          {
            transform: [
              {
                rotate: rotation || '0deg'
              }
            ]
          }
        ]}
      />
    );
  }
);
BackgroundRectangle.displayName = 'BackgroundRectangle';

const styles = StyleSheet.create({
  container: {
    width: 349.21,
    height: 800,
    backgroundColor: theme.colors.base.white,
    opacity: 0.2
  }
});

export default BackgroundRectangle;
