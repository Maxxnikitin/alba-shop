import { $filtersItemsStore, getFiltersItemsFx, removeFilterItems, startFiltersRequest } from '.';

$filtersItemsStore
  .on(startFiltersRequest, () => ({
    status: 'LOADING',
    data: null,
    error: null,
  }))
  .on(removeFilterItems, () => ({
    status: 'NONE',
    data: null,
    error: null,
  }))
  .on(getFiltersItemsFx.doneData, (_, data) => ({
    status: 'SUCCESS',
    data,
    error: null,
  }))
  .on(getFiltersItemsFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }));
