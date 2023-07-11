import clsx from 'clsx';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { NavLink, Outlet } from 'react-router-dom';

import styles from './personal-account-page.module.scss';
import { IPersonalAccountPageProps } from './types';

import { Title } from '../../components/ui';

export const PersonalAccountPage: FC<IPersonalAccountPageProps> = ({ className = '', ...rest }) => {
  const { t } = useTranslation();
  console.log('ee');
  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.title}>{t('personal-account.title')}</Title>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <ul className={styles.links}>
            <li className={styles.li}>
              <NavLink
                to='/personal-account/orders'
                className={({ isActive }) => clsx(styles.link, { [styles.link_active]: isActive })}
              >
                {t('personal-account.links.orders')}
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to='/personal-account/favorite'
                className={({ isActive }) => clsx(styles.link, { [styles.link_active]: isActive })}
              >
                {t('personal-account.links.favorite')}
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to='/personal-account/data'
                className={({ isActive }) => clsx(styles.link, { [styles.link_active]: isActive })}
              >
                {t('personal-account.links.data')}
              </NavLink>
            </li>

            <li className={styles.li}>
              <NavLink
                to='/personal-account/coupons'
                className={({ isActive }) => clsx(styles.link, { [styles.link_active]: isActive })}
              >
                {t('personal-account.links.coupons')}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.right_column}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};
