import clsx from 'clsx';
import { FC, memo, MouseEventHandler, useCallback, useState } from 'react';

import styles from './item-gallery.module.scss';
import { IItemGalleryProps } from './types';

import { ItemFullPhoto, PhotosBox } from '../ui';

import { TPhotos } from '~utils';

export const ItemGallery: FC<IItemGalleryProps> = memo(
  ({ className = '', currentCharacteristic, dataObj, onLikeClick, ...rest }) => {
    const { photo: photos } = currentCharacteristic;
    const [activePhoto, setActivePhoto] = useState<keyof TPhotos>('front');

    const handlePhotoClick: MouseEventHandler<HTMLImageElement> = useCallback(({ target }) => {
      const id = (target as HTMLImageElement).id as keyof TPhotos;
      setActivePhoto(id);
    }, []);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <PhotosBox photos={photos} activePhoto={activePhoto} onClick={handlePhotoClick} />
        <ItemFullPhoto
          photo={photos[activePhoto] ?? ''}
          currentCharacteristic={currentCharacteristic}
          dataObj={dataObj}
          onLikeClick={onLikeClick}
          className={styles.photo}
        />
      </div>
    );
  },
);
