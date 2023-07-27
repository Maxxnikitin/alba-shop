import { createEffect, createEvent, createStore } from 'effector';

import { getFavoritesCount } from '~utils';

export const $favoritesCountStore = createStore(0);

export const updateFavoritesCount = createEvent<number>();
export const clearFavoritesCount = createEvent();

export const updateFavoritesFx = createEffect(async () => {
  const response = await getFavoritesCount();
  return response.data;
});
