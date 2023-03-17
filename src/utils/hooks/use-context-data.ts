import { useEffect, useState } from 'react';

// import {
//   getBestsellersItems,
//   getBrandsItems,
//   getCategories,
//   getContacts,
//   getLatestItems,
// } from '../api';

// import { getBestsellersItems, getCategories, getContacts, getLatestItems } from '../api';
import { mockBrands, mockCategories, mockCharacteristicsData, mockContactsData } from '../mock';
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
    // Promise.all([
    //   getContacts(),
    //   getLatestItems('?limit=7'),
    //   getBestsellersItems('?limit=7'),
    //   getCategories(),
    //   getBrandsItems(),
    // ])
    //   .then(([contacts, latest, bestsellers, categories, brands]) =>
    //     setContextData({
    //       contacts,
    //       latestSuggestedItems: latest.data,
    //       bestsellersSuggestedItems: bestsellers.data,
    //       categories,
    //       brands: brands.data,
    //     }),
    //   )
    //   .catch(err => console.error(err));

    setContextData({
      contacts: mockContactsData,
      latestSuggestedItems: mockCharacteristicsData,
      bestsellersSuggestedItems: mockCharacteristicsData,
      categories: mockCategories,
      brands: mockBrands,
    });
  }, []);

  return { contextData };
};
