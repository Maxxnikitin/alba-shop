import { TBrand, TCharacteristic } from '~utils';

export interface IItemsBoxProps {
  type: 'latest' | 'bestsellers' | 'brands';
  data: TCharacteristic[] | TBrand[];
  className?: string;
}
