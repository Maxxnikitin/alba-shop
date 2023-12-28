import { useStore } from 'effector-react';
import { useMemo } from 'react';

import { $cartItemsStore, $catalogItemsStore } from 'src/models';

export const useLoader = () => {
  const { status: cartStatus } = useStore($cartItemsStore);
  const { status: catalogStatus } = useStore($catalogItemsStore);

  const isLoader = useMemo(
    () => cartStatus === 'LOADING' || catalogStatus === 'LOADING',
    [cartStatus, catalogStatus],
  );

  return { isLoader };
};
