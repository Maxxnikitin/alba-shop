import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './tag.module.scss';
import { ITagProps } from './types';

import { Paragraph } from '../paragraph';

export const Tag: FC<ITagProps> = memo(({ className = '', text, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Paragraph className={clsx(styles.container, className)} {...rest}>
      {t(`tags.${text}`)}
    </Paragraph>
  );
});
