import {
  $cartItemsStore,
  createCartItemsCatalogFx,
  getCartItemsFx,
  removeCartFx,
  removeCartItems,
  startCartItemsRequest,
  updateCartItemsCatalogFx,
  updateCartItemsFx,
} from '.';

$cartItemsStore
  .on(startCartItemsRequest, ({ data }) => ({
    status: 'LOADING',
    data: data ?? null,
    error: null,
  }))
  .on(removeCartItems, () => ({
    status: 'NONE',
    data: null,
    error: null,
  }))
  .on(updateCartItemsFx.doneData, (_, data) => ({
    status: 'SUCCESS',
    data,
    error: null,
  }))
  .on(updateCartItemsFx.failData, ({ data }, error) => ({
    status: 'REJECT',
    data: data ?? null,
    error,
  }))
  .on(getCartItemsFx.doneData, (_, data) => ({
    status: 'SUCCESS',
    data,
    error: null,
  }))
  .on(getCartItemsFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }))
  .on(removeCartFx.doneData, () => ({
    status: 'SUCCESS',
    data: { data: null },
    error: null,
  }))
  .on(removeCartFx.failData, (_, error) => ({
    status: 'REJECT',
    data: null,
    error,
  }))
  .on(createCartItemsCatalogFx.doneData, ({ data }) => ({
    status: 'SUCCESS',
    data,
    error: null,
  }))
  .on(createCartItemsCatalogFx.failData, ({ data }, error) => ({
    status: 'REJECT',
    data: data ?? null,
    error,
  }))
  .on(updateCartItemsCatalogFx.doneData, ({ data }) => ({
    status: 'SUCCESS',
    data,
    error: null,
  }))
  .on(updateCartItemsCatalogFx.failData, ({ data }, error) => ({
    status: 'REJECT',
    data: data ?? null,
    error,
  }));
