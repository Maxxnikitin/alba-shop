import clsx from 'clsx';
import { useStore } from 'effector-react';
import { debounce } from 'lodash';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './filters.module.scss';
import { IFiltersProps } from './types';

import {
  Button,
  CloseButton,
  ETitleLevel,
  FilterLabel,
  FiltersBox,
  FiltersBoxWithChildren,
  RangeInput,
  Switch,
  TOnInputsChange,
  TOnRangeChange,
  Title,
} from '../ui';

import {
  $catalogItemsStore,
  $filtersItemsStore,
  $filtersStore,
  getCatalogItemsFx,
  getFiltersItemsFx,
  removeFilters,
  updateDataAfterFilters,
  updatePrice,
  updateSwitches,
} from 'src/models';
import {
  TCheckboxFiltersData,
  TPriceFiltersData,
  TSwitchFiltersData,
  getWordForm,
  isEqualCharacteristicsArrs,
} from '~utils';

export const Filters: FC<IFiltersProps> = ({
  filters,
  className = '',
  isTitle,
  isDesktop,
  isFooter,
  categoryId,
  currSort,
  totalItems,
  onClose,
  ...rest
}) => {
  const { t } = useTranslation();

  const { checkboxes, switches, price } = useStore($filtersStore);

  const data = useMemo(() => filters.fields, [filters]);

  const { data: itemsData } = useStore($catalogItemsStore);
  const { status: filtersItemsStatus, data: filteredData } = useStore($filtersItemsStore);

  // нужен, чтобы при первом рендеринге не отправлять запрос
  const isInitialRender = useRef(true);

  const [currChoosedFilter, setCurrShoosedFilter] = useState<string | null>(null);
  const [isFilterLabelVisible, setIsFilterLabelVisible] = useState(false);

  const switchFilters = useMemo(
    () => [
      { f_name: 'stock', f_id: nanoid() },
      { f_name: 'is_new', f_id: nanoid() },
      { f_name: 'is_hit', f_id: nanoid() },
    ],
    [],
  );
  const [currFiltersQuery, setCurrFiltersQuery] = useState('');
  const [currSwitchQuery, setCurrSwitchQuery] = useState('');
  const [currPriceQuery, setCurrPriceQuery] = useState(
    `filter[price]=${+data.price.min},${+data.price.max}`,
  );
  const [currItemName, setCurrItemName] = useState<string | null>(null);
  // при сбросе фильтров обновляется дата и снова появляется лейбл, нужно этого избежать
  const [isClearFilters, setIsClearFilters] = useState(false);

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
  const handlePriceDebounced = useCallback(debounce(handleCreatePriceQuery, 1500), [
    handleCreatePriceQuery,
  ]);

  const handleFilteredDataRender = useCallback(() => {
    if (filteredData) {
      updateDataAfterFilters(filteredData);
    }
    setIsFilterLabelVisible(false);
    onClose?.();
  }, [filteredData, onClose]);

  const handleRemoveFilters = useCallback(() => {
    removeFilters(data.price);
    setIsClearFilters(true);
    setIsFilterLabelVisible(false);
    getCatalogItemsFx({ id: categoryId!, queries: [`sort=${currSort}`] });
  }, [categoryId, currSort, data.price]);

  const handleSwitchChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ target }) => {
    setIsClearFilters(false);
    setIsFilterLabelVisible(false);
    setCurrShoosedFilter(target.name.split('-')[0]);
    setCurrItemName(target.name);
    updateSwitches({ key: target.name.split('-')[0], value: target.checked });
  }, []);

  const handlePriceChange: TOnRangeChange = useCallback(val => {
    if (Array.isArray(val)) {
      setIsClearFilters(false);
      setIsFilterLabelVisible(false);
      setCurrShoosedFilter('discount');
      updatePrice({
        min: val[0],
        max: val[1],
      });
    }
  }, []);

  const handleInputsChange: TOnInputsChange = useCallback(
    e => {
      const { name, value } = e.target;
      setCurrShoosedFilter('discount');
      setIsClearFilters(false);
      setIsFilterLabelVisible(false);

      if (name === 'min') {
        updatePrice({
          ...price,
          min: +value,
        });
      } else {
        updatePrice({
          ...price,
          max: +value,
        });
      }
    },
    [price],
  );

  const switchChildrenNode = useMemo(
    () =>
      switchFilters.map(({ f_id, f_name }, i) => (
        <li className={styles.list_item} key={f_id}>
          <Switch
            label={t(`filters.${f_name}`)}
            checked={switches[f_name]}
            id={f_id?.toString() + `_${nanoid()}`}
            name={f_name + '-' + i}
            onChange={handleSwitchChange}
          />
        </li>
      )),
    [switchFilters, switches, handleSwitchChange, t],
  );

  const priceChildrenNode = useMemo(
    () => (
      <div className={styles.price_box}>
        <RangeInput
          minValue={price.min}
          maxValue={price.max}
          rangeStart={+data.price.min}
          rangeEnd={+data.price.max}
          onRangeChange={handlePriceChange}
          onInputsChange={handleInputsChange}
        />
        <Switch
          label={t('filters.discount')}
          name={'discount-2'}
          checked={switches.discount}
          onChange={handleSwitchChange}
        />
      </div>
    ),
    [switches, price, handleSwitchChange, t, handlePriceChange, handleInputsChange, data.price],
  );

  const isShowRemoveFiltersBtn = useMemo(
    () =>
      currFiltersQuery ||
      currSwitchQuery ||
      (currPriceQuery !== `filter[price]=${+data.price.min},${+data.price.max}` &&
        currPriceQuery !== ''),
    [currFiltersQuery, currSwitchQuery, currPriceQuery, data.price.min, data.price.max],
  );

  useEffect(() => {
    if (!isInitialRender.current && categoryId && currSort && currPriceQuery) {
      getFiltersItemsFx({
        id: categoryId,
        queries: [`sort=${currSort}`, currFiltersQuery, currSwitchQuery, currPriceQuery],
      });
    }
    setTimeout(() => (isInitialRender.current = false), 0);
  }, [categoryId, currSort, currFiltersQuery, currSwitchQuery, currPriceQuery]);

  useEffect(() => {
    if (!isEqualCharacteristicsArrs(itemsData?.data, filteredData?.data) && !isClearFilters) {
      setIsFilterLabelVisible(true);
    }
  }, [filteredData, itemsData, isClearFilters]);

  useEffect(() => {
    handleCreateFiltersQuery(checkboxes);
  }, [checkboxes]);

  useEffect(() => {
    handleCreateSwitchQuery(switches);
  }, [switches]);

  useEffect(() => {
    handlePriceDebounced({ price });
  }, [price, handlePriceDebounced, currPriceQuery]);

  useEffect(() => {
    if (!price.max) {
      updatePrice({
        min: +data.price.min,
        max: +data.price.max,
      });
    }
  }, []);

  return (
    <>
      <div className={clsx(styles.container, className)} {...rest}>
        {isTitle && (
          <div className={styles.title_box}>
            <Title>{t('filters.title')}</Title>
            <CloseButton onClick={onClose} />
          </div>
        )}
        {isDesktop && (
          <div className={styles.total_box}>
            {totalItems && (
              <div className={styles.total_items_box}>
                <Title level={ETitleLevel.h4} className={styles.total_items}>
                  {totalItems}
                </Title>
                <Title level={ETitleLevel.h4} className={styles.total_items_text}>
                  {t(`filters.items_word.${getWordForm(totalItems)}`)}
                </Title>
              </div>
            )}
            {isShowRemoveFiltersBtn && (
              <CloseButton
                text={t('filters.btn_remove_filters')!}
                className={styles.close_btn}
                onClick={handleRemoveFilters}
              />
            )}
          </div>
        )}
        <FiltersBoxWithChildren
          label={
            currChoosedFilter === 'discount' &&
            isFilterLabelVisible &&
            !isFooter && (
              <FilterLabel
                className={styles.label}
                count={filteredData?.meta.pagination.total_items ?? 0}
                onClick={handleFilteredDataRender}
                style={{ top: `${29 + +(currItemName?.split('-')[1] ?? 0) * 36}px` }}
                disabled={filteredData?.meta.pagination.total_items === 0}
              />
            )
          }
          title={'price'}
        >
          {priceChildrenNode}
        </FiltersBoxWithChildren>
        <FiltersBoxWithChildren
          label={
            (currChoosedFilter === 'stock' ||
              currChoosedFilter === 'is_new' ||
              currChoosedFilter === 'is_hit') &&
            isFilterLabelVisible &&
            !isFooter && (
              <FilterLabel
                className={styles.label}
                count={filteredData?.meta.pagination.total_items ?? 0}
                onClick={handleFilteredDataRender}
                style={{ top: `${29 + +(currItemName?.split('-')[1] ?? 0) * 36}px` }}
                disabled={filteredData?.meta.pagination.total_items === 0}
              />
            )
          }
          title={'stock_title'}
        >
          {switchChildrenNode}
        </FiltersBoxWithChildren>

        {Object.entries(data).map(([key, value]) => {
          if (Array.isArray(value) && value.length) {
            return (
              <FiltersBox
                key={key}
                title={key}
                filtersList={value}
                isShowLabel={!isFooter}
                currChoosedFilter={currChoosedFilter}
                isFilterLabelVisible={isFilterLabelVisible}
                setIsFilterLabelVisible={setIsFilterLabelVisible}
                setIsClearFilters={setIsClearFilters}
                setCurrShoosedFilter={setCurrShoosedFilter}
                countAfterFiltered={filteredData?.meta.pagination.total_items ?? 0}
                handleFilteredDataRender={handleFilteredDataRender}
              />
            );
          }
          return null;
        })}
      </div>
      {isFooter && (
        <div className={styles.footer}>
          <Button
            text={t('filters.btn_submit')}
            className={styles.success_btn}
            onClick={handleFilteredDataRender}
            disabled={filtersItemsStatus === 'LOADING' || !itemsData?.meta.pagination.total_items}
          />
          {isShowRemoveFiltersBtn && (
            <CloseButton
              text={t('filters.btn_remove_filters')!}
              className={styles.close_btn}
              onClick={handleRemoveFilters}
            />
          )}
        </div>
      )}
    </>
  );
};
