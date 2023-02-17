import { ChangeEventHandler } from 'react';

export interface IRangeInputProps {
  className?: string;
  min: number;
  max: number;
  from?: number;
  to?: number;
  onRangeChange: TOnRangeChange;
  onInputsChange: TOnInputsChange;
}

export type TOnRangeChange = (val: number | number[]) => void;
export type TOnInputsChange = ChangeEventHandler<HTMLInputElement>;
