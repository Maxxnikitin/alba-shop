import { Dispatch, SetStateAction } from 'react';

import { TFilterItem } from '~utils';

export interface IFiltersBoxProps {
  title: string;
  filtersList: TFilterItem[];
  currChoosedFilter: string | null;
  isFilterLabelVisible: boolean;
  isShowLabel: boolean;
  setIsFilterLabelVisible: Dispatch<SetStateAction<boolean>>;
  setIsClearFilters: Dispatch<SetStateAction<boolean>>;
  setCurrShoosedFilter: Dispatch<SetStateAction<string | null>>;
  countAfterFiltered: number;
  handleFilteredDataRender: () => void;
  className?: string;
}

// export enum EFiltersBlocks {
//   brand = 'brand',
//   material = 'material',
//   model = 'model',
//   color = 'color',
//   length = 'length',
//   output = 'output',
//   charging_type = 'charging_type',
//   connector_type = 'connector_type',
//   price = 'price',
//   is_new = 'is_new',
//   is_hit = 'is_bestseller',
//   stock = 'stock',
//   discount = 'discount',
// }
