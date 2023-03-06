import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import styles from './header.module.scss';
import { IHeaderProps } from './types';

import logoIcon from '../../images/logo-white.png';
import { Button, EButtonKinds, Navigation, SearchInput } from '../ui';

export const Header: FC<IHeaderProps> = memo(({ className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <header className={clsx(styles.header, className)} {...rest}>
      <div className={styles.container}>
        <Link className={styles.link} to='/'>
          <img className={styles.logo} src={logoIcon} alt={t('alts.logo-alt') || ''} />
        </Link>
        <Button className={styles.btn} kind={EButtonKinds.menu} text={t('main-page.catalog-btn')} />
        <SearchInput formClassName={styles.header_search} placeholder={t('inputs.search') || ''} />
        <Navigation className={styles.nav} />
      </div>
    </header>
  );
});
