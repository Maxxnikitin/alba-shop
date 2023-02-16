import { HTMLProps } from 'react';

export interface IParagraph extends HTMLProps<HTMLParagraphElement> {
  isError?: boolean;
}
