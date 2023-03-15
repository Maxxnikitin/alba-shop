import { createContext } from 'react';

import { TDataContext } from './types';

export const DataContext = createContext<TDataContext>({
  contacts: null,
  latestSuggestedItems: [],
  bestsellersSuggestedItems: [],
  categories: [],
});
