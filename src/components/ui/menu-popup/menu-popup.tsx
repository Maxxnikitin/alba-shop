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
    title,
    isBackBtn = false,
    isOverlay = true,
    ...rest
  }) => {
    console.log('q');

    return (
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
        {isOverlay && <div className={styles.overlay} onClick={onClose} />}
      </>
    );
  },
);
