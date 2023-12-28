import {
  $catalogCommonStore,
  getCatalogCommonFx,
  removeCommonItems,
  startCommonRequest,
  updateCatalogCommonBtnFx,
} from '.';

$catalogCommonStore
  .on(startCommonRequest, ({ data }) => ({
    status: 'LOADING',
    data: data ?? null,
    error: null,
  }))
  .on(removeCommonItems, () => ({
    status: 'NONE',
    data: null,
    error: null,
  }))
  .on(getCatalogCommonFx.doneData, (_, data) => ({
    status: 'SUCCESS',
    data,
    error: null,
  }))
  .on(getCatalogCommonFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }))
  .on(updateCatalogCommonBtnFx.doneData, (prev, data) => ({
    status: 'SUCCESS',
    data: { data: [...prev.data!.data, ...data.data], meta: data.meta },
    error: null,
  }))
  .on(updateCatalogCommonBtnFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }));
