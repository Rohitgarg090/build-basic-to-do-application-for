import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    backgroundColor: '#F1F3F5',
    color: '#6B7280',
  },
  primary: {
    backgroundColor: '#EBF2FF',
    color: '#3B82F6',
  },
  success: {
    backgroundColor: '#ECFDF5',
    color: '#22C55E',
  },
  warning: {
    backgroundColor: '#FFFBEB',
    color: '#F59E0B',
  },
  error: {
    backgroundColor: '#FEF2F2',
    color: '#EF4444',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  style,
}) => {
  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '9999px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...style,
  };

  return <span style={badgeStyle}>{children}</span>;
};

export default Badge;