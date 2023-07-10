import clsx from 'clsx';
import { FC, memo } from 'react';

import { Link } from 'react-router-dom';

import styles from './brand-item.module.scss';
import { IBrandItemProps } from './types';

import { Paragraph } from '../paragraph';

import { TCategory } from '~utils';

export const BrandItem: FC<IBrandItemProps> = memo(
  ({ data, className = '', isCategory = false, ...rest }) => {
    console.log('q');

    return (
      <li className={clsx(styles.brand, className)} {...rest}>
        <Link
          className={styles.link}
          style={{ backgroundImage: `url(data.logo)` }}
          to={isCategory ? (data as TCategory).slug : data.name}
        />
        {isCategory && <Paragraph className={styles.text}>{data.name}</Paragraph>}
      </li>
    );
  },
);
