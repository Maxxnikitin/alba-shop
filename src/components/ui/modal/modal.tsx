import clsx from 'clsx';
import { FC, TouchEventHandler, useEffect, useRef, useState } from 'react';
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
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = e => {
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = e => {
    setCurrentY(e.touches[0].clientY);
    const modal = modalRef.current;
    const deltaY = currentY - startY;
    if (modal) {
      modal.style.transform = `translate(0, ${deltaY}px)`;
      modal.style.transition = 'none';
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
    const modal = modalRef.current;
    const deltaY = currentY - startY;

    if (deltaY > 100) {
      if (modal) {
        modal.style.transition = 'all 0.3s ease-in';
      }
      onClose?.();
    } else {
      if (modal) {
        modal.style.transform = 'translate(0, 0)';
        modal.style.transition = 'all 0.3s ease-in';
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      const handleCloseModal = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
          onClose?.();
        }
      };
      document.addEventListener('keyup', handleCloseModal);

      document.body.classList.add(styles.body);

      return () => {
        document.removeEventListener('keyup', handleCloseModal);
        document.body.classList.remove(styles.body);
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
        style={
          window.innerWidth <= 450
            ? { transform: isOpen ? 'translate(0, 0)' : 'translate(0, 100%)' }
            : {}
        }
        onTouchStart={window.innerWidth <= 450 && onClose ? handleTouchStart : undefined}
        onTouchMove={window.innerWidth <= 450 && onClose ? handleTouchMove : undefined}
        onTouchEnd={window.innerWidth <= 450 && onClose ? handleTouchEnd : undefined}
        ref={modalRef}
      >
        {withCloseBtn && <CloseButton className={styles.close_btn} onClick={onClose} />}
        {children}
      </div>
      <div className={clsx(styles.overlay, { [styles.overlay_open]: isOpen })} onClick={onClose} />
    </>,
    modalRoot,
  );
};
