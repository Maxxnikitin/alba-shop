import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './confirmed-order-modal.module.scss';

import { IConfirmedOrderModalProps } from './types';

import image from '../../images/confirmed-order.svg';
import { Button, EButtonKinds, Modal, Paragraph, Title } from '../ui';

import { useNavigateToMain } from '~utils';

const orderNum = 123123;

export const ConfirmedOrderModal: FC<IConfirmedOrderModalProps> = memo(
  ({ className = '', onClose, ...rest }) => {
    const { t } = useTranslation();

    const { handleNavigateToMainClick } = useNavigateToMain();

    return (
      <Modal className={clsx(styles.container, className)} onClose={onClose} {...rest}>
        <>
          <img className={styles.img} src={image} alt={t('alts.confirmed-order') || ''} />
          <Title className={styles.title}>{t('orders.conformed-title')}</Title>
          <Paragraph className={styles.order_text}>
            {t('orders.conformed-order-number-text')} <b>{orderNum}</b>
          </Paragraph>
          <Paragraph className={styles.wait_call_text}>{t('orders.wait-call-text')}</Paragraph>
          <Button
            className={styles.btn}
            text={t('orders.btn')}
            kind={EButtonKinds.order}
            onClick={handleNavigateToMainClick}
          />
        </>
      </Modal>
    );
  },
);
