import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './item-order.module.scss';
import { IItemOrderProps } from './types';

import { Button, EButtonKinds, OrderStatus, Paragraph } from '../ui';

export const ItemOrder: FC<IItemOrderProps> = memo(({ data, className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <li className={clsx(styles.container, className)} {...rest}>
      <div className={styles.row_first}>
        <div className={styles.order_num_box}>
          <Paragraph className={styles.order_num}>
            {t('personal-account.order.number', { number: data.id })}
          </Paragraph>
          <Paragraph className={styles.order_date}>
            {t('personal-account.order.date', { date: data.created })}
          </Paragraph>
        </div>
        <Paragraph className={styles.order_amount}>
          {t('personal-account.order.amount', { amount: data.content.length })}
        </Paragraph>
        <Paragraph className={styles.order_price}>
          {t('personal-account.order.price', { price: data.amount })}
        </Paragraph>
      </div>
      <div className={styles.row_second}>
        <OrderStatus type={data.status} className={styles.status} />
        <ul className={styles.photos}>
          {data.content.map(item => (
            <img
              className={styles.photos_photo}
              key={item.id}
              src={item.characteristic.photo[0]}
              alt={t('alts.item') || ''}
            />
          ))}
        </ul>
        <Button kind={EButtonKinds.textOnly} text={t('personal-account.order.btn')} />
      </div>
    </li>
  );
});
