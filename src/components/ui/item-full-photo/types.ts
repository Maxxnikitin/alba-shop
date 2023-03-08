import { MouseEventHandler } from 'react';

import { TCharacteristic, TGetProductRes } from '~utils';

export interface IItemFullPhotoProps {
  photo: string;
  currentCharacteristic: TCharacteristic;
  dataObj: TGetProductRes;
  className?: string;
  isMobile?: boolean;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
}
