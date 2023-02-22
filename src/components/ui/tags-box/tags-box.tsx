import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './tags-box.module.scss';
import { ITagsBoxProps } from './types';

import { Tag } from '..';

export const TagsBox: FC<ITagsBoxProps> = memo(({ className = '', dataArr, ...rest }) => {
  const { t } = useTranslation();
  console.log('q');

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {dataArr.map(item => (
        <Tag key={item} text={t(`tags.${item}`)} />
      ))}
    </div>
  );
});
