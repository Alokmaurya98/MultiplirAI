import React, { useEffect, useRef } from 'react';

const GlassModal = ({ open, onClose, title, children }) => {
  const panelRef = useRef(null);

  /* Trap focus inside modal & close on Escape */
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    /* Prevent body scroll */
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 glass-overlay" onClick={onClose} />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative glass p-8 max-w-lg w-full opacity-0 motion-safe:animate-modal-enter motion-reduce:opacity-100"
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-cream transition-colors p-1"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {title && (
          <h3
            className="font-display text-cream text-xl mb-5 tracking-tight pr-8"
            style={{ fontWeight: 500 }}
          >
            {title}
          </h3>
        )}

        {children}
      </div>
    </div>
  );
};

export default GlassModal;
