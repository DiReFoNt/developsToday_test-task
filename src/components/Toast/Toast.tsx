import React from 'react';
import { motion } from 'motion/react';

import { type ICustomToast, ToastType } from './Toast.types';

import CrossIcon from '@assets/icons/CrossIcon.tsx';
import InfoIcon from '@assets/icons/InfoIcon.tsx';
import WarningIcon from '@assets/icons/WarningIcon.tsx';
import ErrorIcon from '@assets/icons/ErrorIcon.tsx';

import styles from './Toast.module.scss';

interface ToastComponentProps extends ICustomToast {
  onClose?: () => void;
}

const iconByType = {
  [ToastType.INFO]: <InfoIcon />,
  [ToastType.WARNING]: <WarningIcon />,
  [ToastType.ERROR]: <ErrorIcon />,
  [ToastType.NONE]: null,
};

const Toast = (customToastData: ToastComponentProps) => {
  const {
    text,
    position = 'bottom-right',
    variant = 'info',
    width,
    showCloseButton = false,
    onClose,
    iconType = ToastType.NONE,
  } = customToastData;

  const yOffsetAppear = 30;
  const yOffsetExit = -30;

  return (
    <motion.div
      key={'toast'}
      className={`${styles.toastWrapper} ${styles[position]} ${styles[variant]}`}
      style={{ width: width ?? 'auto' }}
      initial={{
        opacity: 0,
        y: yOffsetAppear,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      }}
      exit={{
        opacity: 0,
        y: yOffsetExit,
        transition: {
          type: 'tween',
          duration: 0.2,
        },
      }}
      layout
    >
      <div className={styles.icon}>{iconByType[iconType]}</div>
      {text}
      {showCloseButton && (
        <div
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close toast"
        >
          <CrossIcon />
        </div>
      )}
    </motion.div>
  );
};

export default Toast;
