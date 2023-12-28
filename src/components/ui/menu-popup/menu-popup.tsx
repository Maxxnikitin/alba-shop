import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './menu-popup.module.scss';
import { IMenuPopupProps } from './types';

import { BackButton } from '../back-button';
import { CloseButton } from '../close-button';
import { Paragraph } from '../paragraph';

export const MenuPopup: FC<IMenuPopupProps> = memo(
  ({
    children,
    onClose,
    handleCloseAllModals,
    className = '',
    overlayClassName = '',
    title,
    isBackBtn = false,
    isOverlay = true,
    ...rest
  }) => (
    <>
      <div className={clsx(styles.container, className)} {...rest}>
        <div className={styles.header}>
          {isBackBtn ? (
            <BackButton onClick={onClose} iconClassName={styles.icon_color} />
          ) : (
            <Paragraph />
          )}
          <Paragraph className={styles.title}>{title}</Paragraph>
          <CloseButton onClick={handleCloseAllModals} iconClassName={styles.icon_color} />
        </div>
        {children}
      </div>
      {isOverlay && (
        <div className={clsx(styles.overlay, overlayClassName)} onClick={handleCloseAllModals} />
      )}
    </>
  ),
);
