import { HTMLProps } from 'react';

export interface IPhoneInputProps extends HTMLProps<HTMLInputElement> {
  isError?: boolean;
}
