import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const ToastContext = createContext();

/* ── Individual toast ──────────────────────────────────── */

const Toast = ({ id, message, type = 'success', duration = 4000, onDismiss }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(tick);
        onDismiss(id);
      }
    }, 50);
    return () => clearInterval(tick);
  }, [id, duration, onDismiss]);

  const borderColor = type === 'error' ? '#C1554A' : '#7FA98F';

  return (
    <div
      className="glass-toast motion-safe:animate-toast-enter"
      style={{ borderLeft: `3px solid ${borderColor}` }}
      role="alert"
    >
      <p className="text-cream text-sm">{message}</p>
      <div
        className="mt-2 h-0.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(212,224,213,0.08)' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: '#C9A15A',
            transition: 'width 100ms linear',
          }}
        />
      </div>
    </div>
  );
};

/* ── Provider ──────────────────────────────────────────── */

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-auto">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
