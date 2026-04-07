import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  elevated?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const paddingMap = {
  sm: '12px',
  md: '16px',
  lg: '24px',
};

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  elevated = false,
  style,
  onClick,
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: paddingMap[padding],
    border: elevated ? 'none' : '1px solid #E5E7EB',
    boxShadow: elevated ? '0 4px 6px rgba(0, 0, 0, 0.07)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'box-shadow 0.15s ease',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;