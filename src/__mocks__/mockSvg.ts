import * as React from 'react';
import { View, ViewProps } from 'react-native';

const SvgMock = React.forwardRef<View, ViewProps>((props, ref) =>
  React.createElement(View, { ...props, ref, testID: 'svg-mock' })
);
// Added display name for ESLint react/display-name rule
SvgMock.displayName = 'SvgMock';

export default SvgMock;
