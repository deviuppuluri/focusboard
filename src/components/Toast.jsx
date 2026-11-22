import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  };

  const Icon = icons[toast.type] || Info;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className={`toast ${toast.type}`} role="alert" aria-live="polite">
      <Icon className={`toast-icon ${toast.type}`} aria-hidden="true" size={20} strokeWidth={2} />
      <span className="toast-message">{toast.message}</span>
      <button
        className="toast-close"
        onClick={() => onClose(toast.id)}
        aria-label="Dismiss notification"
      >
        <X size={14} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}