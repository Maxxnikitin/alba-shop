import { HTMLProps } from 'react';

export interface IModalProps extends HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  withCloseBtn?: boolean;
  modalSize?: EModalSize;
  onClose?: () => void;
  closeIcon?: (props: { className: string }) => JSX.Element;
  closeBtnClassName?: string;
}

export enum EModalSize {
  SMALL = 'SMALL',
  NORMAL = 'NORMAL',
}
