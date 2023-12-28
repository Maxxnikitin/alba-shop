import clsx from 'clsx';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { NavLink, Outlet } from 'react-router-dom';

import styles from './personal-account-page.module.scss';
import { IPersonalAccountPageProps } from './types';

import {
  MenuDataIcon,
  MenuDataIconActive,
  MenuFavoriteIcon,
  MenuFavoriteIconActive,
  MenuLogoutIcon,
  MenuLogoutIconActive,
  MenuOrdersIcon,
  MenuOrdersIconActive,
  Title,
} from '../../components/ui';

import { ModalSmall } from 'src/components';
import { useLogout } from '~utils';

export const PersonalAccountPage: FC<IPersonalAccountPageProps> = ({ className = '', ...rest }) => {
  const { isLogoutModalOpen, handleLogoutToggleClick, handleLogoutReq } = useLogout();

  const { t } = useTranslation();

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
                <div className={styles.link_container}>
                  <div className={styles.icons_box}>
                    <MenuOrdersIcon className={styles.icon} />
                    <MenuOrdersIconActive className={styles.icon_active} />
                  </div>
                  {t('personal-account.links.orders')}
                </div>
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to='/personal-account/favorite'
                className={({ isActive }) => clsx(styles.link, { [styles.link_active]: isActive })}
              >
                <div className={styles.link_container}>
                  <div className={styles.icons_box}>
                    <MenuFavoriteIcon className={styles.icon} />
                    <MenuFavoriteIconActive className={styles.icon_active} />
                  </div>
                  {t('personal-account.links.favorite')}
                </div>
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to='/personal-account/data'
                className={({ isActive }) => clsx(styles.link, { [styles.link_active]: isActive })}
              >
                <div className={styles.link_container}>
                  <div className={styles.icons_box}>
                    <MenuDataIcon className={styles.icon} />
                    <MenuDataIconActive className={styles.icon_active} />
                  </div>
                  {t('personal-account.links.data')}
                </div>
              </NavLink>
            </li>
            {/* <li className={styles.li}>
              <NavLink
                to='/personal-account/coupons'
                className={({ isActive }) => clsx(styles.link, { [styles.link_active]: isActive })}
              >
                {t('personal-account.links.coupons')}
              </NavLink>
            </li> */}
            <li className={styles.li}>
              <button
                className={clsx(styles.logout, styles.link)}
                onClick={handleLogoutToggleClick}
              >
                <div className={styles.link_container}>
                  <div className={styles.icons_box}>
                    <MenuLogoutIcon className={styles.icon} />
                    <MenuLogoutIconActive className={styles.icon_active} />
                  </div>
                  {t('personal-account.links.logout')}
                </div>
              </button>
            </li>
          </ul>
        </nav>
        <div className={styles.right_column}>
          <Outlet />
        </div>
      </div>
      <ModalSmall
        title={t('modals.logout.title')!}
        isOpen={isLogoutModalOpen}
        successBtnText={t('modals.logout.btn_success')!}
        cancellBtnText={t('modals.logout.btn_cancel')!}
        onClose={handleLogoutToggleClick}
        onSuccess={handleLogoutReq}
      />
    </section>
  );
};
