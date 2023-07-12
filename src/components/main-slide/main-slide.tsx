import clsx from 'clsx';
import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './main-slide.module.scss';
import { IMainSlideProps } from './types';

import { Button, EButtonKinds, Paragraph, Title } from '../ui';

export const MainSlide: FC<IMainSlideProps> = memo(({ data, className = '', ...rest }) => {
  const { title, text, btnLink, btnText, slide } = data;

  const navigate = useNavigate();

  const handleClick = useCallback(() => navigate(btnLink), [btnLink, navigate]);

  return (
    <div
      className={clsx(styles.container, className)}
      style={{ backgroundImage: `url(${slide})` }}
      {...rest}
    >
      <Title className={styles.title}>{title}</Title>
      <Paragraph className={styles.text}>{text}</Paragraph>
      {btnText && btnLink && (
        <Button
          onClick={handleClick}
          text={btnText}
          className={styles.btn}
          kind={EButtonKinds.mainSlide}
        />
      )}
    </div>
  );
});
