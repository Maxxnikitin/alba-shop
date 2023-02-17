import { HTMLProps } from 'react';

export interface IParagraphProps extends HTMLProps<HTMLParagraphElement> {
  isError?: boolean;
}
