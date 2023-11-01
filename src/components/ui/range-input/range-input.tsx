import clsx from 'clsx';
import Slider from 'rc-slider';
import { FC } from 'react';

import styles from './range-input.module.scss';
import { IRangeInputProps } from './types';

import { Input } from '..';

import { rangeHandlerStyle } from '~utils';

export const RangeInput: FC<IRangeInputProps> = ({
  className = '',
  rangeStart = 1,
  rangeEnd = 300000,
  minValue,
  maxValue,
  onRangeChange,
  onInputsChange,
  ...rest
}) => (
  <div className={clsx(styles.container, className)} {...rest}>
    <div className={styles.inputs}>
      <Input
        fieldClassName={styles.input}
        type='number'
        name='min'
        kind='small'
        min={rangeStart}
        max={rangeEnd}
        value={minValue.toString().replace(/^0+/, '') || '0'}
        onChange={onInputsChange}
      />
      <Input
        fieldClassName={styles.input}
        type='number'
        name='max'
        kind='small'
        min={rangeStart}
        max={rangeEnd}
        value={maxValue.toString().replace(/^0+/, '') || '0'}
        onChange={onInputsChange}
      />
    </div>
    <Slider
      className={styles.range}
      handleStyle={rangeHandlerStyle}
      range
      min={rangeStart}
      max={rangeEnd}
      value={[minValue, maxValue]}
      onChange={onRangeChange}
    />
  </div>
);
