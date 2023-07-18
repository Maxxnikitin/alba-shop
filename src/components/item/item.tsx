import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './item.module.scss';
import { IItemProps } from './types';

import { CartButton, CostBox, Paragraph, TagsBox } from '../ui';

export const Item: FC<IItemProps> = memo(
  ({ data, isCartButton = false, className = '', onLikeClick, ...rest }) => {
    const {
      photo,
      name,
      stock,
      price,
      discount,
      discounted_price: discountedPrice,
      is_bestseller: isBestseller,
      is_new: isNew,
      in_favorite: inFavorite,
      in_cart: inCart,
    } = data;
    const { t } = useTranslation();

    const tagsArr = useMemo(() => {
      const arr = [];

      if (isNew) arr.push('new');
      if (isBestseller) arr.push('bestseller');

      return arr;
    }, [isNew, isBestseller]);

    return (
      <li className={clsx(styles.container, className)} {...rest}>
        <article className={styles.article}>
          <img className={styles.img} src={photo.front} alt={t('alts.item') || ''} />
          <div className={styles.addition_box}>
            <div className={styles.tags_like_box}>
              <button
                className={clsx(styles.like, { [styles.like_active]: inFavorite })}
                onClick={onLikeClick}
              />
              {tagsArr.length && (
                <TagsBox dataArr={tagsArr} inStock={!!stock} className={styles.tabs} />
              )}
            </div>
            <CostBox price={price} discount={discount} discountedPrice={discountedPrice} />
            <Paragraph className={styles.name}>{name}</Paragraph>
          </div>
        </article>
        {isCartButton && <CartButton max={stock} amount={inCart} isSmall />}
      </li>
    );
  },
);
