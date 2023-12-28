import {
  $catalogItemsStore,
  getCatalogItemsFx,
  removeCatalogItems,
  startItemsRequest,
  updateCatalogItemsBtnFx,
  updateDataAfterFilters,
  updateFiltersAfterFilters,
} from '.';

$catalogItemsStore
  .on(startItemsRequest, ({ data }) => ({
    status: 'LOADING',
    data: data ?? null,
    error: null,
  }))
  .on(removeCatalogItems, () => ({
    status: 'NONE',
    data: null,
    error: null,
  }))
  .on(updateDataAfterFilters, (prev, data) => ({
    status: 'SUCCESS',
    /**
     * Небольшой костыль. Диапазон цен нужно оставлять изначальным, потому что при сбросе фильтров
     * нужно иметь возможность заново запросить все товары. Если при фильтрации подставлять новый диапазон,
     * то при сбросе запрашиваются товары в этом самом диапазоне.
     */
    data: {
      ...data,
      meta: {
        ...data.meta,
        filters: {
          ...data.meta.filters,
          fields: {
            ...data.meta.filters.fields,
            price: prev.data?.meta.filters.fields.price!,
          },
        },
      },
    },
    error: null,
  }))
  .on(updateFiltersAfterFilters, ({ data }, { meta }) => ({
    status: 'SUCCESS',
    data: {
      data: [...data!.data],
      meta: {
        ...meta,
        filters: {
          ...meta.filters,
          fields: {
            ...meta.filters.fields,
            price: data?.meta.filters.fields.price!,
          },
        },
      },
    },
    error: null,
  }))
  .on(getCatalogItemsFx.doneData, (_, data) => ({
    status: 'SUCCESS',
    data,
    error: null,
  }))
  .on(getCatalogItemsFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }))
  .on(updateCatalogItemsBtnFx.doneData, (prev, { data, meta }) => ({
    status: 'SUCCESS',
    data: { data: [...prev.data!.data, ...data], meta: meta },
    error: null,
  }))
  .on(updateCatalogItemsBtnFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }));
