import clsx from 'clsx';
import moment from 'moment';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './order-details.module.scss';
import { IOrderDetailsProps } from './types';

import { ItemOrderDetails } from '../item-order-details';
import { Button, CrossIcon, EButtonKinds, OrderStatus, Paragraph } from '../ui';
import { Tooltip } from '../ui/tooltip';

import { EOrderStatus } from '~utils';

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
        {data.status === EOrderStatus.NEW && (
          <div className={styles.btn_cancel_box}>
            <button className={styles.btn_cancel}>
              <CrossIcon className={styles.btn_cancel_icon} />
            </button>
            <Tooltip text={t('tooltip.cancel-order')} className={styles.tooltip} />
          </div>
        )}

        <OrderStatus type={data.status} className={styles.status} />
        <div className={styles.order_price_box}>
          <Paragraph className={styles.order_price}>
            {t('personal-account.order.price', { price: data.amount })}
          </Paragraph>
          <OrderStatus type={data.status} className={styles.status_mob} />
        </div>
      </div>
      <ul className={styles.list}>
        {data.content.map(item => (
          <ItemOrderDetails key={item.id} data={item} />
        ))}
      </ul>
      <Button kind={EButtonKinds.load} text={t('items.load-btn')} />
    </article>
  );
});
