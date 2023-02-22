import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './tag.module.scss';
import { ITagProps } from './types';

import { Paragraph } from '../paragraph';

export const Tag: FC<ITagProps> = memo(({ className = '', text, ...rest }) => {
  console.log('Render Tag');

  return (
    <Paragraph className={clsx(styles.container, className)} {...rest}>
      {text}
    </Paragraph>
  );
});
