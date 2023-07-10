import { TBrand, TCharacteristic } from '~utils';

export interface IItemsBoxProps {
  type: EBrands;
  data: TCharacteristic[] | TBrand[];
  className?: string;
}

export enum EBrands {
  LATEST = 'latest',
  BESTSELLERS = 'bestsellers',
  BRANDS = 'brands',
}
