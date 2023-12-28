import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './filter-label.module.scss';

import { IFilterLabelProps } from './types';

import { Paragraph } from '../paragraph';

import { getWordForm } from '~utils';

export const FilterLabel: FC<IFilterLabelProps> = memo(
  ({ count, type = 'button', className = '', ...rest }) => {
    const { t } = useTranslation();

    return (
      <button type={type} className={clsx(styles.container, className)} {...rest}>
        <Paragraph className={styles.text}>
          {t('filters.label_text', { count }) + t(`filters.items_word.${getWordForm(count)}`)}
        </Paragraph>
      </button>
    );
  },
);
