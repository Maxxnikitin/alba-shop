import { HTMLProps } from 'react';

export interface IPhotosBoxProps extends HTMLProps<HTMLImageElement> {
  photos: string[];
  activePhoto: number;
}
