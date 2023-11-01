import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './filter-popup-button.module.scss';
import { IFilterPopupButtonProps } from './types';

import { FilterIcon } from '../icons';

export const FilterPopupButton: FC<IFilterPopupButtonProps> = memo(
  ({ className = '', type = 'button', ...rest }) => {
    const { t } = useTranslation();

    return (
      <button className={clsx(styles.container, className)} type={type} {...rest}>
        {t('filters.btn')} <FilterIcon />
      </button>
    );
  },
);
