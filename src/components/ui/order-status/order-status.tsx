import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './order-status.module.scss';
import { IOrderStatusProps } from './types';

import { Paragraph } from '../paragraph';

export const OrderStatus: FC<IOrderStatusProps> = memo(({ type, className = '', ...rest }) => {
  const { t } = useTranslation();

  const text = useMemo(() => {
    switch (type) {
      case 'NEW':
        return t('personal-account.order.statuses.new');
      case 'IN_PROGRESS':
        return t('personal-account.order.statuses.in-progress');
      case 'READY':
        return t('personal-account.order.statuses.ready');
      case 'SENT':
        return t('personal-account.order.statuses.sent');
      case 'CANCELED':
        return t('personal-account.order.statuses.canceled');
      case 'RECEIVED':
        return t('personal-account.order.statuses.received');
    }
  }, [type, t]);

  return (
    <div
      className={clsx(styles.container, styles[`type_${type.toLowerCase()}`], className)}
      {...rest}
    >
      <div className={styles.wrapper}>
        <Paragraph className={styles.text}>{text}</Paragraph>
      </div>
    </div>
  );
});
