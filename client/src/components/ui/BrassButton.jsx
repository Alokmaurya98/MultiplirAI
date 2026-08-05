import React from 'react';

const BrassButton = ({ children, className = '', ...props }) => (
  <button className={`brass-btn ${className}`} {...props}>
    {children}
  </button>
);

export default BrassButton;
