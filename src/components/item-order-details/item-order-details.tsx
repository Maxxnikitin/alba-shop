import clsx from 'clsx';
import 'moment/locale/ru';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './item-order-details.module.scss';
import { IItemOrderDetailsProps } from './types';

import { Paragraph } from '../ui';

export const ItemOrderDetails: FC<IItemOrderDetailsProps> = memo(
  ({ data, className = '', ...rest }) => {
    const { t } = useTranslation();

    return (
      <li className={clsx(styles.container, className)} {...rest}>
        <img className={styles.img} src={data.characteristic.photo[0]} alt={t('alts.item') || ''} />
        <div className={styles.main_box}>
          <div className={styles.desc}>
            <Paragraph className={styles.name}>{data.characteristic.name}</Paragraph>
            <Paragraph className={styles.desc_text}>{data.characteristic.color}</Paragraph>
          </div>
          <div className={styles.price_box}>
            <Paragraph className={styles.count}>{`${data.amount} х ${
              data.characteristic.price.split('.')[0]
            }₽`}</Paragraph>
            <Paragraph className={styles.price}>{`${data.quantity} ₽`}</Paragraph>
          </div>
        </div>
      </li>
    );
  },
);
