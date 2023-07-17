import clsx from 'clsx';
import moment from 'moment';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './order-details.module.scss';
import { IOrderDetailsProps } from './types';

import { Button, EButtonKinds, EOrderStatus, OrderStatus, Paragraph } from '../ui';
import { Tooltip } from '../ui/tooltip';

export const OrderDetails: FC<IOrderDetailsProps> = memo(({ data, className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <article className={clsx(styles.container, className)} {...rest}>
      <div className={styles.row}>
        <div className={styles.order_num_box}>
          <Paragraph className={styles.order_num}>
            {t('personal-account.order.number', { number: data.id })}
          </Paragraph>
          <Paragraph className={styles.order_date}>
            {t('personal-account.order.date', {
              date: moment(data.created).format('Do MMMM YYYY'),
            })}
          </Paragraph>
        </div>
        <div className={styles.btn_close_box}>
          <button className={styles.btn_close} />
          <Tooltip text={t('tooltip.cancel-order')} className={styles.tooltip} />
        </div>

        <OrderStatus type={data.status as EOrderStatus} className={styles.status} />
        <div className={styles.order_price_box}>
          <Paragraph className={styles.order_price}>
            {t('personal-account.order.price', { price: data.amount })}
          </Paragraph>
          <OrderStatus type={data.status as EOrderStatus} className={styles.status_mob} />
        </div>
      </div>
      <ul className={styles.list}>
        {data.content.map(item => (
          <p key={item.id}>{item.characteristic.name}</p>
        ))}
      </ul>
      <Button kind={EButtonKinds.load} text={t('items.load-btn')} />
    </article>
  );
});
