import { jest } from '@jest/globals';

declare global {
  const mockNavigate: jest.Mock;
  const mockGoBack: jest.Mock;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

export {};
