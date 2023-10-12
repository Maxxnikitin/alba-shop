import { Dispatch, SetStateAction } from 'react';

import { TCharacteristic, TFilters, TItemsWithPaginationAndFilters, TSortingItems } from '~utils';

export interface IFiltersProps {
  filters: TFilters;
  setData: Dispatch<SetStateAction<TItemsWithPaginationAndFilters | null>>;
  currSort: TSortingItems;
  pageSize?: number;
  categoryId?: string;
  propsData: TCharacteristic[];
  onClose?: () => void;
  isTitle?: boolean;
  isFooter?: boolean;
  className?: string;
}
