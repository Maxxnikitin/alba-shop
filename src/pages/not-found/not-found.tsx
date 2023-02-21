import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './not-found.module.scss';
import { INotFoundProps } from './types';

import { Button, ETitleLevel, Title } from '../../components/ui';
import notGoundImg from '../../images/404.svg';

import { useReturn } from '~utils';

export const NotFound: FC<INotFoundProps> = memo(({ className = '', ...rest }) => {
  const { t } = useTranslation();

  const { handleReturnClick } = useReturn();

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <img className={styles.img} src={notGoundImg} alt={t('alts.not-found') || ''} />
      <Title className={styles.title} level={ETitleLevel.h4}>
        {t('not-found.title')}
      </Title>
      <Button text={t('not-found.btn')} onClick={handleReturnClick} />
    </div>
  );
});
