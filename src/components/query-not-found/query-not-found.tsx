import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from './query-not-found.module.scss';
import { IQueryNotFoundProps } from './types';

import notGoundImg from '../../images/query-not-found.svg';
import { Button, ETitleLevel, Title } from '../ui';

import { useNavigateToMain } from '~utils';

export const QueryNotFound: FC<IQueryNotFoundProps> = memo(({ className = '', ...rest }) => {
  const { t } = useTranslation();

  const { handleNavigateToMainClick } = useNavigateToMain();

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <LazyLoadImage className={styles.img} src={notGoundImg} alt={t('alts.not-found') || ''} />
      <Title className={styles.title} level={ETitleLevel.h6}>
        {t('query-not-found.title')}
      </Title>
      <Button text={t('query-not-found.btn')} onClick={handleNavigateToMainClick} />
    </div>
  );
});
