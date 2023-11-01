import { FormEventHandler, HTMLProps } from 'react';

export interface ISearchInputProps extends HTMLProps<HTMLInputElement> {
  formClassName?: string;
  isMob?: boolean;
  onFormSubmit?: FormEventHandler<HTMLFormElement>;
}
