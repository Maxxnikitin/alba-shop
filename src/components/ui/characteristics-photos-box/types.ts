import { HTMLProps } from 'react';

import { TCharacteristic } from '~utils';

export interface ICharacteristicsPhotoBoxProps extends HTMLProps<HTMLImageElement> {
  characteristics: TCharacteristic[];
  currentCharacteristic: TCharacteristic;
}
