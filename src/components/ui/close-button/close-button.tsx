import clsx from 'clsx';
import { FC } from 'react';

import styles from './close-button.module.scss';

import { ICloseButtonProps } from './types';

import { Paragraph } from '..';

import { CrossIcon } from '../icons';

export const CloseButton: FC<ICloseButtonProps> = ({
  className = '',
  textClassName = '',
  text,
  ...rest
}) => (
  <button className={clsx(styles.button, className)} {...rest}>
    {text && <Paragraph className={clsx(styles.text, textClassName)}>{text}</Paragraph>}
    <CrossIcon />
  </button>
);
