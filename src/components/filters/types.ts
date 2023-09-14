import { Dispatch, SetStateAction } from 'react';

import { TFilters, TItemsWithPaginationAndFilters, TSortingItems } from '~utils';

export interface IFiltersProps {
  filters: TFilters;
  setData: Dispatch<SetStateAction<TItemsWithPaginationAndFilters | null>>;
  currSort: TSortingItems;
  pageSize?: number;
  categoryId?: string;
  onClose?: () => void;
  isTitle?: boolean;
  isFooter?: boolean;
  className?: string;
}
