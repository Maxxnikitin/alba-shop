import clsx from 'clsx';
import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './filters-box-with-children.module.scss';

import { IFiltersBoxWithChildrenProps } from './types';

import { Title, ETitleLevel } from '..';

import { ArrowFilterIcon } from '../icons';

import { handleToggleState } from '~utils';

export const FiltersBoxWithChildren: FC<IFiltersBoxWithChildrenProps> = memo(
  ({ className = '', children, title, ...rest }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { t } = useTranslation();

    console.log('Render Filters SwitchBox');

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button className={styles.btn} type='button' onClick={handleToggleState(setIsOpen)}>
          <Title level={ETitleLevel.h6}>{t(`filters.${title}`)}</Title>
          <ArrowFilterIcon className={clsx(styles.img, { [styles.img_open]: isOpen })} />
        </button>
        <ul className={clsx(styles.list, { [styles.list_open]: isOpen })}>{children}</ul>
      </div>
    );
  },
);
