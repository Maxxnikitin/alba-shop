import { useEffect, useState } from 'react';

import {
  getBestsellersItems,
  getBrandsItems,
  getCategories,
  getContacts,
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
  });

  useEffect(() => {
    Promise.all([
      getContacts(),
      getLatestItems('?limit=7'),
      getBestsellersItems('?limit=7'),
      getCategories(),
      getBrandsItems(),
    ])
      .then(([contacts, latest, bestsellers, categories, brands]) =>
        setContextData({
          contacts: contacts.data,
          latestSuggestedItems: mockCharacteristicsData,
          bestsellersSuggestedItems: mockCharacteristicsData,
          categories: categories.data,
          brands: mockBrands,
        }),
      )
      .catch(err => console.error(err));
  }, []);

  console.log(contextData.categories);

  return { contextData };
};
