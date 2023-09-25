import clsx from 'clsx';
import { FC, memo, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './item-cart.module.scss';
import { IItemCartProps } from './types';

import { CartItemButton, CloseButton, Paragraph, RemoveCrossIcon } from '../ui';

import { updateCartCount } from 'src/models';
import { deleteCartPosition, getCart, getCartCount, updateCartPosition } from '~utils';

export const ItemCart: FC<IItemCartProps> = memo(
  ({ data, setData, handleRemoveItem, className = '', ...rest }) => {
    const { t } = useTranslation();

    const isPrevAmount = useMemo(
      () => data.discounted_amount && data.discounted_amount !== data.amount,
      [data],
    );

    const handleUpdateInCart: (quantity: number) => void = useCallback(
      quantity => {
        updateCartPosition({ characteristic_id: data.id.toString(), quantity }).then(({ data }) => {
          setData(data);
          getCartCount().then(({ data }) => updateCartCount(data.total_items));
        });
      },
      [data.id, setData],
    );

    const handleDeleteFromCart: () => void = useCallback(() => {
      deleteCartPosition(data.id).then(() => getCart().then(({ data }) => setData(data)));
    }, [data.id, setData]);

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
              handleDeleteFromCart={handleDeleteFromCart}
              className={styles.cart_btn}
            />
          </div>
        </div>
        <Paragraph className={styles.able}>{data.characteristic.stock}</Paragraph>
        <CartItemButton
          amount={data.quantity}
          max={data.characteristic.stock}
          handleUpdateInCart={handleUpdateInCart}
          handleDeleteFromCart={handleDeleteFromCart}
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
          <CloseButton id={data.id.toString()} onClick={handleRemoveItem} icon={RemoveCrossIcon} />
          <div className={clsx(styles.price_box, styles.price_box_mob)}>
            <Paragraph className={styles.price}>{data.final_amount}</Paragraph>
          </div>
        </div>
      </li>
    );
  },
);
