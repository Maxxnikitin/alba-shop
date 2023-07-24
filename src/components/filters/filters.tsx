import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, FC, useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './filters.module.scss';
import { IFiltersProps } from './types';

import {
  Button,
  CloseButton,
  FiltersBox,
  FiltersBoxWithChildren,
  RangeInput,
  Switch,
  TCheckboxFiltersData,
  TOnInputsChange,
  TOnRangeChange,
  TSwitchFiltersData,
  Title,
} from '../ui';

export const Filters: FC<IFiltersProps> = ({
  filters,
  className = '',
  isTitle,
  isFooter,
  onClose,
  ...rest
}) => {
  const { t } = useTranslation();

  const data = useMemo(() => filters.fields, [filters]);

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
    is_new: data.is_new,
    is_hit: data.is_hit,
    in_stock: data.in_stock,
    discount: data.discount,
  });

  const switchFilters = useMemo(
    () => [
      { f_name: 'in_stock', f_id: nanoid() },
      { f_name: 'is_new', f_id: nanoid() },
      { f_name: 'is_hit', f_id: nanoid() },
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
      switchFilters.map(({ f_id, f_name }) => (
        <li className={styles.list_item} key={f_id}>
          <Switch
            label={t(`filters.${f_name}`)}
            checked={switchFiltersData[f_name]}
            id={f_id?.toString()}
            name={f_name}
            onChange={handleSwitchChange}
          />
        </li>
      )),
    [switchFilters, switchFiltersData, handleSwitchChange, t],
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

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {isTitle && (
        <div className={styles.title_box}>
          <Title>{t('filters.title')}</Title>
          <CloseButton onClick={onClose} />
        </div>
      )}
      <FiltersBoxWithChildren title={'price'}>{priceChildrenNode}</FiltersBoxWithChildren>
      <FiltersBoxWithChildren title={'in_stock_title'}>{switchChildrenNode}</FiltersBoxWithChildren>
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
      {isFooter && (
        <div className={styles.footer}>
          <Button text={t('filters.btn_submit')} className={styles.success_btn} />
          <CloseButton text={t('filters.btn_remove_filters')!} className={styles.close_btn} />
        </div>
      )}
    </div>
  );
};
