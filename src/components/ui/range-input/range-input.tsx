import clsx from 'clsx';
import Slider from 'rc-slider';
import { ChangeEventHandler, FC, useState } from 'react';

import styles from './range-input.module.scss';
import { IRangeInput } from './types';

import { Input } from '..';
import { handleStyle } from '../../../utils';

export const RangeInput: FC<IRangeInput> = ({ className = '', from = 1, to = 300000, ...rest }) => {
  const [fromCurrState, setFromCurrState] = useState(from);
  const [toCurrState, setToCurrState] = useState(to);

  const handleChange = (val: number | number[]) => {
    if (Array.isArray(val)) {
      setFromCurrState(val[0]);
      setToCurrState(val[1]);
    }
  };

  const handleInputsChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { name } = e.target;
    const { value } = e.target;

    if (name === 'gte') {
      setFromCurrState(+value);
    } else {
      setToCurrState(+value);
    }
  };

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <div className={styles.inputs}>
        <Input
          fieldClassName={styles.input}
          type='number'
          name='gte'
          min={from}
          max={to}
          value={fromCurrState}
          onChange={handleInputsChange}
        />
        <Input
          fieldClassName={styles.input}
          type='number'
          name='lte'
          min={from}
          max={to}
          value={toCurrState}
          onChange={handleInputsChange}
        />
      </div>
      <Slider
        handleStyle={handleStyle}
        range
        min={from}
        max={to}
        value={[fromCurrState, toCurrState]}
        onChange={handleChange}
      />
    </div>
  );
};
