import clsx from 'clsx';
import { FC } from 'react';

import styles from './back-button.module.scss';

import { IBackButtonProps } from './types';

import { Paragraph } from '..';

import { ArrowBackIcon } from '../icons';

export const BackButton: FC<IBackButtonProps> = ({
  className = '',
  textClassName = '',
  iconClassName = '',
  text,
  ...rest
}) => (
  <button className={clsx(styles.button, className)} {...rest}>
    <ArrowBackIcon className={clsx(styles.icon, iconClassName)} />
    {text && <Paragraph className={clsx(styles.text, textClassName)}>{text}</Paragraph>}
  </button>
);
