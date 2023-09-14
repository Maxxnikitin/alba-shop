import clsx from 'clsx';
import { debounce } from 'lodash';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './filters.module.scss';
import { IFiltersProps } from './types';

import {
  Button,
  CloseButton,
  FilterLabel,
  FiltersBox,
  FiltersBoxWithChildren,
  RangeInput,
  Switch,
  TCheckboxFiltersData,
  TOnInputsChange,
  TOnRangeChange,
  TPriceFiltersData,
  TSwitchFiltersData,
  Title,
} from '../ui';

import { TItemsWithPaginationAndFilters, getProducts } from '~utils';

export const Filters: FC<IFiltersProps> = ({
  filters,
  className = '',
  isTitle,
  isFooter,
  categoryId,
  currSort,
  pageSize = 20,
  setData,
  onClose,
  ...rest
}) => {
  const { t } = useTranslation();

  const data = useMemo(() => filters.fields, [filters]);

  const [priceFilterData, setPriceFilterData] = useState<TPriceFiltersData>({
    price: {
      min: +data.price.min,
      max: +data.price.max,
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

  const [labelTopPosition, setLabelTopPosition] = useState(0);

  const switchFilters = useMemo(
    () => [
      { f_name: 'in_stock', f_id: nanoid() },
      { f_name: 'is_new', f_id: nanoid() },
      { f_name: 'is_hit', f_id: nanoid() },
    ],
    [],
  );
  const [filteredData, setFilteredData] = useState<TItemsWithPaginationAndFilters | null>(null);
  const [currFiltersQuery, setCurrFiltersQuery] = useState('');
  const [currSwitchQuery, setCurrSwitchQuery] = useState('');
  const [currPriceQuery, setCurrPriceQuery] = useState('');
  const [isNeedRequest, setIsNeedRequest] = useState(false);

  const handleCreateFiltersQuery = (data: TCheckboxFiltersData) => {
    const res = Object.entries(data).reduce((acc: string[], [key, value]) => {
      const filterValue: string[] = [];
      Object.entries(value).forEach(([innerKey, innerValue]) => {
        if (innerValue) filterValue.push(innerKey);
      });

      if (filterValue.length) {
        return [...acc, `filter[${key}]=${filterValue.join(',')}`];
      }
      return acc;
    }, []);

    setCurrFiltersQuery(res.join('&'));
  };

  const handleCreateSwitchQuery = (data: TSwitchFiltersData) => {
    const res = Object.entries(data).reduce((acc: string[], [key, value]) => {
      if (value) {
        return [...acc, `filter[${key}]=1`];
      }

      return acc;
    }, []);

    setCurrSwitchQuery(res.join('&'));
  };

  const handleCreatePriceQuery = useCallback(({ price }: TPriceFiltersData) => {
    setCurrPriceQuery(`filter[price]=${price.min},${price.max}`);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePriceDebounced = useCallback(debounce(handleCreatePriceQuery, 500), [
    handleCreatePriceQuery,
  ]);

  const handleFilteredDataRender = useCallback(() => {
    setData(filteredData);
    onClose?.();
  }, [filteredData, setData, onClose]);

  const handleRemoveFilters = useCallback(() => {
    setCheckboxFiltersData({
      brand: {},
      material: {},
      model: {},
      color: {},
      length: {},
      output: {},
      charging_type: {},
      connector_type: {},
    });
    getProducts(categoryId!, `sort=${currSort}`).then(res => setData(res));
  }, [categoryId, currSort, setData]);

  const handleSwitchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setLabelTopPosition((e.nativeEvent as PointerEvent).clientY);
      console.log(e);
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
            id={f_id?.toString() + `_${nanoid()}`}
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
          rangeStart={+data.price.min}
          rangeEnd={+data.price.max}
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
      data.price,
    ],
  );

  useEffect(() => {
    if (categoryId && isNeedRequest) {
      getProducts(
        categoryId,
        `sort=${currSort}`,
        // `page_size=${pageSize}`,
        currFiltersQuery,
        currSwitchQuery,
        currPriceQuery,
      ).then(res => setFilteredData(res));
    }
  }, [
    categoryId,
    currSort,
    currFiltersQuery,
    currSwitchQuery,
    currPriceQuery,
    isNeedRequest,
    // pageSize,
  ]);

  useEffect(() => {
    handleCreateFiltersQuery(checkboxFiltersData);
    setIsNeedRequest(true);
  }, [checkboxFiltersData]);

  useEffect(() => {
    handleCreateSwitchQuery(switchFiltersData);
    setIsNeedRequest(true);
  }, [switchFiltersData]);

  useEffect(() => {
    handlePriceDebounced(priceFilterData);
    setIsNeedRequest(true);
  }, [priceFilterData, handlePriceDebounced]);

  useEffect(() => {
    setPriceFilterData({
      price: {
        min: +data.price.min,
        max: +data.price.max,
      },
    });
  }, [data.price]);

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
        if (Array.isArray(value) && value.length) {
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
          <Button
            text={t('filters.btn_submit')}
            className={styles.success_btn}
            onClick={handleFilteredDataRender}
          />
          <CloseButton
            text={t('filters.btn_remove_filters')!}
            className={styles.close_btn}
            onClick={handleRemoveFilters}
          />
        </div>
      )}
      {
        <FilterLabel
          style={{ top: labelTopPosition }}
          className={styles.label}
          count={filteredData?.meta.pagination.total_items ?? 0}
          onClick={handleFilteredDataRender}
        />
      }
    </div>
  );
};
