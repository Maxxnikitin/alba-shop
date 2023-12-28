import clsx from 'clsx';
import { FC, memo, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useLocation, useNavigate } from 'react-router-dom';

import styles from './item-cart.module.scss';
import { IItemCartProps } from './types';

import { CartButton, CloseButton, Paragraph, RemoveCrossIcon, Tag } from '../ui';

import { updateCartItemsFx } from 'src/models';
import { normalizeItemUrl } from '~utils';

export const ItemCart: FC<IItemCartProps> = memo(
  ({ data, handleRemoveItem, className = '', ...rest }) => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isPrevAmount = useMemo(
      () => data.discounted_amount && +data.discounted_amount !== +data.amount,
      [data],
    );

    const handleCardClick = () => {
      navigate(
        `${normalizeItemUrl(pathname)}/${data.characteristic.product_id}?characteristicId=${
          data.characteristic.id
        }`,
      );
    };

    const handleUpdateInCart: (quantity: number) => void = useCallback(
      quantity => {
        updateCartItemsFx({ characteristic_id: data.characteristic.id, quantity });
      },
      [data.characteristic.id],
    );

    const handleDeleteFromCart: () => void = useCallback(() => {
      updateCartItemsFx({ characteristic_id: data.characteristic.id, quantity: 0 });
    }, [data.characteristic.id]);

    return (
      <li
        className={clsx(styles.container, {
          [styles.container_disabled]: !data.characteristic.stock || !data.is_sufficient,
        })}
        {...rest}
      >
        <div className={clsx(styles.mob_content, className)}>
          <div className={styles.main_box} onClick={handleCardClick}>
            <LazyLoadImage
              className={styles.img}
              src={data.characteristic.photo.front}
              alt={t('alts.item') || ''}
            />
            <div className={styles.name_box}>
              <Paragraph className={styles.name}>{data.characteristic.name}</Paragraph>
              <Paragraph className={styles.about}>{data.characteristic.color}</Paragraph>
              {!!data.characteristic.stock && (
                <Paragraph className={styles.able}>
                  {t('cart.item.able', { able: data.characteristic.stock })}
                </Paragraph>
              )}
            </div>
          </div>
          {data.characteristic.stock ? (
            <Paragraph className={styles.able}>{data.characteristic.stock}</Paragraph>
          ) : (
            <Tag className={styles.tag} text={t('tags.cart-empty')} isNotStock />
          )}
          <CartButton
            className={styles.cart_btn}
            max={data.characteristic.stock}
            amount={data.quantity}
            isInCart
            handleUpdateInCart={handleUpdateInCart}
            handleDeleteFromCart={handleDeleteFromCart}
          />
          <div className={styles.price_box}>
            {isPrevAmount && (
              <Paragraph className={styles.price_prev}>{`${+data.amount} ₽`}</Paragraph>
            )}
            <Paragraph
              className={clsx(styles.price, {
                [styles.price_discount]: isPrevAmount,
              })}
            >
              {`${+data.discounted_amount} ₽`}
            </Paragraph>
            <Paragraph className={styles.price_amount}>{`${data.quantity} × ${+data.characteristic
              .discounted_price} ₽`}</Paragraph>
          </div>
          <div className={styles.btn_box}>
            <CloseButton
              id={data.characteristic.id.toString()}
              onClick={handleRemoveItem}
              icon={RemoveCrossIcon}
            />
          </div>
        </div>
        <div className={styles.btn_mob_box}>
          <CartButton
            className={clsx(styles.cart_btn, styles.cart_btn_mob)}
            max={data.characteristic.stock}
            amount={data.quantity}
            isInCart
            handleUpdateInCart={handleUpdateInCart}
            handleDeleteFromCart={handleDeleteFromCart}
          />
          <div className={clsx(styles.price_box, styles.price_box_mob)}>
            <Paragraph
              className={clsx(styles.price, {
                [styles.price_discount]: isPrevAmount,
              })}
            >
              {`${+data.discounted_amount} ₽`}
            </Paragraph>
            {isPrevAmount && (
              <Paragraph className={styles.price_prev}>{`${+data.amount} ₽`}</Paragraph>
            )}
            {!data.characteristic.stock && <Tag text={t('tags.cart-empty')} isNotStock />}
          </div>
        </div>
      </li>
    );
  },
);
