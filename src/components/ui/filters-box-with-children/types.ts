import { ReactNode } from 'react';

export interface IFiltersBoxWithChildrenProps {
  title: string;
  children: ReactNode;
  label: ReactNode;
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
//   is_hit = 'is_hit',
//   stock = 'stock',
//   discount = 'discount',
// }
