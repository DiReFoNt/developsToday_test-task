import type { ICustomToast } from '@/components/Toast/Toast.types.ts';
import { createContext } from 'react';

type ShowToastProps = ICustomToast;

export interface IToastContext {
  showToast: (props: ShowToastProps) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<IToastContext | undefined>(undefined);
