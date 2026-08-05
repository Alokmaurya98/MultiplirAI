import React from 'react';

const GlassInput = React.forwardRef(({ label, error, id, className = '', ...props }, ref) => (
  <div>
    {label && (
      <label
        htmlFor={id}
        className="block text-[0.6875rem] font-medium tracking-[0.05em] uppercase text-muted mb-2"
      >
        {label}
      </label>
    )}
    <input
      ref={ref}
      id={id}
      className={`glass-input ${className}`}
      {...props}
    />
    {error && <p className="text-brick text-xs mt-1.5">{error}</p>}
  </div>
));

GlassInput.displayName = 'GlassInput';

export default GlassInput;
