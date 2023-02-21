import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './item-gallery.module.scss';
import { IItemGalleryProps } from './types';

import { ItemFullPhoto } from '../ui';

export const ItemGallery: FC<IItemGalleryProps> = memo(
  ({ className = '', img, inFavourite, isHit, isNew, ...rest }) => {
    console.log('q');

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <ItemFullPhoto img={img} inFavourite={inFavourite} isHit={isHit} isNew={isNew} />
      </div>
    );
  },
);
