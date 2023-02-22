import clsx from 'clsx';
import { FC, memo, MouseEventHandler, useCallback, useState } from 'react';

import styles from './item-gallery.module.scss';
import { IItemGalleryProps } from './types';

import { ItemFullPhoto, PhotosBox } from '../ui';

export const ItemGallery: FC<IItemGalleryProps> = memo(
  ({ className = '', photos, inFavourite, isHit, isNew, ...rest }) => {
    const [activePhoto, setActivePhoto] = useState(0);
    console.log('q');

    const handlePhotoClick: MouseEventHandler<HTMLImageElement> = useCallback(({ target }) => {
      const id = +(target as HTMLImageElement).id;
      setActivePhoto(id);
    }, []);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <PhotosBox photos={photos} activePhoto={activePhoto} onClick={handlePhotoClick} />
        <ItemFullPhoto
          photo={photos[activePhoto]}
          inFavourite={inFavourite}
          isHit={isHit}
          isNew={isNew}
        />
      </div>
    );
  },
);
