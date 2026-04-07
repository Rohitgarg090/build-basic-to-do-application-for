import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#3B82F6',
  primaryFg: '#FFFFFF',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F3F5',
  text: '#1A1D23',
  textMuted: '#6B7280',
  accent: '#6366F1',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  border: '#E5E7EB',
} as const;

export const typography = {
  fontSizeXs: 12,
  fontSizeSm: 14,
  fontSizeBase: 16,
  fontSizeLg: 18,
  fontSizeXl: 24,
  fontSizeXxl: 32,
  fontWeightNormal: '400' as const,
  fontWeightMedium: '500' as const,
  fontWeightSemibold: '600' as const,
  fontWeightBold: '700' as const,
  lineHeight: 1.5,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const shadows = StyleSheet.create({
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
});

export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Tokens = typeof tokens;

export default tokens;