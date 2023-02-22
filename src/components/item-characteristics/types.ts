import { TCharacteristics } from '~utils';

export interface IItemCharacteristicsProps {
  characteristics: TCharacteristics[];
  currentCharacteristic: TCharacteristics;
  description: string[] | null;
  className?: string;
}
