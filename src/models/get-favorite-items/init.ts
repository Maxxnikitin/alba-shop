import {
  $favoriteItemsStore,
  getFavoriteItemsFx,
  removeFavoriteItems,
  startFavoriteItemsRequest,
  updateFavoriteItemsBtnFx,
} from '.';

$favoriteItemsStore
  .on(startFavoriteItemsRequest, ({ data }) => ({
    status: 'LOADING',
    data: data ?? null,
    error: null,
  }))
  .on(removeFavoriteItems, () => ({
    status: 'NONE',
    data: null,
    error: null,
  }))
  .on(getFavoriteItemsFx.doneData, (_, data) => ({
    status: 'SUCCESS',
    data,
    error: null,
  }))
  .on(getFavoriteItemsFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }))
  .on(updateFavoriteItemsBtnFx.doneData, (prev, data) => ({
    status: 'SUCCESS',
    data: { data: [...prev.data!.data, ...data.data], meta: data.meta },
    error: null,
  }))
  .on(updateFavoriteItemsBtnFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }));
