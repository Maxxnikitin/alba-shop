import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './modal-small.module.scss';

import { IModalSmallProps } from './types';

import { Button, EButtonKinds, EModalSize, Modal, Paragraph, Title } from '../ui';

export const ModalSmall: FC<IModalSmallProps> = memo(
  ({
    title,
    isOpen,
    text,
    successBtnText,
    cancellBtnText,
    className = '',
    withCloseBtn,
    onClose,
    onSuccess,
    ...rest
  }) => (
    <Modal
      className={clsx(styles.container, className)}
      isOpen={isOpen}
      onClose={onClose}
      modalSize={EModalSize.SMALL}
      withCloseBtn={withCloseBtn}
      {...rest}
    >
      <>
        <Title className={styles.title}>{title}</Title>
        <Paragraph className={styles.text}>{text}</Paragraph>
        <div className={styles.btn_box}>
          {successBtnText && (
            <Button className={styles.btn} text={successBtnText} onClick={onSuccess} />
          )}
          {cancellBtnText && (
            <Button
              className={styles.btn}
              text={cancellBtnText}
              onClick={onClose}
              kind={EButtonKinds.mainSlide}
            />
          )}
        </div>
      </>
    </Modal>
  ),
);
