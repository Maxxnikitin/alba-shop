import clsx from 'clsx';
import { ChangeEventHandler, FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './filters-switch-box.module.scss';

import { IFiltersSwitchBox } from './types';

import { Title, ETitleLevel, Switch } from '..';
import arrowIcon from '../../../images/icons/arrow.svg';

export const FiltersSwitchBox: FC<IFiltersSwitchBox> = memo(
  ({ className = '', title, filtersList, checkedFiltersData, setCheckedFiltersData, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const handleOpenList = () => {
      setIsOpen(!isOpen);
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      e => {
        setCheckedFiltersData(prev => ({
          ...prev,
          [e.target.name]: e.target.checked,
        }));
      },
      [setCheckedFiltersData],
    );

    console.log('Render Filters SwitchBox');

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button className={styles.btn} type='button' onClick={handleOpenList}>
          <Title level={ETitleLevel.h6} className={styles.title}>
            {t(`filters.${title}`)}
          </Title>
          <img
            className={clsx(styles.img, { [styles.img_open]: isOpen })}
            src={arrowIcon}
            alt={t('alts.arrow-icon') || ''}
          />
        </button>
        {isOpen && (
          <ul className={styles.list}>
            {filtersList.map(item => (
              <li className={styles.list_item} key={item.f_id}>
                <Switch
                  label={item.f_name}
                  checked={checkedFiltersData[item.f_name]}
                  id={item.f_id?.toString()}
                  name={item.f_name}
                  onChange={handleChange}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);
