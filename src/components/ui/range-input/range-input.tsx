import clsx from 'clsx';
import Slider from 'rc-slider';
import { FC } from 'react';

import styles from './range-input.module.scss';
import { IRangeInputProps } from './types';

import { Input } from '..';
import { handleStyle } from '../../../utils';

export const RangeInput: FC<IRangeInputProps> = ({
  className = '',
  from = 1,
  to = 300000,
  min,
  max,
  onRangeChange,
  onInputsChange,
  ...rest
}) => {
  console.log('rr');
  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <div className={styles.inputs}>
        <Input
          fieldClassName={styles.input}
          type='number'
          name='min'
          min={from}
          max={to}
          value={min}
          onChange={onInputsChange}
        />
        <Input
          fieldClassName={styles.input}
          type='number'
          name='max'
          min={from}
          max={to}
          value={max}
          onChange={onInputsChange}
        />
      </div>
      <Slider
        handleStyle={handleStyle}
        range
        min={from}
        max={to}
        value={[min, max]}
        onChange={onRangeChange}
      />
    </div>
  );
};
