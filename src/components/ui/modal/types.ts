import { HTMLProps } from 'react';

export interface IModalProps extends HTMLProps<HTMLElement> {
  onClose: () => void;
}
