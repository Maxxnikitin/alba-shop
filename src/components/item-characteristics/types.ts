import { HTMLProps } from 'react';

import { TCharacteristics } from '~utils';

export interface IItemCharacteristicsProps extends HTMLProps<HTMLDivElement> {
  characteristics: TCharacteristics[];
  currentCharacteristic: TCharacteristics;
  description: string[] | null;
  className?: string;
}