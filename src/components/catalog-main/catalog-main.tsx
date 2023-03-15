import clsx from 'clsx';
import { FC, memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './catalog-main.module.scss';
import { ICatalogMainProps } from './types';

import { ETitleLevel, Title } from '../ui';

import { DataContext } from '~utils';

export const CatalogMain: FC<ICatalogMainProps> = memo(({ className = '', ...rest }) => {
  const { categories } = useContext(DataContext);
  const { t } = useTranslation();
  console.log('q');

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.title}>{t('catalog.title')}</Title>
      <div className={styles.grid}>
        {categories.map((category, i) => (
          <div key={category.id} className={clsx(styles.grid_item, styles[`grid_item_${i}`])}>
            <Title
              level={ETitleLevel.h4}
              className={clsx(styles.grid_item_title, styles[`grid_item_title_${i}`])}
            >
              {category.name}
            </Title>
          </div>
        ))}
      </div>
    </section>
  );
});
