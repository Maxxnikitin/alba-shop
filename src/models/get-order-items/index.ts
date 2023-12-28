import { createEffect, createEvent, createStore } from 'effector';

import { TStore } from '../types';

import { TOrdersWithPagination, TParams, getOrders } from '~utils';

export const $orderItemsStore = createStore<TStore<TOrdersWithPagination>>({
  status: 'NONE',
  data: null,
  error: null,
});

export const startOrderItemsRequest = createEvent();
export const removeOrdersItems = createEvent();

export const getOrderItemsFx = createEffect(async ({ queries }: TParams) => {
  startOrderItemsRequest();
  const response = await getOrders(queries);
  return response;
});

export const updateOrderItemsBtnFx = createEffect(async ({ queries }: TParams) => {
  startOrderItemsRequest();
  const response = await getOrders(queries);
  return response;
});
