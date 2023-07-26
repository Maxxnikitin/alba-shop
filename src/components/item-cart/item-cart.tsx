import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './item-cart.module.scss';
import { IItemCartProps } from './types';

import { CloseButton, Paragraph, RemoveCrossIcon } from '../ui';

export const ItemCart: FC<IItemCartProps> = memo(
  ({ data, handleRemoveItem, className = '', ...rest }) => {
    const { t } = useTranslation();

    return (
      <li className={clsx(styles.container, className)} {...rest}>
        <div className={styles.main_box}>
          <img
            className={styles.img}
            src={data.characteristic.photo.front}
            alt={t('alts.item') || ''}
          />
          <div className={styles.name_box}>
            <Paragraph className={styles.name}>{data.characteristic.name}</Paragraph>
            <Paragraph className={styles.about}>{data.characteristic.color}</Paragraph>
            <Paragraph className={styles.able}>
              {t('cart.item.able', { able: data.characteristic.stock })}
            </Paragraph>
            <p className={styles.cart_btn}>- 1 +</p>
          </div>
        </div>
        <Paragraph className={styles.able}>{data.quantity}</Paragraph>
        <p className={styles.cart_btn}>- 1 +</p>
        <div className={styles.price_box}>
          <Paragraph className={styles.price}>{data.final_amount}</Paragraph>
          <Paragraph
            className={styles.price_amount}
          >{`${data.quantity} × ${data.characteristic.price}`}</Paragraph>
        </div>
        <div className={styles.btn_box}>
          <CloseButton id={data.id.toString()} onClick={handleRemoveItem} icon={RemoveCrossIcon} />
          <div className={clsx(styles.price_box, styles.price_box_mob)}>
            <Paragraph className={styles.price}>{data.final_amount}</Paragraph>
          </div>
        </div>
      </li>
    );
  },
);
