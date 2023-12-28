import clsx from 'clsx';
import 'moment/locale/ru';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useLocation, useNavigate } from 'react-router-dom';

import styles from './item-order-details.module.scss';
import { IItemOrderDetailsProps } from './types';

import { Paragraph } from '../ui';

import { normalizeItemUrl } from '~utils';

export const ItemOrderDetails: FC<IItemOrderDetailsProps> = memo(
  ({ data, className = '', ...rest }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleCardClick = () => {
      navigate(
        `${normalizeItemUrl(pathname)}/${data.characteristic.product_id}?characteristicId=${
          data.characteristic.id
        }`,
      );
    };

    return (
      <li className={clsx(styles.container, className)} {...rest}>
        <LazyLoadImage
          className={styles.img}
          src={data.characteristic.photo.front}
          alt={t('alts.item') || ''}
          onClick={handleCardClick}
        />
        <div className={styles.main_box}>
          <div className={styles.desc} onClick={handleCardClick}>
            <Paragraph className={styles.name}>{data.characteristic.name}</Paragraph>
            <Paragraph className={styles.desc_text}>{data.characteristic.color}</Paragraph>
          </div>
          <div className={styles.price_box}>
            <Paragraph className={styles.count}>{`${
              data.quantity
            } х ${+data.final_price}₽`}</Paragraph>
            <Paragraph className={styles.price}>{`${+data.final_amount} ₽`}</Paragraph>
          </div>
        </div>
      </li>
    );
  },
);
