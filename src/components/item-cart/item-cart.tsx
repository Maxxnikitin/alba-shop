import clsx from 'clsx';
import { FC, memo, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './item-cart.module.scss';
import { IItemCartProps } from './types';

import { CartItemButton, CloseButton, Paragraph, RemoveCrossIcon } from '../ui';

import { updateCartCount } from 'src/models';
import { getCartCount, updateCartPositionInCart } from '~utils';

export const ItemCart: FC<IItemCartProps> = memo(
  ({ data, setData, handleRemoveItem, className = '', ...rest }) => {
    const { t } = useTranslation();

    const isPrevAmount = useMemo(
      () => data.discounted_amount && data.discounted_amount !== data.amount,
      [data],
    );

    const handleUpdateInCart: (quantity: number) => void = useCallback(
      quantity => {
        updateCartPositionInCart({ characteristic_id: data.characteristic.id, quantity })
          .then(({ data }) => {
            setData(data);
            getCartCount().then(({ data }) => updateCartCount(data.total_items));
          })
          .catch(err => console.log(err));
      },
      [data.characteristic.id, setData],
    );

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
            <CartItemButton
              amount={data.quantity}
              max={data.characteristic.stock}
              handleUpdateInCart={handleUpdateInCart}
              className={styles.cart_btn}
            />
          </div>
        </div>
        <Paragraph className={styles.able}>{data.characteristic.stock}</Paragraph>
        <CartItemButton
          amount={data.quantity}
          max={data.characteristic.stock}
          handleUpdateInCart={handleUpdateInCart}
          className={styles.cart_btn}
        />
        <div className={styles.price_box}>
          {isPrevAmount && <Paragraph className={styles.price_prev}>{data.amount}</Paragraph>}
          <Paragraph
            className={clsx(styles.price, {
              [styles.price_discount]: isPrevAmount,
            })}
          >
            {data.discounted_amount}
          </Paragraph>
          <Paragraph
            className={styles.price_amount}
          >{`${data.quantity} × ${data.discounted_amount}`}</Paragraph>
        </div>
        <div className={styles.btn_box}>
          <CloseButton
            id={data.characteristic.id.toString()}
            onClick={handleRemoveItem}
            icon={RemoveCrossIcon}
          />
          <div className={clsx(styles.price_box, styles.price_box_mob)}>
            <Paragraph className={styles.price}>{data.final_amount}</Paragraph>
          </div>
        </div>
      </li>
    );
  },
);
