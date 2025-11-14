import React, { type ReactNode } from 'react';
import styles from './Sidebar.module.scss';
import { AnimatePresence, motion } from 'motion/react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode | string;
  footer?: ReactNode | string;
  children?: ReactNode;
}

const Sidebar = (props: IProps) => {
  const { isOpen, onClose, header, footer, children } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className={styles.outer} onClick={onClose}>
            <motion.div
              className={styles.wrapper}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              initial={{
                x: '100%',
                transition: { type: 'tween', duration: 0.3, ease: 'easeIn' },
              }}
              animate={{
                x: 0,
                transition: { type: 'tween', duration: 0.3, ease: 'easeOut' },
              }}
              exit={{
                x: '100%',
                transition: { type: 'tween', duration: 0.3, ease: 'easeIn' },
              }}
            >
              <div className={styles.header}>{header}</div>
              <div className={styles.content}>{children}</div>
              <div className={styles.footer}>{footer}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
