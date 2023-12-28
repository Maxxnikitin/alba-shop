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
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './header.module.scss';
import { IHeaderProps } from './types';

import logoIcon from '../../images/logo.png';
import { ModalSearch } from '../modal-search';
import {
  Button,
  EButtonKinds,
  ETitleLevel,
  Loader,
  MenuChildrenItem,
  MenuMainItem,
  MenuPopup,
  Navigation,
  NavigationMob,
  SearchInput,
  SearchItem,
  Title,
} from '../ui';

import { DataContext, ERequestStatus, TCategory, TLiveSearchRes, getSearchLive } from '~utils';

export const Header: FC<IHeaderProps> = memo(({ className = '', ...rest }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currMenuItem, setCurrMenuItem] = useState<TCategory | null>(null);
  const [searchData, setSearchData] = useState<TLiveSearchRes | null>(null);
  const [searchStatus, setSearchStatus] = useState<ERequestStatus>(ERequestStatus.NONE);
  const [isMobSearchOpen, setIsMobSearchOpen] = useState(false);
  const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  const { t } = useTranslation();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { categories } = useContext(DataContext);

  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchDebounced = useCallback(
    debounce((val: string) => {
      if (val.length === 0) {
        setSearchStatus(ERequestStatus.NONE);
        return;
      }

      if (val.trim().length < 5) {
        setSearchStatus(ERequestStatus.FAIL_LENGTH);
        setSearchData(null);
        return;
      }

      setSearchStatus(ERequestStatus.LOADING);
      getSearchLive(val)
        .then(res => {
          if (!res.data.length) {
            setSearchStatus(ERequestStatus.NONE);
            return;
          }
          setSearchStatus(ERequestStatus.SUCCESS);
          setSearchData(res);
        })
        .catch(err => {
          setSearchStatus(ERequestStatus.ERROR);
          console.log(err);
        });
    }, 500),
    [],
  );

  const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      const { value } = e.target;

      setSearchInputValue(value);

      handleSearchDebounced(value);
    },
    [handleSearchDebounced],
  );

  const handleCloseAllModals = useCallback(() => {
    handleCloseMenu();
    handleCloseMobMenu();
    setCurrMenuItem(null);
  }, [handleCloseMenu, handleCloseMobMenu]);

  const handleMenuItemClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      if (currMenuItem) {
        if (currMenuItem.id.toString() !== currentTarget.id) {
          const currItem = categories.find(item => item.id.toString() === currentTarget.id);
          setCurrMenuItem(currItem ?? null);
          if (!currItem) {
            handleCloseAllModals();
          }
        } else {
          setCurrMenuItem(null);
        }
      } else {
        const currItem = categories.find(item => item.id.toString() === currentTarget.id);
        setCurrMenuItem(currItem!);
      }
    },
    [categories, currMenuItem, handleCloseAllModals],
  );

  const handleSecondModalClose = () => {
    setCurrMenuItem(null);
  };

  const handleMobSearchOpen = useCallback(() => {
    setIsMobSearchOpen(true);
  }, []);

  const handleMobSearchClose = useCallback(() => {
    setIsMobSearchOpen(false);
    // setSearchReqString('');
    // setSearchData(null);
  }, []);

  const handleSearchModalClose = useCallback(() => {
    setSearchData(null);
    setSearchStatus(ERequestStatus.NONE);
  }, []);

  const handleRemoveSearchValue = () => {
    setSearchInputValue('');
    handleSearchModalClose();
    searchInputRef.current?.focus();
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();

      if (searchInputValue.trim().length >= 5) {
        navigate(`/search?q=${searchInputValue}`);
        handleMobSearchClose();
      }
    },
    [searchInputValue, navigate, handleMobSearchClose],
  );

  useEffect(() => {
    if (isMenuOpen || isMenuOpen || isMobMenuOpen) {
      document.body.classList.add(styles.body);

      return () => {
        document.body.classList.remove(styles.body);
      };
    }
  }, [isMenuOpen, currMenuItem, isMobMenuOpen]);

  useEffect(() => {
    setSearchInputValue('');
    setSearchData(null);
  }, [pathname]);

  return (
    <header className={clsx(styles.header, className)} {...rest}>
      <div className={styles.container}>
        <Link className={styles.link} to='/'>
          <LazyLoadImage className={styles.logo} src={logoIcon} alt={t('alts.logo-alt') || ''} />
        </Link>
        <div className={styles.menu_box}>
          <Button
            className={styles.btn}
            kind={EButtonKinds.menu}
            text={t('main-page.catalog-btn')}
            onClick={window.innerWidth <= 550 ? handleOpenMobMenu : handleOpenMenu}
            isMenuOpen={isMenuOpen}
          />
          {isMobMenuOpen && (
            <MenuPopup
              className={styles.menu_popup_main}
              onClose={handleCloseMobMenu}
              handleCloseAllModals={handleCloseAllModals}
            >
              <NavigationMob
                handleOpenMenu={handleOpenMenu}
                handleCloseAllModals={handleCloseAllModals}
              />
            </MenuPopup>
          )}
          {isMenuOpen && (
            <MenuPopup
              className={clsx(styles.menu_popup_main, {
                [styles.menu_popup_main_opened]: currMenuItem,
              })}
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
              onClose={handleSecondModalClose}
              handleCloseAllModals={handleCloseAllModals}
              title={currMenuItem.name}
              isBackBtn
              style={{ height: window.innerWidth > 600 ? categories.length * 65 : '100%' }}
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
            ref={searchInputRef}
            onChange={handleSearch}
            value={searchInputValue}
            onFormSubmit={handleSearchSubmit}
            onRemoveValue={handleRemoveSearchValue}
          />
          {searchStatus !== ERequestStatus.NONE && (
            <MenuPopup
              className={styles.menu_popup_search}
              overlayClassName={styles.menu_popup_search_overlay}
              title={t('modals.menu.title')!}
              onClose={handleSearchModalClose}
            >
              <>
                <div className={styles.top_line} />
                {searchStatus === ERequestStatus.LOADING && <Loader />}
                {searchStatus === ERequestStatus.ERROR && (
                  <Title className={styles.search_error} level={ETitleLevel.h6}>
                    {t('request.error')}
                  </Title>
                )}
                {searchStatus === ERequestStatus.FAIL_LENGTH && (
                  <Title className={styles.search_error} level={ETitleLevel.h6}>
                    {t('request.length')}
                  </Title>
                )}
                {searchData?.data.map(({ name, icon, id, type, slug }, i) => {
                  if (i > 7) return null;
                  return (
                    <SearchItem
                      name={name}
                      icon={icon}
                      key={id}
                      id={id}
                      slug={slug}
                      dataType={type}
                      onCloseModal={handleSearchModalClose}
                    />
                  );
                })}
                {(searchData?.data.length || 0) > 8 && (
                  <SearchItem
                    id='11'
                    isBold
                    dataType='rest'
                    name={t('search-modal.rest', { count: (searchData?.data.length || 0) - 8 })}
                    searchReqString={searchInputValue}
                    onCloseModal={handleSearchModalClose}
                  />
                )}
              </>
            </MenuPopup>
          )}
        </div>
        <Navigation className={styles.nav} handleMobSearchOpen={handleMobSearchOpen} />
      </div>
      <ModalSearch
        data={searchData}
        isOpen={isMobSearchOpen}
        searchStatus={searchStatus}
        inputValue={searchInputValue}
        onClose={handleMobSearchClose}
        onChange={handleSearch}
        onRemoveValue={handleRemoveSearchValue}
        onFormSubmit={handleSearchSubmit}
      />
    </header>
  );
});
