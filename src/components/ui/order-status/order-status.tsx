import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './order-status.module.scss';
import { IOrderStatusProps } from './types';

export const OrderStatus: FC<IOrderStatusProps> = memo(({ type, className = '', ...rest }) => {
  const { t } = useTranslation();

  const text = useMemo(() => {
    switch (type) {
      case 'NEW':
        return t('personal-account.order.statuses.new');
    }
  }, [type, t]);

  return (
    <div
      className={clsx(styles.container, styles[`type_${type.toLowerCase()}`], className)}
      {...rest}
    >
      {text}
    </div>
  );
});
