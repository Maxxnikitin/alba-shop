import clsx from 'clsx';
import { ChangeEventHandler, FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './filters-box.module.scss';

import { IFiltersBoxProps } from './types';

import { Title, ETitleLevel, Checkbox } from '..';
import arrowIcon from '../../../images/icons/arrow.svg';

import { handleToggleState } from '~utils';

export const FiltersBox: FC<IFiltersBoxProps> = memo(
  ({ className = '', title, filtersList, checkedFiltersData, setCheckedFiltersData, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    console.log('Render Filters Checkbox');

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      e => {
        setCheckedFiltersData(prev => ({
          ...prev,
          [title]: {
            ...prev[title],
            [e.target.id]: e.target.checked,
          },
        }));
      },
      [title, setCheckedFiltersData],
    );

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button className={styles.btn} type='button' onClick={handleToggleState(setIsOpen)}>
          <Title level={ETitleLevel.h6}>{t(`filters.${title}`)}</Title>
          <img
            className={clsx(styles.img, { [styles.img_open]: isOpen })}
            src={arrowIcon}
            alt={t('alts.arrow-icon') || ''}
          />
        </button>
        <ul
          className={clsx(styles.list, { [styles.list_open]: isOpen })}
          style={(isOpen && { maxHeight: filtersList.length * 35 }) || {}}
        >
          {filtersList.map(item => (
            <li className={styles.list_item} key={item.f_id}>
              <Checkbox
                label={item.f_name}
                quantity={item.f_quantity}
                checked={checkedFiltersData[title][item.f_id] ?? false}
                id={item.f_id?.toString()}
                onChange={handleChange}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
