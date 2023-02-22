import { HTMLProps } from 'react';

import { TCharacteristics } from '~utils';

export interface ICharacteristicsPhotoBoxProps extends HTMLProps<HTMLImageElement> {
  characteristics: TCharacteristics[];
  currentCharacteristic: TCharacteristics;
  className?: string;
}
