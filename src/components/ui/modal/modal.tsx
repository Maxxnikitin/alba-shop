import clsx from 'clsx';
import { FC, TouchEventHandler, useCallback, useEffect, useRef, useState } from 'react';
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
  closeIcon,
  withCloseBtn,
  className = '',
  closeBtnClassName,
  ...rest
}) => {
  const [isRender, setIsRender] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = e => {
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = e => {
    /**
     *  в фильтрах есть бегунок для установки суммы, который тоже на touchMove-е сделан,
     *  и из-за этого срабатывает закрытие модалки. Здесь мы это предотвращаем.
     *  (пока закомментил, потому что ниже в целом блокируем свайп на этой модалке)
     * */
    // if ((e.touches[0].target as HTMLDivElement).classList.contains('rc-slider-handle')) {
    //   return;
    // }

    /**
     *  в фильтрах есть скролл, из-за этого при прокручивании фильтров вверх модалка закрывается.
     *  пока что отказываемся от закрытия по свайпу в данном случае
     * */

    if ((e.touches[0].target as HTMLDivElement).closest('#filters-modal')) {
      return;
    }

    if (currentY < startY) return;

    setCurrentY(e.touches[0].clientY);
    const modal = modalRef.current;
    const overlay = overlayRef.current;

    const deltaY = currentY - startY;
    const percent = deltaY / window.innerHeight;

    if (modal && overlay) {
      modal.style.transform = `translate(0, ${deltaY}px)`;
      modal.style.transition = 'none';
      overlay.style.opacity = (1 - Math.round(percent * 10) / 10).toString();
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = e => {
    if ((e.target as HTMLDivElement).classList.contains('rc-slider-handle')) {
      return;
    }
    const modal = modalRef.current;
    const deltaY = currentY - startY;

    if (deltaY > 100) {
      if (modal) {
        modal.style.transition = 'all 0.3s ease-in';
      }
      handleClose();
    } else {
      if (modal) {
        modal.style.transform = 'translate(0, 0)';
        modal.style.transition = 'all 0.3s ease-in';
      }
    }
  };

  const handleClose = useCallback(() => {
    setIsRender(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const handleCloseModal = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
          handleClose();
        }
      };
      document.addEventListener('keyup', handleCloseModal);

      document.body.classList.add(styles.body);

      const timerId = setTimeout(() => {
        setIsRender(true);
      }, 0);

      return () => {
        document.removeEventListener('keyup', handleCloseModal);
        document.body.classList.remove(styles.body);
        clearTimeout(timerId);
      };
    }
  }, [handleClose, isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={clsx(styles.modal, className, {
          [styles.modal_open]: isRender,
          [styles.modal_small]: modalSize === EModalSize.SMALL,
        })}
        style={
          window.innerWidth <= 450
            ? { transform: isRender ? 'translate(0, 0)' : 'translate(0, 100vh)' }
            : {}
        }
        onTouchStart={window.innerWidth <= 450 && onClose ? handleTouchStart : undefined}
        onTouchMove={window.innerWidth <= 450 && onClose ? handleTouchMove : undefined}
        onTouchEnd={window.innerWidth <= 450 && onClose ? handleTouchEnd : undefined}
        ref={modalRef}
        {...rest}
      >
        {withCloseBtn && (
          <CloseButton
            className={clsx(styles.close_btn, closeBtnClassName)}
            onClick={handleClose}
            icon={closeIcon}
          />
        )}
        {children}
      </div>
      <div
        className={clsx(styles.overlay, { [styles.overlay_open]: isRender })}
        ref={overlayRef}
        onClick={handleClose}
      />
    </>,
    modalRoot,
  );
};
