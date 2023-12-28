import clsx from 'clsx';
import { useStore } from 'effector-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './navigation-mob.module.scss';
import { INavigationMobProps } from './types';

import { Button, Count, EButtonKinds, Paragraph } from '..';
import { $cartCountStore, $favoritesCountStore } from '../../../models';
import { AccountMobIcon, CartMobIcon, FavoriteNavMobIcon, MenuMobIcon } from '../icons';

import { ModalSmall } from 'src/components/modal-small';
import { useLogout } from '~utils';

export const NavigationMob: FC<INavigationMobProps> = ({
  handleOpenMenu,
  handleCloseAllModals,
  handleMobSearchOpen,
  className = '',
  ...rest
}) => {
  const cartCount = useStore($cartCountStore);
  const favoritesCount = useStore($favoritesCountStore);

  const { isLogoutModalOpen, handleLogoutToggleClick, handleLogoutReq } = useLogout();

  const { t } = useTranslation();

  return (
    <nav className={clsx(styles.nav, className)} {...rest}>
      <ul className={styles.list}>
        <li className={clsx(styles.list_item)}>
          <button className={clsx(styles.list_link, styles.list_btn)} onClick={handleOpenMenu}>
            <MenuMobIcon />
            <Paragraph className={styles.list_item_text}>{t('modals.menu.title')}</Paragraph>
          </button>
        </li>
        <li className={clsx(styles.list_item)}>
          <Link
            onClick={handleCloseAllModals}
            className={styles.list_link}
            to='/personal-account/data'
          >
            <AccountMobIcon />
            <Paragraph className={styles.list_item_text}>{t('modals.menu.profile')}</Paragraph>
          </Link>
        </li>
        <li className={clsx(styles.list_item)}>
          <Link
            onClick={handleCloseAllModals}
            className={styles.list_link}
            to='/personal-account/favorite'
          >
            <FavoriteNavMobIcon className={styles.icon} />
            {!!favoritesCount && <Count className={styles.count} count={favoritesCount} />}
            <Paragraph className={styles.list_item_text}>{t('modals.menu.favorite')}</Paragraph>
          </Link>
        </li>
        <li className={styles.list_item}>
          <Link onClick={handleCloseAllModals} className={styles.list_link} to='/cart'>
            <CartMobIcon />
            {!!cartCount && <Count className={styles.count} count={cartCount} />}
            <Paragraph className={styles.list_item_text}>{t('modals.menu.cart')}</Paragraph>
          </Link>
        </li>
      </ul>
      <Button
        kind={EButtonKinds.logout}
        text={t('personal-account.links.logout')}
        className={styles.logout_btn}
        onClick={handleLogoutToggleClick}
      />
      <ModalSmall
        title={t('modals.logout.title')!}
        isOpen={isLogoutModalOpen}
        successBtnText={t('modals.logout.btn_success')!}
        cancellBtnText={t('modals.logout.btn_cancel')!}
        onClose={handleLogoutToggleClick}
        onSuccess={handleLogoutReq}
      />
    </nav>
  );
};
