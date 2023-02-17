import clsx from 'clsx';
import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './filters-box-with-children.module.scss';

import { IFiltersBoxWithChildrenProps } from './types';

import { Title, ETitleLevel } from '..';
import arrowIcon from '../../../images/icons/arrow.svg';

export const FiltersBoxWithChildren: FC<IFiltersBoxWithChildrenProps> = memo(
  ({ className = '', children, title, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const handleOpenList = () => {
      setIsOpen(!isOpen);
    };

    console.log('Render Filters SwitchBox');

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button className={styles.btn} type='button' onClick={handleOpenList}>
          <Title level={ETitleLevel.h6}>{t(`filters.${title}`)}</Title>
          <img
            className={clsx(styles.img, { [styles.img_open]: isOpen })}
            src={arrowIcon}
            alt={t('alts.arrow-icon') || ''}
          />
        </button>
        {isOpen && <ul className={styles.list}>{children}</ul>}
      </div>
    );
  },
);
