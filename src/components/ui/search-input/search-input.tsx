import clsx from 'clsx';
import { t } from 'i18next';
import { FC, memo } from 'react';

import styles from './search-input.module.scss';
import { ISearchInputProps } from './types';

import searchIcon from '../../../images/icons/search.svg';

export const SearchInput: FC<ISearchInputProps> = memo(
  ({ className = '', formClassName = '', ...rest }) => (
    <form className={clsx(styles.form, formClassName)}>
      <input className={clsx(styles.input, className)} {...rest} />
      <img className={styles.icon} src={searchIcon} alt={t('alts.logo-search') || ''} />
    </form>
  ),
);
