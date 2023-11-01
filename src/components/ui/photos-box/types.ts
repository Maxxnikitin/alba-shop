import { HTMLProps } from 'react';

import { TPhotos } from '~utils';

export interface IPhotosBoxProps extends HTMLProps<HTMLImageElement> {
  photos: TPhotos;
  activePhoto: keyof TPhotos;
}
