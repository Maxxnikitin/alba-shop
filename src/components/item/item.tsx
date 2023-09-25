import clsx from 'clsx';
import { FC, MouseEventHandler, memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import styles from './item.module.scss';
import { IItemProps } from './types';

import { CartButton, CostBox, Paragraph, TagsBox } from '../ui';

import { TCharacteristic, createCartPosition, deleteFavorite, setFavorite } from '~utils';

export const Item: FC<IItemProps> = memo(
  ({ data, isCartButton = false, className = '', onLikeClick, ...rest }) => {
    const [stateData, setStateData] = useState<TCharacteristic>(data);
    const {
      id,
      product_id,
      photo,
      name,
      stock,
      price,
      discount,
      discounted_price: discountedPrice,
      is_hit: isHit,
      is_new: isNew,
      in_favorite: inFavorite,
      in_cart: inCart,
    } = stateData;
    const [isFetchError, setIsFetchError] = useState(false);
    const { t } = useTranslation();

    const navigate = useNavigate();

    const tagsArr = useMemo(() => {
      const arr = [];

      if (isNew) arr.push('new');
      if (isHit) arr.push('hit');

      return arr;
    }, [isNew, isHit]);

    const handleCardClick = () => {
      navigate(`/catalog/product/${product_id}`);
    };

    const handleAddToCart: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
      createCartPosition({ characteristic_id: id, quantity: 1 }).then(() =>
        setStateData(prev => ({ ...prev, in_cart: 1 })),
      );
    }, [id]);

    const handleUpdateInCart: (quantity: number) => void = useCallback(
      quantity => {
        createCartPosition({ characteristic_id: id, quantity })
          .then(({ data }) => setStateData(prev => ({ ...prev, in_cart: data.quantity })))
          .catch(err => {
            console.log(err);
            setIsFetchError(true);
          });
      },
      [id],
    );

    const handleDeleteFromCart: () => void = useCallback(() => {
      createCartPosition({ characteristic_id: id, quantity: 0 })
        .then(() => setStateData(prev => ({ ...prev, in_cart: 0 })))
        .catch(err => {
          console.log(err);
          setIsFetchError(true);
        });
    }, [id]);

    const handleToggleLike = useCallback(() => {
      if (stateData) {
        setStateData({
          ...stateData,
          in_favorite: !stateData.in_favorite,
        });
      }
    }, [stateData]);

    const handleLikeRequest: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
      if (stateData.in_favorite) {
        deleteFavorite(stateData.id)
          .then(handleToggleLike)
          .catch(err => console.log(err));
      } else {
        setFavorite({ characteristic_id: stateData.id })
          .then(handleToggleLike)
          .catch(err => console.log(err));
      }
    }, [stateData, handleToggleLike]);

    return (
      <li className={clsx(styles.container, className)} {...rest}>
        <article className={styles.article}>
          <img
            className={styles.img}
            src={photo.front}
            alt={t('alts.item') || ''}
            onClick={handleCardClick}
          />
          <div className={styles.addition_box}>
            <div className={styles.tags_like_box}>
              <button
                className={clsx(styles.like, { [styles.like_active]: inFavorite })}
                onClick={handleLikeRequest}
              />
              {!!tagsArr.length && (
                <TagsBox dataArr={tagsArr} inStock={!!stock} className={styles.tabs} />
              )}
            </div>
            <CostBox price={price} discount={discount} discountedPrice={discountedPrice} />
            <Paragraph className={styles.name}>{name}</Paragraph>
          </div>
        </article>
        {isCartButton && (
          <CartButton
            handleAddToCart={handleAddToCart}
            handleUpdateInCart={handleUpdateInCart}
            handleDeleteFromCart={handleDeleteFromCart}
            isFetchError={isFetchError}
            setIsFetchError={setIsFetchError}
            className={styles.btn}
            max={stock}
            amount={inCart}
            isSmall
            disabled={!stock}
          />
        )}
      </li>
    );
  },
);
