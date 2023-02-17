import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { FC, useMemo, useState } from 'react';

import styles from './filters.module.scss';
import { IFilters } from './types';

import {
  FiltersBox,
  FiltersSwitchBox,
  RangeInput,
  TCheckboxFiltersData,
  TSwitchFiltersData,
} from '../ui';

export const Filters: FC<IFilters> = ({ classList = '', ...rest }) => {
  const [data, setData] = useState({
    brand: [
      { f_id: 1, f_name: 'Автомобильные', f_quantity: 2 },
      { f_id: 2, f_name: 'Количество', f_quantity: 6 },
      { f_id: 3, f_name: 'S3 super', f_quantity: 87 },
    ],
    material: [
      { f_id: 4, f_name: 'Автомобильные', f_quantity: 104 },
      { f_id: 5, f_name: 'Количество', f_quantity: 43 },
      { f_id: 6, f_name: 'S3 super', f_quantity: 246 },
    ],
    is_hit: true,
    in_stock: true,
    is_new: false,
    discount: false,
  });

  const [checkboxFiltersData, setCheckboxFiltersData] = useState<TCheckboxFiltersData>({
    brand: {},
    material: {},
    model: {},
    color: {},
    length: {},
    output: {},
    charging_type: {},
    connector_type: {},
    price: {},
  });

  const [switchFiltersData, setSwitchFiltersData] = useState<TSwitchFiltersData>({
    is_new: false,
    is_hit: false,
    in_stock: true,
    discount: false,
  });

  const switchFilters = useMemo(
    () => [
      { f_name: 'in_stock', f_id: nanoid() },
      { f_name: 'is_hit', f_id: nanoid() },
      { f_name: 'is_new', f_id: nanoid() },
    ],
    [],
  );

  console.log('Render Filters');

  return (
    <div className={clsx(styles.container, classList)} {...rest}>
      <RangeInput />
      <FiltersSwitchBox
        key={'in_stock'}
        title={'in_stock'}
        filtersList={switchFilters}
        checkedFiltersData={switchFiltersData}
        setCheckedFiltersData={setSwitchFiltersData}
      />
      {Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value)) {
          return (
            <FiltersBox
              key={key}
              title={key}
              filtersList={value}
              checkedFiltersData={checkboxFiltersData}
              setCheckedFiltersData={setCheckboxFiltersData}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
