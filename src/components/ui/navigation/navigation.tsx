import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './navigation.module.scss';
import { INavigationProps } from './types';

import accountIcon from '../../../images/icons/account.svg';
import cartIcom from '../../../images/icons/cart.svg';
import favouritesIcon from '../../../images/icons/favourites-nav.svg';
import searchIcon from '../../../images/icons/search-mob.svg';

export const Navigation: FC<INavigationProps> = ({ className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <nav className={clsx(styles.nav, className)} {...rest}>
      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.list_item_search)}>
          <Link className={styles.list_link} to='/search'>
            <img
              className={clsx(styles.icon, styles.icon_search)}
              src={searchIcon}
              alt={t('alts.logo-search') || ''}
            />
          </Link>
        </li>
        <li className={clsx(styles.list_item, styles.list_item_mob_none)}>
          <Link className={styles.list_link} to='/account'>
            <img className={styles.icon} src={accountIcon} alt={t('alts.logo-account') || ''} />
          </Link>
        </li>
        <li className={styles.list_item}>
          <Link className={styles.list_link} to='/cart'>
            <img className={styles.icon} src={cartIcom} alt={t('alts.logo-cart') || ''} />
          </Link>
        </li>
        <li className={clsx(styles.list_item, styles.list_item_mob_none)}>
          <Link className={styles.list_link} to='/favourites'>
            <img
              className={styles.icon}
              src={favouritesIcon}
              alt={t('alts.logo-favourites') || ''}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
