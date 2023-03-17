import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './navigation.module.scss';
import { INavigationProps } from './types';

import { Count } from '..';
import { AccountIcon, CartIcon, FavoriteNavIcon, SearchMobileIcon } from '../icons';

export const Navigation: FC<INavigationProps> = ({ className = '', ...rest }) => {
  console.log('tt');

  return (
    <nav className={clsx(styles.nav, className)} {...rest}>
      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.list_item_search)}>
          <Link className={styles.list_link} to='/search'>
            <SearchMobileIcon className={clsx(styles.icon, styles.icon_search)} />
          </Link>
        </li>
        <li className={clsx(styles.list_item, styles.list_item_mob_none)}>
          <Link className={styles.list_link} to='/account'>
            <AccountIcon className={styles.icon} />
          </Link>
        </li>
        <li className={clsx(styles.list_item, styles.list_item_mob_none)}>
          <Link className={styles.list_link} to='/favorites'>
            <FavoriteNavIcon className={styles.icon} />
            <Count className={styles.count} count={100} />
          </Link>
        </li>
        <li className={styles.list_item}>
          <Link className={styles.list_link} to='/cart'>
            <CartIcon className={styles.icon} />
            <Count className={styles.count} count={222} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
