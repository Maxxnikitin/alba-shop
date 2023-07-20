import clsx from 'clsx';
import { FC, MouseEventHandler, memo, useCallback, useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import styles from './header.module.scss';
import { IHeaderProps } from './types';

import logoIcon from '../../images/logo-white.svg';
import {
  Button,
  EButtonKinds,
  MenuChildrenItem,
  MenuMainItem,
  MenuPopup,
  Navigation,
  SearchInput,
} from '../ui';

import { DataContext, TCategory } from '~utils';

export const Header: FC<IHeaderProps> = memo(({ className = '', ...rest }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currMenuItem, setCurrMenuItem] = useState<TCategory | null>(null);
  const { t } = useTranslation();

  const { categories } = useContext(DataContext);

  const handleOpenMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleMenuItemClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      if (currMenuItem) {
        if (currMenuItem.id.toString() !== currentTarget.id) {
          const currItem = categories.find(item => item.id.toString() === currentTarget.id);
          setCurrMenuItem(currItem!);
        } else {
          setCurrMenuItem(null);
        }
      } else {
        const currItem = categories.find(item => item.id.toString() === currentTarget.id);
        setCurrMenuItem(currItem!);
      }
    },
    [categories, currMenuItem],
  );

  const handleCloseAllModals = useCallback(() => {
    handleCloseMenu();
    setCurrMenuItem(null);
  }, [handleCloseMenu]);

  return (
    <header className={clsx(styles.header, className)} {...rest}>
      <div className={styles.container}>
        <Link className={styles.link} to='/'>
          <img className={styles.logo} src={logoIcon} alt={t('alts.logo-alt') || ''} />
        </Link>
        <div className={styles.menu_box}>
          <Button
            className={styles.btn}
            kind={EButtonKinds.menu}
            text={t('main-page.catalog-btn')}
            onClick={handleOpenMenu}
          />
          {isMenuOpen && (
            <MenuPopup
              className={styles.menu_popup_main}
              onClose={handleCloseMenu}
              title={t('modals.menu.title')!}
              handleCloseAllModals={handleCloseAllModals}
            >
              <ul className={styles.menu_popup_list}>
                {categories.map(item => (
                  <MenuMainItem
                    key={item.id}
                    id={item.id.toString()}
                    text={item.name}
                    icon={item.icon}
                    onClick={handleMenuItemClick}
                    isOpen={currMenuItem?.id === item.id}
                  />
                ))}
              </ul>
            </MenuPopup>
          )}
          {currMenuItem && (
            <MenuPopup
              className={styles.menu_popup_children}
              onClose={handleMenuItemClick}
              handleCloseAllModals={handleCloseAllModals}
              title={currMenuItem.name}
              isBackBtn
            >
              <ul className={styles.menu_popup_list}>
                {currMenuItem.children.map(item => (
                  <MenuChildrenItem
                    key={item.id}
                    dataObj={item}
                    handleCloseAllModals={handleCloseAllModals}
                  />
                ))}
              </ul>
            </MenuPopup>
          )}
        </div>
        <SearchInput formClassName={styles.header_search} placeholder={t('inputs.search') || ''} />
        <Navigation className={styles.nav} />
      </div>
    </header>
  );
});
