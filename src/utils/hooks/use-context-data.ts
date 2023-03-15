import { useEffect, useState } from 'react';

// import { getBestsellersItems, getCategories, getContacts, getLatestItems } from '../api';
import { mockCategories, mockCharacteristicsData, mockContactsData } from '../mock';
import { TDataContext } from '../types';

export const useContextData = () => {
  const [contextData, setContextData] = useState<TDataContext>({
    contacts: null,
    latestSuggestedItems: [],
    bestsellersSuggestedItems: [],
    categories: [],
  });

  useEffect(() => {
    // Promise.all([
    //   getContacts(),
    //   getLatestItems('?limit=7'),
    //   getBestsellersItems('?limit=7'),
    //   getCategories(),
    // ])
    //   .then(([contacts, latest, bestsellers, categories]) =>
    //     setContextData({
    //       contacts,
    //       latestSuggestedItems: latest.data,
    //       bestsellersSuggestedItems: bestsellers.data,
    //       categories,
    //     }),
    //   )
    //   .catch(err => console.error(err));

    setContextData({
      contacts: mockContactsData,
      latestSuggestedItems: mockCharacteristicsData,
      bestsellersSuggestedItems: mockCharacteristicsData,
      categories: mockCategories,
    });
  }, []);

  return { contextData };
};
