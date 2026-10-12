import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export function ToastContainer({ toasts, onRemove }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-xl transition-all duration-300 animate-slideUp ${
              isSuccess
                ? 'bg-surface/90 border-emerald-500/40 text-emerald-200 shadow-emerald-500/10'
                : isError
                ? 'bg-surface/90 border-rose-500/40 text-rose-200 shadow-rose-500/10'
                : 'bg-surface/90 border-primaryCyan/40 text-cyan-200 shadow-primaryCyan/10'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertTriangle className="w-5 h-5 text-rose-400" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-primaryCyan" />}
            </div>

            <div className="flex-1 text-sm font-medium leading-snug">
              {toast.message}
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="shrink-0 p-1 rounded-md text-textSecondary hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

