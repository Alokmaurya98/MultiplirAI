import React from 'react';

const SkeletonLoader = ({ className = '', style, ...props }) => (
  <div className={`skeleton ${className}`} style={style} {...props} />
);

export default SkeletonLoader;
