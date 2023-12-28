import { createEffect, createEvent, createStore } from 'effector';

import { TStore } from '../types';

import { TItemsWithPagination, TParams } from '~utils';

export const $catalogCommonStore = createStore<TStore<TItemsWithPagination>>({
  status: 'NONE',
  data: null,
  error: null,
});

export const startCommonRequest = createEvent();
export const removeCommonItems = createEvent();

export const getCatalogCommonFx = createEffect(async ({ q, queries, fn }: TParams) => {
  startCommonRequest();
  const response = await fn!(queries, q);
  return response;
});

export const updateCatalogCommonBtnFx = createEffect(async ({ q, queries, fn }: TParams) => {
  startCommonRequest();
  const response = await fn!(queries, q);
  return response;
});
