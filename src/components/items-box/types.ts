import { TCharacteristic } from '~utils';

export interface IItemsBoxProps {
  type: 'latest' | 'bestsellers';
  data: TCharacteristic[];
  className?: string;
}
