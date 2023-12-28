import clsx from 'clsx';
import { useStore } from 'effector-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './navigation.module.scss';
import { INavigationProps } from './types';

import { Count } from '..';
import { $cartCountStore, $favoritesCountStore } from '../../../models';
import {
  AccountIcon,
  CartIcon,
  FavoriteNavIcon,
  SearchMobileIcon,
  FavoriteNavIconHover,
  AccountIconHover,
  CartIconHover,
} from '../icons';

export const Navigation: FC<INavigationProps> = ({
  handleMobSearchOpen,
  className = '',
  ...rest
}) => {
  const cartCount = useStore($cartCountStore);
  const favoritesCount = useStore($favoritesCountStore);

  return (
    <nav className={clsx(styles.nav, className)} {...rest}>
      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.list_item_search)}>
          <button
            className={clsx(styles.list_link, styles.list_link_btn)}
            onClick={handleMobSearchOpen}
          >
            <SearchMobileIcon className={clsx(styles.icon, styles.icon_search)} />
          </button>
        </li>
        <li className={clsx(styles.list_item, styles.list_item_mob_none)}>
          <Link className={styles.list_link} to='/personal-account/data'>
            <AccountIcon className={styles.icon} />
            <AccountIconHover className={styles.icon_hover} />
          </Link>
        </li>
        <li className={clsx(styles.list_item, styles.list_item_mob_none)}>
          <Link className={styles.list_link} to='/personal-account/favorite'>
            <FavoriteNavIcon className={styles.icon} />
            <FavoriteNavIconHover className={styles.icon_hover} />
            {!!favoritesCount && <Count className={styles.count} count={favoritesCount} />}
          </Link>
        </li>
        <li className={styles.list_item}>
          <Link className={styles.list_link} to='/cart'>
            <CartIcon className={styles.icon} />
            <CartIconHover className={styles.icon_hover} />
            {!!cartCount && <Count className={styles.count} count={cartCount} />}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
