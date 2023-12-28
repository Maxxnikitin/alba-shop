import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './main-slide.module.scss';
import { IMainSlideProps } from './types';

export const MainSlide: FC<IMainSlideProps> = memo(({ data, className = '', ...rest }) => {
  const { slide, slide_mob: slideMob } = data;

  return (
    <div
      className={clsx(styles.container, className)}
      style={{ backgroundImage: `url(${window.innerWidth > 600 ? slide : slideMob})` }}
      {...rest}
    />
  );
});
