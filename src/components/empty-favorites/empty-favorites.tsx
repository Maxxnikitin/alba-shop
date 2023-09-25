import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './empty-favorites.module.scss';
import { IEmptyFavoritesProps } from './types';

import image from '../../images/empty-favorites.svg';
import { Button, ETitleLevel, Title } from '../ui';

import { useNavigateToMain } from '~utils';

export const EmptyFavorites: FC<IEmptyFavoritesProps> = memo(({ className = '', ...rest }) => {
  const { t } = useTranslation();

  const { handleNavigateToMainClick } = useNavigateToMain();

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <img className={styles.img} src={image} alt={t('alts.not-found') || ''} />
      <Title className={styles.title} level={ETitleLevel.h6}>
        {t('empty-favorites.title')}
      </Title>
      <Button text={t('empty-favorites.btn')} onClick={handleNavigateToMainClick} />
    </div>
  );
});
