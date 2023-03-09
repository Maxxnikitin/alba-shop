import { TCharacteristic } from '~utils';

export interface IItemsBoxProps {
  type: 'latest' | 'hits';
  data: TCharacteristic[];
  className?: string;
}
