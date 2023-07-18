import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './characteristics-photos-box.module.scss';
import { ICharacteristicsPhotoBoxProps } from './types';

import { Tag } from '..';

export const CharacteristicsPhotoBox: FC<ICharacteristicsPhotoBoxProps> = memo(
  ({ className = '', characteristics, currentCharacteristic, onClick, ...rest }) => {
    const { t } = useTranslation();

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        {characteristics.map(item => (
          <div className={styles.img_box} key={item.id}>
            <img
              className={clsx(styles.img, {
                [styles.img_active]: currentCharacteristic.id === item.id,
                [styles.stock_off]: !item.stock,
              })}
              src={item.photo.front}
              id={item.id}
              alt={t('alts.item') || ''}
              onClick={onClick}
            />
            {item.discount ? <Tag className={styles.tag} text='%' /> : null}
          </div>
        ))}
      </div>
    );
  },
);
