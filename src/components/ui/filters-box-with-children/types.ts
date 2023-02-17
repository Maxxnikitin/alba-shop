import { ReactNode } from 'react';

export interface IFiltersBoxWithChildren {
  title: string;
  children: ReactNode;
  className?: string;
}

export type TFiltersBoxWithChildrenItem = {
  f_id: number | string;
  f_name: string;
};

export type TFiltersBoxWithChildrenBlock = Record<number | string, boolean>;

export type TSwitchFiltersData = {
  [key: string]: boolean;
  // brand: TFilterBlock;
  // material: TFilterBlock;
  // model: TFilterBlock;
  // color: TFilterBlock;
  // length: TFilterBlock;
  // output: TFilterBlock;
  // charging_type: TFilterBlock;
  // connector_type: TFilterBlock;
  // price: TFilterBlock;
  // is_new: boolean;
  // is_hit: boolean;
  // in_stock: boolean;
  // discount: boolean;
};

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
//   in_stock = 'in_stock',
//   discount = 'discount',
// }
