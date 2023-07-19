import clsx from 'clsx';
import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './modal.module.scss';
import { EModalSize, IModalProps } from './types';

import { CloseButton } from '../close-button';

const modalRoot = document.getElementById('react-modals')!;

export const Modal: FC<IModalProps> = ({
  children,
  modalSize = EModalSize.NORMAL,
  isOpen,
  onClose,
  withCloseBtn,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      const handleCloseModal = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
          onClose?.();
        }
      };
      document.addEventListener('keyup', handleCloseModal);

      return () => {
        document.removeEventListener('keyup', handleCloseModal);
      };
    }
  }, [onClose, isOpen]);

  return ReactDOM.createPortal(
    <>
      <div
        className={clsx(styles.modal, className, {
          [styles.modal_open]: isOpen,
          [styles.modal_small]: modalSize === EModalSize.SMALL,
        })}
      >
        {withCloseBtn && <CloseButton className={styles.close_btn} onClick={onClose} />}
        {children}
      </div>
      <div className={clsx(styles.overlay, { [styles.overlay_open]: isOpen })} onClick={onClose} />
    </>,
    modalRoot,
  );
};
