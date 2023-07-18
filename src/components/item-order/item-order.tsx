import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './item-order.module.scss';
import { IItemOrderProps } from './types';

import { Button, EButtonKinds, OrderStatus, Paragraph } from '../ui';

export const ItemOrder: FC<IItemOrderProps> = memo(({ data, onClick, className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <li className={clsx(styles.container, className)} {...rest}>
      <div className={styles.row_first}>
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
        <Paragraph className={styles.order_amount}>
          {t('personal-account.order.amount', { amount: data.content.length })}
        </Paragraph>
        <div className={styles.order_price_box}>
          <Paragraph className={styles.order_price}>
            {t('personal-account.order.price', { price: data.amount })}
          </Paragraph>
          <OrderStatus type={data.status} className={styles.status_mob} />
        </div>
      </div>
      <div className={styles.row_second}>
        <OrderStatus type={data.status} className={styles.status} />
        <ul className={styles.photos}>
          {data.content.slice(0, 3).map(item => (
            <img
              className={styles.photos_photo}
              key={item.id}
              src={item.characteristic.photo[0]}
              alt={t('alts.item') || ''}
            />
          ))}
        </ul>
        <Button
          className={styles.btn}
          onClick={onClick}
          kind={EButtonKinds.textOnly}
          id={data.id.toString()}
          text={t('personal-account.order.btn')}
        />
      </div>
    </li>
  );
});
