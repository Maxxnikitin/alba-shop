import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './item-full-photo.module.scss';
import { IItemFullPhotoProps } from './types';

import { TagsBox } from '..';

export const ItemFullPhoto: FC<IItemFullPhotoProps> = memo(
  ({ className = '', photo, currentCharacteristic, dataObj, onLikeClick, ...rest }) => {
    const {
      is_hit: isHit,
      is_new: isNew,
      in_favorite: inFavorite,
      stock: inStock,
    } = currentCharacteristic;

    const { t } = useTranslation();

    const tagsArr = useMemo(() => {
      const arr = [];

      if (isNew) arr.push('new');
      if (isHit) arr.push('hit');

      return arr;
    }, [isNew, isHit]);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <img className={styles.img} src={photo} alt={t('alts.item') || ''} />
        <div className={styles.additions}>
          <button
            className={clsx(styles.like, { [styles.like_active]: inFavorite })}
            onClick={onLikeClick}
          />
          {tagsArr.length && (
            <TagsBox dataArr={tagsArr} inStock={!!inStock} className={styles.tabs} />
          )}
        </div>
        {tagsArr.length && (
          <TagsBox dataArr={tagsArr} inStock={!!inStock} className={styles.tabs_mobile} />
        )}
      </div>
    );
  },
);
