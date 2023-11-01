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

import { TItemsWithPaginationAndFilters, getProducts, isEqualCharacteristicsArrs } from '~utils';

export const Filters: FC<IFiltersProps> = ({
  filters,
  className = '',
  isTitle,
  isFooter,
  categoryId,
  currSort,
  pageSize,
  propsData,
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

  const [currChoosedFilter, setCurrShoosedFilter] = useState<string | null>(null);
  const [isFilterLabelVisible, setIsFilterLabelVisible] = useState(false);
  // const [labelTopPosition, setLabelTopPosition] = useState(0);

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
    setIsFilterLabelVisible(false);
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
      setIsFilterLabelVisible(false);
      setCurrShoosedFilter(e.target.name);
      setSwitchFiltersData(prev => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    },
    [setSwitchFiltersData],
  );

  const handlePriceChange: TOnRangeChange = useCallback(val => {
    if (Array.isArray(val)) {
      setIsFilterLabelVisible(false);
      setCurrShoosedFilter('discount');
      setPriceFilterData({
        price: {
          min: val[0],
          max: val[1],
        },
      });
    }
  }, []);

  const handleInputsChange: TOnInputsChange = useCallback(e => {
    const { name, value } = e.target;
    setCurrShoosedFilter('discount');
    setIsFilterLabelVisible(false);

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
          {f_name === currChoosedFilter && isFilterLabelVisible && (
            <FilterLabel
              className={styles.label}
              count={filteredData?.meta.pagination.total_items ?? 0}
              onClick={handleFilteredDataRender}
            />
          )}
        </li>
      )),
    [
      switchFilters,
      switchFiltersData,
      filteredData,
      currChoosedFilter,
      isFilterLabelVisible,
      handleSwitchChange,
      t,
      handleFilteredDataRender,
    ],
  );

  const priceChildrenNode = useMemo(
    () => (
      <div className={styles.price_box}>
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
        {currChoosedFilter === 'discount' && isFilterLabelVisible && (
          <FilterLabel
            className={styles.label}
            count={filteredData?.meta.pagination.total_items ?? 0}
            onClick={handleFilteredDataRender}
          />
        )}
      </div>
    ),
    [
      switchFiltersData,
      priceFilterData.price,
      currChoosedFilter,
      filteredData,
      isFilterLabelVisible,
      handleSwitchChange,
      t,
      handlePriceChange,
      handleInputsChange,
      handleFilteredDataRender,
      data.price,
    ],
  );

  useEffect(() => {
    if (categoryId && currSort && pageSize && currPriceQuery) {
      getProducts(
        categoryId,
        `sort=${currSort}`,
        `page_size=${pageSize}`,
        currFiltersQuery,
        currSwitchQuery,
        currPriceQuery,
      ).then(res => {
        setFilteredData(res);
      });
    }
  }, [categoryId, currSort, currFiltersQuery, currSwitchQuery, currPriceQuery, pageSize]);

  useEffect(() => {
    if (!isEqualCharacteristicsArrs(propsData, filteredData?.data)) {
      setIsFilterLabelVisible(true);
    }
  }, [filteredData, propsData]);

  useEffect(() => {
    handleCreateFiltersQuery(checkboxFiltersData);
  }, [checkboxFiltersData]);

  useEffect(() => {
    handleCreateSwitchQuery(switchFiltersData);
  }, [switchFiltersData]);

  useEffect(() => {
    handlePriceDebounced(priceFilterData);
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
              currChoosedFilter={currChoosedFilter}
              isFilterLabelVisible={isFilterLabelVisible}
              setIsFilterLabelVisible={setIsFilterLabelVisible}
              setCurrShoosedFilter={setCurrShoosedFilter}
              countAfterFiltered={filteredData?.meta.pagination.total_items ?? 0}
              handleFilteredDataRender={handleFilteredDataRender}
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
    </div>
  );
};
