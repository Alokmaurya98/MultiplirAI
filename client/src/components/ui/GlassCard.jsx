import React from 'react';

const GlassCard = ({ children, className = '', hover = false, as: Tag = 'div', ...props }) => (
  <Tag
    className={`glass ${hover ? 'glass-hover' : ''} ${className}`}
    {...props}
  >
    {children}
  </Tag>
);

export default GlassCard;
