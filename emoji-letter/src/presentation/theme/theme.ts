export const colors = {
  background: '#14121F',
  surface: '#1E1B2E',
  surfaceAlt: '#2A2640',
  surfaceHover: '#352F52',
  accent: '#FFB703',
  accentText: '#1A1400',
  secondary: '#9B8CFF',
  text: '#F7F4FF',
  textMuted: '#A89BBF',
  border: '#3A3554',
  success: '#6FCF97',
  danger: '#FF6B8A',
  chipInactive: '#2A2640',
} as const;

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  emoji: {
    fontSize: 30,
  },
  emojiLarge: {
    fontSize: 36,
  },
};
