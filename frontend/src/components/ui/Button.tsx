import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    border: 'none',
  },
  secondary: {
    backgroundColor: '#F1F3F5',
    color: '#1A1D23',
    border: '1px solid #E5E7EB',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#3B82F6',
    border: 'none',
  },
  danger: {
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    border: 'none',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '8px',
  },
  md: {
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '12px',
  },
  lg: {
    padding: '16px 32px',
    fontSize: '18px',
    borderRadius: '12px',
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.5 : 1,
    transition: 'all 0.15s ease',
    width: fullWidth ? '100%' : 'auto',
    outline: 'none',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <button
      style={baseStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading…' : children}
    </button>
  );
};

export default Button;