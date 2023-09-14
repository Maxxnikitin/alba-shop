import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './filters-box.module.scss';

import { IFiltersBoxProps } from './types';

import { Title, ETitleLevel, Checkbox } from '..';

import { ArrowFilterIcon } from '../icons';

import { handleToggleState } from '~utils';

export const FiltersBox: FC<IFiltersBoxProps> = memo(
  ({ className = '', title, filtersList, checkedFiltersData, setCheckedFiltersData, ...rest }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { t } = useTranslation();

    console.log('Render Filters Checkbox');
    console.log(55555, title);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      e => {
        setCheckedFiltersData(prev => ({
          ...prev,
          [title]: {
            ...prev[title],
            [e.target.id.split('_')[0]]: e.target.checked,
          },
        }));
      },
      [title, setCheckedFiltersData],
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
                quantity={item.f_quantity}
                checked={checkedFiltersData[title][item.f_id] ?? false}
                id={item.f_id?.toString() + `_${nanoid()}`}
                onChange={handleChange}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
