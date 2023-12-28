import clsx from 'clsx';
import { useStore } from 'effector-react';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './filters-box.module.scss';

import { IFiltersBoxProps } from './types';

import { Title, ETitleLevel, Checkbox, FilterLabel } from '..';

import { ArrowFilterIcon } from '../icons';

import { $filtersStore, updateCheckboxes } from 'src/models';
import { handleToggleState } from '~utils';

export const FiltersBox: FC<IFiltersBoxProps> = memo(
  ({
    className = '',
    title,
    filtersList,
    currChoosedFilter,
    countAfterFiltered,
    isFilterLabelVisible,
    isShowLabel,
    setIsFilterLabelVisible,
    setIsClearFilters,
    setCurrShoosedFilter,
    handleFilteredDataRender,
    ...rest
  }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [currItemName, setCurrItemName] = useState<string | null>(null);
    const { t } = useTranslation();

    const { checkboxes } = useStore($filtersStore);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      ({ target }) => {
        const key = target.id.split('_')[0];
        const name = target.name;

        setCurrItemName(name);
        setIsFilterLabelVisible(false);
        setIsClearFilters(false);
        setCurrShoosedFilter(name.split('_')[0]);
        updateCheckboxes({ title, key, value: target.checked });
      },
      [title, setCurrShoosedFilter, setIsFilterLabelVisible, setIsClearFilters],
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
          {filtersList.map((item, i) => (
            <li className={styles.list_item} key={item.f_id}>
              <Checkbox
                label={item.f_name}
                name={item.f_name + '_' + i}
                quantity={item.f_quantity}
                checked={checkboxes[title][item.f_id] ?? false}
                id={item.f_id?.toString() + `_${nanoid()}`}
                onChange={handleChange}
              />
            </li>
          ))}
        </ul>
        {currChoosedFilter === currItemName?.split('_')[0] &&
          isFilterLabelVisible &&
          isShowLabel && (
            <FilterLabel
              className={styles.label}
              count={countAfterFiltered}
              onClick={handleFilteredDataRender}
              style={{ top: `${29 + +(currItemName?.split('_')[1] ?? 0) * 32}px` }}
              disabled={countAfterFiltered === 0}
            />
          )}
      </div>
    );
  },
);
