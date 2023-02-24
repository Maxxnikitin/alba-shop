import { MouseEventHandler } from 'react';

import { TCharacteristics, TGetProductRes } from '~utils';

export interface IItemFullPhotoProps {
  photo: string;
  currentCharacteristic: TCharacteristics;
  dataObj: TGetProductRes;
  className?: string;
  isMobile?: boolean;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
}
