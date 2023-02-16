import { HTMLProps } from 'react';

export interface IInput extends HTMLProps<HTMLInputElement> {
  fieldClassName?: string;
  errorText?: string;
  isError?: boolean;
}
