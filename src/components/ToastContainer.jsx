import React from 'react';
import Toast from './Toast';

export default function ToastContainer({ toasts, onClose }) {
  return (
    <div className="toast-container" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}