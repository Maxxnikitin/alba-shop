import { Dispatch, SetStateAction } from 'react';

import { TCharacteristic } from './types';

export const handleToggleState = (setState: Dispatch<SetStateAction<boolean>>) => () => {
  setState(prev => !prev);
};

export const isEqualCharacteristicsArrs = (
  a: TCharacteristic[],
  b: TCharacteristic[] | undefined,
) => {
  if (!b) return false;

  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    const x = b.find(item => item.id === a[i].id);

    if (!x) return false;
  }

  return true;
};
