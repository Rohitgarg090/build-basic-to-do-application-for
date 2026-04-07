export const tokens = {
  colors: {
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
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSizeBase: '16px',
    fontSizeSm: '14px',
    fontSizeLg: '18px',
    fontSizeXl: '24px',
    fontSizeXxl: '32px',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightSemibold: '600',
    fontWeightBold: '700',
    lineHeight: '1.5',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
} as const;

export type Tokens = typeof tokens;
export default tokens;