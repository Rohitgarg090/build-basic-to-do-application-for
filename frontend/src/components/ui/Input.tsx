import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  style,
  ...props
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#1A1D23',
    fontFamily: 'Inter, system-ui, sans-serif',
  };

  const inputStyle: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '16px',
    fontFamily: 'Inter, system-ui, sans-serif',
    backgroundColor: '#FFFFFF',
    border: `1px solid ${error ? '#EF4444' : '#E5E7EB'}`,
    borderRadius: '12px',
    color: '#1A1D23',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    width: '100%',
    ...style,
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#EF4444',
    fontFamily: 'Inter, system-ui, sans-serif',
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input style={inputStyle} {...props} />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
};

export default Input;