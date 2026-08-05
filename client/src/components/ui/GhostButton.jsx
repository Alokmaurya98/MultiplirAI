import React from 'react';

const GhostButton = ({ children, variant = 'brass', className = '', ...props }) => {
  const variantClass =
    variant === 'sage'
      ? 'ghost-btn ghost-btn-sage'
      : variant === 'danger'
        ? 'ghost-btn ghost-btn-danger'
        : 'ghost-btn';

  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default GhostButton;
