import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './sort-select.module.scss';
import { ISortSelectProps } from './types';

import { ArrowSortIcon } from '../icons';
import { Paragraph } from '../paragraph';

import { SORTING_ITEMS } from '~utils';

export const SortSelect: FC<ISortSelectProps> = memo(
  ({ className = '', value, onChange, ...rest }) => {
    const { t } = useTranslation();

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Paragraph className={clsx(styles.text, styles.mob_text)}>
          {t('sorting.select-text')}
        </Paragraph>
        <select className={clsx(styles.select, styles.text)} value={value} onChange={onChange}>
          {SORTING_ITEMS.map((item, i) => (
            <option key={i} value={item}>
              {t(`sorting.${item}`)}
            </option>
          ))}
        </select>
        <ArrowSortIcon className={styles.icon} />
      </div>
    );
  },
);
