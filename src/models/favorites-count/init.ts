import {
  $favoritesCountStore,
  clearFavoritesCount,
  updateFavoritesFx,
  updateFavoritesCount,
} from '.';

$favoritesCountStore
  .on(updateFavoritesCount, (_, value) => value)
  .on(updateFavoritesFx.doneData, (_, data) => data)
  .reset(clearFavoritesCount);

updateFavoritesFx.fail.watch(() => console.log('err'));
