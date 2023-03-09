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
      is_hit: isHit,
      is_new: isNew,
      in_favorite: inFavorite,
      in_cart: inCart,
    } = data;
    const { t } = useTranslation();

    const tagsArr = useMemo(() => {
      const arr = [];

      if (isNew) arr.push('new');
      if (isHit) arr.push('hit');

      return arr;
    }, [isNew, isHit]);

    return (
      <article className={clsx(styles.container, className)} {...rest}>
        <img className={styles.img} src={photo[0]} alt={t('alts.item') || ''} />
        <button
          className={clsx(styles.like, { [styles.like_active]: inFavorite })}
          onClick={onLikeClick}
        />
        {tagsArr.length && <TagsBox dataArr={tagsArr} inStock={!!stock} className={styles.tabs} />}
        <CostBox price={price} discount={discount} discountedPrice={discountedPrice} />
        <Paragraph className={styles.name}>{name}</Paragraph>
        {isCartButton && <CartButton max={stock} amount={inCart} />}
      </article>
    );
  },
);
