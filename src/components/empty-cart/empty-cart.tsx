import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from './empty-cart.module.scss';
import { IEmptyCartProps } from './types';

import image from '../../images/empty-cart.svg';
import { Button, ETitleLevel, Paragraph, Title } from '../ui';

import { useNavigateToMain } from '~utils';

export const EmptyCart: FC<IEmptyCartProps> = memo(({ className = '', ...rest }) => {
  const { t } = useTranslation();

  const { handleNavigateToMainClick } = useNavigateToMain();

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.page_title}>{t('cart.title')}</Title>
      <LazyLoadImage className={styles.img} src={image} alt={t('alts.not-found') || ''} />
      <Title className={styles.title} level={ETitleLevel.h6}>
        {t('empty-cart.title')}
      </Title>
      <Paragraph className={styles.text}>{t('empty-cart.text')}</Paragraph>
      <Button
        className={styles.btn}
        text={t('empty-cart.btn')}
        onClick={handleNavigateToMainClick}
      />
    </div>
  );
});
