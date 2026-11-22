import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}) {
  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="modal confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body" style={{ textAlign: 'center', paddingTop: '24px' }}>
          <div className="confirm-icon" aria-hidden="true">
            <AlertTriangle size={24} strokeWidth={2} />
          </div>
          <h3 id="confirm-title" className="confirm-title">{title}</h3>
          <p className="confirm-message">{message}</p>
        </div>
        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${variant === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => { onConfirm(); onClose(); }}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}