import React, { useState, useRef, useEffect, useCallback } from 'react';

import { AnimatePresence } from 'motion/react';
import Toast from '@/components/Toast/Toast.tsx';

import { ToastContext } from './ToastContext';

import type { ReactNode } from 'react';
import type { ICustomToast } from '@/components/Toast/Toast.types.ts';
import type { IToastContext } from './ToastContext';

const DEFAULT_DURATION = 3000;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ICustomToast | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hideToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback(
    (props: ICustomToast) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setToast(props);

      const duration = props.duration ?? DEFAULT_DURATION;
      if (duration !== Infinity) {
        timerRef.current = setTimeout(() => {
          hideToast();
        }, duration);
      }
    },
    [hideToast]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const contextValue: IToastContext = {
    showToast,
    hideToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <AnimatePresence>
        {toast && <Toast key="global-toast" {...toast} onClose={hideToast} />}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};
