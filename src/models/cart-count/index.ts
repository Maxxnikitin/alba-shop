import { createEffect, createEvent, createStore } from 'effector';

import { getCartCount } from '~utils';

export const $cartCountStore = createStore(0);

export const updateCartCount = createEvent<number>();
export const clearCartCount = createEvent();

export const updateCartFx = createEffect(async () => {
  const response = await getCartCount();
  return response.data.total_items;
});
