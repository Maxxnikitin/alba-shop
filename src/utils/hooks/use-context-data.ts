import { useEffect, useState } from 'react';

import {
  getBestsellersItems,
  getBrandsItems,
  getCategories,
  getContacts,
  getLatestItems,
} from '../api';

import { createBreadcrumbsCatalogObject } from '../helpers';
import { TDataContext } from '../types';

export const useContextData = () => {
  const [contextData, setContextData] = useState<TDataContext>({
    contacts: null,
    latestSuggestedItems: [],
    bestsellersSuggestedItems: [],
    categories: [],
    brands: [],
    breadcrumbs: {},
  });

  useEffect(() => {
    Promise.all([
      getContacts(),
      getLatestItems(['?limit=7']),
      getBestsellersItems(['?limit=7']),
      getCategories(),
      getBrandsItems(),
    ])
      .then(([contacts, latest, bestsellers, categories, brands]) => {
        const breadcrumbs = createBreadcrumbsCatalogObject(categories.data);
        setContextData({
          contacts: contacts.data,
          latestSuggestedItems: latest.data,
          bestsellersSuggestedItems: bestsellers.data,
          categories: categories.data,
          brands: brands.data,
          breadcrumbs,
        });
      })
      .catch(err => console.error(err));
  }, []);

  return { contextData };
};
