import { Dispatch, SetStateAction } from 'react';

export interface ISignInSmsProps {
  setIsHidden: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export type THandleSignInRequest = (otp: number) => void;

export type TInputsData = { [key: string]: string };
