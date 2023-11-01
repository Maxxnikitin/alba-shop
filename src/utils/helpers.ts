import { Dispatch, SetStateAction } from 'react';

import { TCharacteristic } from './types';
import { TCategory } from './types';
import { TCategoryChildren } from './types';

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

export const createBreadcrumbsCatalogObject = (categories: TCategory[]): Record<string, string> => {
  const res: Record<string, string> = {};

  const recursionFn = (categories: TCategory[] | TCategoryChildren[]): void => {
    categories.forEach(item => {
      res[item.slug] = item.name;
      if (item.children) {
        recursionFn(item.children);
      }
    });
  };

  recursionFn(categories);

  return res;
};
