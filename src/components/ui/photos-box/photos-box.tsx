import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './photos-box.module.scss';
import { IPhotosBoxProps } from './types';

export const PhotosBox: FC<IPhotosBoxProps> = memo(
  ({ className = '', photos, activePhoto, onClick, ...rest }) => {
    const { t } = useTranslation();

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        {photos.map((item, i) => (
          <img
            className={clsx(styles.img, { [styles.img_active]: activePhoto === i })}
            src={item}
            id={i.toString()}
            key={i}
            alt={t('alts.item') || ''}
            onClick={onClick}
          />
        ))}
      </div>
    );
  },
);
