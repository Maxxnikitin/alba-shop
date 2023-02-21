import clsx from 'clsx';
import { FC } from 'react';
import ReactDOM from 'react-dom';

import styles from './modal.module.scss';
import { IModalProps } from './types';

const modalRoot = document.getElementById('react-modals')!;

export const Modal: FC<IModalProps> = ({ children, onClose, className = '' }) =>
  ReactDOM.createPortal(
    <>
      <div className={clsx(styles.modal, className)}>{children}</div>
      <div className={styles.overlay} onClick={onClose} />
    </>,
    modalRoot,
  );
