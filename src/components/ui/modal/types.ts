import { HTMLProps } from 'react';

export interface IModalProps extends HTMLProps<HTMLElement> {
  isOpen: boolean;
  withCloseBtn?: boolean;
  modalSize?: EModalSize;
  onClose?: () => void;
}

export enum EModalSize {
  SMALL = 'SMALL',
  NORMAL = 'NORMAL',
}
