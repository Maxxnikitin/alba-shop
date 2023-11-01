import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './tooltip.module.scss';
import { ITooltipProps } from './types';

import { Paragraph } from '../paragraph';

export const Tooltip: FC<ITooltipProps> = memo(({ text, className = '', ...rest }) => (
  <div className={clsx(styles.container, className)} {...rest}>
    <Paragraph className={styles.text}>{text}</Paragraph>
    <div className={styles.icon} />
  </div>
));
