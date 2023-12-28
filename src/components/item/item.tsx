import clsx from 'clsx';
import { FC, MouseEventHandler, memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './item.module.scss';
import { IItemProps } from './types';

import { CartButton, CostBox, Paragraph, TagsBox } from '../ui';

import {
  createCartItemsCatalogFx,
  updateCartItemsCatalogFx,
  updateFavoritesCount,
} from 'src/models';
import {
  ResWithData,
  TCharacteristic,
  TTotalItems,
  deleteFavorite,
  normalizeItemUrl,
  setFavorite,
} from '~utils';

export const Item: FC<IItemProps> = memo(
  ({ data, isCartButton = false, className = '', ...rest }) => {
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
    const { t } = useTranslation();

    const { pathname } = useLocation();
    const { id: searchId } = useParams();

    const navigate = useNavigate();

    const tagsArr = useMemo(() => {
      const arr = [];

      if (isNew) arr.push('new');
      if (isHit) arr.push('hit');

      return arr;
    }, [isNew, isHit]);

    const handleCardClick = () => {
      navigate(`${normalizeItemUrl(pathname, searchId)}/${product_id}?characteristicId=${id}`);
    };

    const handleAddToCart: MouseEventHandler<HTMLButtonElement> = useCallback(async () => {
      await createCartItemsCatalogFx({ characteristic_id: id });
      setStateData(prev => ({ ...prev, in_cart: 1 }));
    }, [id]);

    const handleUpdateInCart: (quantity: number) => void = useCallback(
      async quantity => {
        await updateCartItemsCatalogFx({ characteristic_id: id, quantity });
        setStateData(prev => ({ ...prev, in_cart: quantity }));
      },
      [id],
    );

    const handleDeleteFromCart: () => void = useCallback(async () => {
      await updateCartItemsCatalogFx({ characteristic_id: id, quantity: 0 });
      setStateData(prev => ({ ...prev, in_cart: 0 }));
    }, [id]);

    const handleToggleLike = useCallback(
      ({ data }: ResWithData<TTotalItems>) => {
        if (stateData) {
          setStateData({
            ...stateData,
            in_favorite: !stateData.in_favorite,
          });
          updateFavoritesCount(data.total_items);
        }
      },
      [stateData],
    );

    const handleLikeRequest: MouseEventHandler<HTMLButtonElement> = useCallback(
      e => {
        e.stopPropagation();

        if (stateData.in_favorite) {
          deleteFavorite(stateData.id)
            .then(handleToggleLike)
            .catch(err => console.log(err));
        } else {
          setFavorite({ characteristic_id: stateData.id })
            .then(handleToggleLike)
            .catch(err => console.log(err));
        }
      },
      [stateData, handleToggleLike],
    );

    return (
      <li className={clsx(styles.container, className)} {...rest}>
        <article className={styles.article} onClick={handleCardClick}>
          <LazyLoadImage
            className={clsx(styles.img, { [styles.img_empty]: !stock })}
            src={photo.front}
            alt={t('alts.item') || ''}
          />
          <div className={styles.addition_box}>
            <div className={styles.tags_like_box}>
              <button
                className={clsx(styles.like, { [styles.like_active]: inFavorite })}
                onClick={handleLikeRequest}
              />
              <TagsBox dataArr={tagsArr} inStock={!!stock} className={styles.tabs} />
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
