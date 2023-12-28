import { $cartCountStore, clearCartCount, updateCartCount, updateCartFx } from '.';

$cartCountStore
  .on(updateCartCount, (_, value) => value)
  .on(updateCartFx.doneData, (_, data) => data)
  .reset(clearCartCount);

updateCartFx.fail.watch(() => console.log('err'));
