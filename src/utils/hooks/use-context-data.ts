import { useEffect, useState } from 'react';

import {
  getBestsellersItems,
  getBrandsItems,
  getCategories,
  getContacts,
  getFavoritesCount,
  getLatestItems,
} from '../api';
import { mockBrands, mockCharacteristicsData } from '../mock';

import { TDataContext } from '../types';

export const useContextData = () => {
  const [contextData, setContextData] = useState<TDataContext>({
    contacts: null,
    latestSuggestedItems: [],
    bestsellersSuggestedItems: [],
    categories: [],
    brands: [],
    favoritesCount: 0,
  });

  useEffect(() => {
    Promise.all([
      getContacts(),
      getLatestItems('?limit=7'),
      getBestsellersItems('?limit=7'),
      getCategories(),
      getBrandsItems(),
      // getFavoritesCount(),
    ])
      .then(([contacts, latest, bestsellers, categories, brands]) =>
        setContextData({
          contacts: contacts.data,
          latestSuggestedItems: mockCharacteristicsData,
          bestsellersSuggestedItems: mockCharacteristicsData,
          categories: categories.data,
          brands: mockBrands,
          favoritesCount: 1,
        }),
      )
      .catch(err => console.error(err));
  }, []);

  return { contextData };
};
