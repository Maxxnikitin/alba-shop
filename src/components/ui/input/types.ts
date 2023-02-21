import { HTMLProps } from 'react';

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  fieldClassName?: string;
  errorText?: string;
  isError?: boolean;
  kind?: 'main' | 'small';
}
