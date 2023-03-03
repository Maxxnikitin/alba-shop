import { ChangeEventHandler } from 'react';

export interface IRangeInputProps {
  className?: string;
  minValue: number;
  maxValue: number;
  rangeStart?: number;
  rangeEnd?: number;
  onRangeChange: TOnRangeChange;
  onInputsChange: TOnInputsChange;
}

export type TOnRangeChange = (val: number | number[]) => void;
export type TOnInputsChange = ChangeEventHandler<HTMLInputElement>;
