export interface ColorPalette {
  text: {
    black: string;
    grey: string;
    greyDark: string;
  };
  base: {
    white: string;
    greenLight: string;
    blueDark: string;
    blueLight: string;
    greyLight: string;
  };
  alert: {
    yellow: string;
    red: string;
    green: string;
  };
}

export interface FontStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight?: '400' | '500' | '600' | '700';
}

export interface Typography {
  h1: FontStyle;
  h2: FontStyle;
  h3: FontStyle;
  h4: FontStyle;
  h5: FontStyle;
  p: FontStyle;
  pSmall: FontStyle;
}

export interface AppTheme {
  colors: ColorPalette;
  typography: Typography;
}
