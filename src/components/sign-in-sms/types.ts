export interface ISignInSmsProps {
  className?: string;
}

export type THandleSignInRequest = (otp?: number) => void;

export type TInputsData = { [key: string]: string };
