import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './filters-box.module.scss';

import { IFiltersBoxProps } from './types';

import { Title, ETitleLevel, Checkbox, FilterLabel } from '..';

import { ArrowFilterIcon } from '../icons';

import { handleToggleState } from '~utils';

export const FiltersBox: FC<IFiltersBoxProps> = memo(
  ({
    className = '',
    title,
    filtersList,
    checkedFiltersData,
    currChoosedFilter,
    countAfterFiltered,
    isFilterLabelVisible,
    setIsFilterLabelVisible,
    setCurrShoosedFilter,
    handleFilteredDataRender,
    setCheckedFiltersData,
    ...rest
  }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { t } = useTranslation();

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      ({ target }) => {
        const key = target.id.split('_')[0];
        setIsFilterLabelVisible(false);
        setCurrShoosedFilter(target.name);
        setCheckedFiltersData(prev => ({
          ...prev,
          [title]: {
            ...prev[title],
            [key]: target.checked,
          },
        }));
      },
      [title, setCheckedFiltersData, setCurrShoosedFilter, setIsFilterLabelVisible],
    );

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button className={styles.btn} type='button' onClick={handleToggleState(setIsOpen)}>
          <Title level={ETitleLevel.h6}>{t(`filters.${title}`)}</Title>
          <ArrowFilterIcon className={clsx(styles.img, { [styles.img_open]: isOpen })} />
        </button>
        <ul
          className={clsx(styles.list, { [styles.list_open]: isOpen })}
          style={(isOpen && { maxHeight: filtersList.length * 35 }) || {}}
        >
          {filtersList.map(item => (
            <li className={styles.list_item} key={item.f_id}>
              <Checkbox
                label={item.f_name}
                name={item.f_name}
                quantity={item.f_quantity}
                checked={checkedFiltersData[title][item.f_id] ?? false}
                id={item.f_id?.toString() + `_${nanoid()}`}
                onChange={handleChange}
              />
              {currChoosedFilter === item.f_name && isFilterLabelVisible && (
                <FilterLabel
                  className={styles.label}
                  count={countAfterFiltered}
                  onClick={handleFilteredDataRender}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
