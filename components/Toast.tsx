'use client';

import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const toastStyles: Record<NonNullable<ToastProps['type']>, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-700',
  info: 'border-primary/20 bg-white text-slate-700',
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed top-24 right-4 left-4 md:left-auto md:right-6 z-[70] md:w-[420px] pointer-events-none">
      <div
        className={`pointer-events-auto rounded-xl border px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-sm ${toastStyles[type]}`}
      >
        <div className="flex items-start gap-3">
          <p className="text-sm leading-relaxed">{message}</p>
          <button
            aria-label="Close notification"
            onClick={onClose}
            className="ml-auto text-current/60 hover:text-current transition-colors"
          >
            <span className="material-icons text-base">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
