import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './catalog-items.module.scss';
import { ICatalogItemsProps } from './types';

import { CatalogItem } from '../ui';

export const CatalogItems: FC<ICatalogItemsProps> = memo(
  ({ data, prefixUrl, className = '', ...rest }) => {
    console.log('rr');
    return (
      <ul className={clsx(styles.container, className)} {...rest}>
        {data?.map(item => (
          <CatalogItem key={item.id} data={item} prefixUrl={prefixUrl} />
        ))}
      </ul>
    );
  },
);
