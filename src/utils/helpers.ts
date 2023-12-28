import { Dispatch, SetStateAction } from 'react';

import { EWordForm, TCharacteristic } from './types';
import { TCategory } from './types';
import { TCategoryChildren } from './types';

export const handleToggleState = (setState: Dispatch<SetStateAction<boolean>>) => () => {
  setState(prev => !prev);
};

export const isEqualCharacteristicsArrs = (a?: TCharacteristic[], b?: TCharacteristic[]) => {
  if (!a || !b) return true;

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

type TGetWordForm = (num: number) => EWordForm;

export const getWordForm: TGetWordForm = number => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return EWordForm.ONE;
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return EWordForm.FEW;
  } else {
    return EWordForm.MANY;
  }
};

export const normalizeItemUrl = (url: string, search?: string) => {
  if (url === '/latest' || url === '/bestsellers') return url;

  if (url === '/' || !search?.split('_')[1]) return '/catalog';

  return url;
};

type TScroll = (top?: number, behavior?: 'smooth' | 'auto') => void;

export const handleScroll: TScroll = (top = 0, behavior = 'smooth') => {
  window.scrollTo({
    top,
    left: 0,
    behavior,
  });
};
