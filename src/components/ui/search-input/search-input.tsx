import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './search-input.module.scss';
import { ISearchInputProps } from './types';

import { SearchIcon } from '../icons';

export const SearchInput: FC<ISearchInputProps> = memo(
  ({ className = '', formClassName = '', isMob = false, onFormSubmit, ...rest }) => (
    <form className={clsx(styles.form, formClassName)} onSubmit={onFormSubmit}>
      <input className={clsx(styles.input, className)} {...rest} />
      <SearchIcon className={clsx(styles.icon, { [styles.icon_mob]: isMob })} />
    </form>
  ),
);
