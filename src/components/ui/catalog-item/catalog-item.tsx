import clsx from 'clsx';
import { FC, memo } from 'react';

import { Link } from 'react-router-dom';

import styles from './catalog-item.module.scss';
import { ICatalogItemProps } from './types';

import { Paragraph } from '../paragraph';

export const CatalogItem: FC<ICatalogItemProps> = memo(
  ({ data, prefixUrl, className = '', ...rest }) => (
    <li className={clsx(styles.container, className)} {...rest}>
      <Link
        className={styles.link}
        style={{ backgroundImage: `url(${data.photo})` }}
        to={`${prefixUrl}/${data.id}_${data.slug}`}
      />
      <Paragraph className={styles.text}>{data.name}</Paragraph>
    </li>
  ),
);
