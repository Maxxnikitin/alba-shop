import clsx from 'clsx';
import { forwardRef, memo } from 'react';

import styles from './search-input.module.scss';
import { ISearchInputProps } from './types';

import { CloseButton } from '../close-button';
import { SearchIcon } from '../icons';

export const SearchInput = memo(
  forwardRef<HTMLInputElement, ISearchInputProps>(
    (
      {
        className = '',
        formClassName = '',
        isMob = false,
        value,
        onFormSubmit,
        onRemoveValue,
        ...rest
      },
      ref,
    ) => (
      <form className={clsx(styles.form, formClassName)} onSubmit={onFormSubmit}>
        <input className={clsx(styles.input, className)} ref={ref} value={value} {...rest} />
        {value && (
          <CloseButton
            className={clsx(styles.close, { [styles.close_mob]: isMob })}
            onClick={onRemoveValue}
            type='button'
          />
        )}
        <button
          className={clsx(styles.search_btn, { [styles.search_btn_mob]: isMob })}
          type='submit'
        >
          <SearchIcon />
        </button>
      </form>
    ),
  ),
);
