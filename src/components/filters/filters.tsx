import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, FC, useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './filters.module.scss';
import { IFiltersProps } from './types';

import {
  FiltersBox,
  FiltersBoxWithChildren,
  RangeInput,
  Switch,
  TCheckboxFiltersData,
  TOnInputsChange,
  TOnRangeChange,
  TSwitchFiltersData,
} from '../ui';

export const Filters: FC<IFiltersProps> = ({ classList = '', ...rest }) => {
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
      { f_id: 7, f_name: 'Автомобильные', f_quantity: 104 },
      { f_id: 8, f_name: 'Количество', f_quantity: 43 },
      { f_id: 9, f_name: 'S3 super', f_quantity: 246 },
      { f_id: 10, f_name: 'Автомобильные', f_quantity: 104 },
      { f_id: 11, f_name: 'Количество', f_quantity: 43 },
      { f_id: 12, f_name: 'S3 super', f_quantity: 246 },
    ],
    is_bestseller: true,
    in_stock: true,
    is_new: false,
    discount: false,
  });

  const [priceFilterData, setPriceFilterData] = useState({
    price: {
      min: 1,
      max: 300000,
    },
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
  });

  const [switchFiltersData, setSwitchFiltersData] = useState<TSwitchFiltersData>({
    is_new: false,
    is_bestseller: false,
    in_stock: true,
    discount: false,
  });

  const { t } = useTranslation();

  const switchFilters = useMemo(
    () => [
      { f_name: 'in_stock', f_id: nanoid() },
      { f_name: 'is_bestseller', f_id: nanoid() },
      { f_name: 'is_new', f_id: nanoid() },
    ],
    [],
  );

  const handleSwitchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setSwitchFiltersData(prev => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    },
    [setSwitchFiltersData],
  );

  const switchChildrenNode = useMemo(
    () =>
      switchFilters.map(item => (
        <li className={styles.list_item} key={item.f_id}>
          <Switch
            label={item.f_name}
            checked={switchFiltersData[item.f_name]}
            id={item.f_id?.toString()}
            name={item.f_name}
            onChange={handleSwitchChange}
          />
        </li>
      )),
    [switchFilters, switchFiltersData, handleSwitchChange],
  );

  const handlePriceChange: TOnRangeChange = useCallback(val => {
    if (Array.isArray(val)) {
      setPriceFilterData({
        price: {
          min: val[0],
          max: val[1],
        },
      });
    }
  }, []);

  const handleInputsChange: TOnInputsChange = useCallback(e => {
    const { name } = e.target;
    const { value } = e.target;

    if (name === 'min') {
      setPriceFilterData(prev => ({
        price: {
          ...prev.price,
          min: +value,
        },
      }));
    } else {
      setPriceFilterData(prev => ({
        price: {
          ...prev.price,
          max: +value,
        },
      }));
    }
  }, []);

  const priceChildrenNode = useMemo(
    () => (
      <>
        <RangeInput
          minValue={priceFilterData.price.min}
          maxValue={priceFilterData.price.max}
          onRangeChange={handlePriceChange}
          onInputsChange={handleInputsChange}
        />
        <Switch
          label={t('filters.discount')}
          name={'discount'}
          checked={switchFiltersData.discount}
          onChange={handleSwitchChange}
        />
      </>
    ),
    [
      switchFiltersData,
      priceFilterData.price,
      handleSwitchChange,
      t,
      handlePriceChange,
      handleInputsChange,
    ],
  );

  console.log('Render Filters');

  return (
    <div className={clsx(styles.container, classList)} {...rest}>
      <FiltersBoxWithChildren title={'price'}>{priceChildrenNode}</FiltersBoxWithChildren>
      <FiltersBoxWithChildren title={'in_stock'}>{switchChildrenNode}</FiltersBoxWithChildren>
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
