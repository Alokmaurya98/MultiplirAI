import React from 'react';

const GlassToast = ({ message, type = 'success', children }) => {
  const borderColor = type === 'error' ? '#C1554A' : '#7FA98F';

  return (
    <div
      className="glass-toast motion-safe:animate-toast-enter"
      style={{ borderLeft: `3px solid ${borderColor}` }}
      role="alert"
    >
      <p className="text-cream text-sm">{message || children}</p>
    </div>
  );
};

export default GlassToast;
