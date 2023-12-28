import clsx from 'clsx';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import styles from './category-item.module.scss';
import { ICategoryItemProps } from './types';

import { Paragraph } from '../paragraph';

export const CategoryItem: FC<ICategoryItemProps> = ({ data, className = '', ...rest }) => {
  const { name, icon, id, slug } = data;
  const { t } = useTranslation();

  return (
    <li className={clsx(styles.container, className)} {...rest}>
      <Link className={styles.link} to={`/catalog/${id}_${slug}`}>
        <LazyLoadImage src={icon} alt={t('alts.category-icon') || ''} />
        <Paragraph className={styles.text}>{name}</Paragraph>
      </Link>
    </li>
  );
};
