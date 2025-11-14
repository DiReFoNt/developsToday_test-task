export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export enum ToastType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  NONE = 'none',
}

export interface ICustomToast {
  text?: string;
  position?: ToastPosition;
  width?: string;
  showCloseButton?: boolean;
  onCloseButton?: () => void;
  variant?: 'info' | 'warning' | 'error';
  iconType?: ToastType;
  // can be Infinity or time in msec
  duration?: number;
}
