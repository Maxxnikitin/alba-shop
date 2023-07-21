import clsx from 'clsx';
import { FC, memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import styles from './catalog-main.module.scss';
import { ICatalogMainProps } from './types';

import { ETitleLevel, Title } from '../ui';

import { DataContext } from '~utils';

export const CatalogMain: FC<ICatalogMainProps> = memo(({ className = '', ...rest }) => {
  const { categories } = useContext(DataContext);
  const { t } = useTranslation();
  console.log(categories);

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.title}>{t('catalog.title')}</Title>
      <div className={styles.grid}>
        {categories.map(({ id, photo, position, name, slug }) => (
          <Link
            key={id}
            to={`/catalog/${id}_${slug}`}
            className={clsx(styles.grid_item, styles[`grid_item_${position}`])}
            style={{ backgroundImage: `url(${photo})` }}
          >
            <Title
              level={ETitleLevel.h4}
              className={clsx(styles.grid_item_title, styles[`grid_item_title_${position}`])}
            >
              {name}
            </Title>
          </Link>
        ))}
      </div>
    </section>
  );
});
