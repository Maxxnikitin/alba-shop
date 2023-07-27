import clsx from 'clsx';
import { debounce } from 'lodash';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';

import { Link, useNavigate } from 'react-router-dom';

import styles from './header.module.scss';
import { IHeaderProps } from './types';

import logoIcon from '../../images/logo-white.svg';
import { ModalSearch } from '../modal-search';
import {
  Button,
  EButtonKinds,
  MenuChildrenItem,
  MenuMainItem,
  MenuPopup,
  Navigation,
  SearchInput,
} from '../ui';

import { DataContext, TCategory, TLiveSearchRes, getSearchLive } from '~utils';

export const Header: FC<IHeaderProps> = memo(({ className = '', ...rest }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currMenuItem, setCurrMenuItem] = useState<TCategory | null>(null);
  const [searchData, setSearchData] = useState<TLiveSearchRes | null>(null);
  const [isMobSearchOpen, setIsMobSearchOpen] = useState(false);
  const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { categories } = useContext(DataContext);

  const handleOpenMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleOpenMobMenu = useCallback(() => {
    setIsMobMenuOpen(true);
  }, []);

  const handleCloseMobMenu = useCallback(() => {
    setIsMobMenuOpen(false);
  }, []);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    const { value } = e.target;

    if (value.length < 2) {
      setSearchData(null);
      return;
    }
    getSearchLive(e.target.value).then(res => setSearchData(res));
  }, []);

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = useCallback(e => {
    e.preventDefault();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchDebounced = useCallback(debounce(handleSearch, 500), [handleSearch]);

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

  const handleMobSearchOpen = useCallback(() => {
    setIsMobSearchOpen(true);
  }, []);

  const handleMobSearchClose = useCallback(() => {
    setIsMobSearchOpen(false);
  }, []);

  const handleCloseAllModals = useCallback(() => {
    handleCloseMenu();
    handleCloseMobMenu();
    setCurrMenuItem(null);
  }, [handleCloseMenu, handleCloseMobMenu]);

  useEffect(() => {
    if (isMenuOpen || isMenuOpen) {
      document.body.classList.add(styles.body);

      return () => {
        document.body.classList.remove(styles.body);
      };
    }
  }, [isMenuOpen, currMenuItem]);

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
            onClick={window.innerWidth <= 550 ? handleOpenMobMenu : handleOpenMenu}
          />
          {isMobMenuOpen && (
            <MenuPopup
              className={styles.menu_popup_main}
              onClose={handleCloseMobMenu}
              title={'test'}
              handleCloseAllModals={handleCloseAllModals}
            >
              <Navigation />
            </MenuPopup>
          )}
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
                    prefixUrl={`/catalog/${currMenuItem.id}_${currMenuItem.slug}`}
                    handleCloseAllModals={handleCloseAllModals}
                  />
                ))}
              </ul>
            </MenuPopup>
          )}
        </div>
        <div className={styles.search_box}>
          <SearchInput
            formClassName={styles.header_search}
            placeholder={t('inputs.search') || ''}
            onChange={handleSearchDebounced}
            onFormSubmit={handleSearchSubmit}
          />
          {searchData && (
            <MenuPopup
              className={styles.menu_popup_search}
              title={t('modals.menu.title')!}
              isOverlay={false}
            >
              <p>ss</p>
            </MenuPopup>
          )}
        </div>
        <Navigation className={styles.nav} handleMobSearchOpen={handleMobSearchOpen} />
      </div>
      <ModalSearch
        data={searchData}
        isOpen={isMobSearchOpen}
        onClose={handleMobSearchClose}
        onChange={handleSearchDebounced}
      />
    </header>
  );
});
