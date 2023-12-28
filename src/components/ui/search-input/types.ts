import { FormEventHandler, HTMLProps } from 'react';

export interface ISearchInputProps extends HTMLProps<HTMLInputElement> {
  onRemoveValue: () => void;
  formClassName?: string;
  isMob?: boolean;
  onFormSubmit?: FormEventHandler<HTMLFormElement>;
}
