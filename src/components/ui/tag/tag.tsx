import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './tag.module.scss';
import { ITagProps } from './types';

import { Paragraph } from '../paragraph';

export const Tag: FC<ITagProps> = memo(({ className = '', text, isNotStock = false, ...rest }) => (
  <Paragraph
    className={clsx(styles.container, { [styles.black_label]: isNotStock }, className)}
    {...rest}
  >
    {text}
  </Paragraph>
));
