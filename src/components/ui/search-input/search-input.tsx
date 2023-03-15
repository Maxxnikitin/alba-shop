import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './search-input.module.scss';
import { ISearchInputProps } from './types';

import { SearchIcon } from '../icons';

export const SearchInput: FC<ISearchInputProps> = memo(
  ({ className = '', formClassName = '', ...rest }) => (
    <form className={clsx(styles.form, formClassName)}>
      <input className={clsx(styles.input, className)} {...rest} />
      <SearchIcon className={styles.icon} />
    </form>
  ),
);
