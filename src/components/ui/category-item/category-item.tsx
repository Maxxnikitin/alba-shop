import clsx from 'clsx';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './category-item.module.scss';
import { ICategoryItemProps } from './types';

import cableIcon from '../../../images/icons/cable.svg';

import { Paragraph } from '../paragraph';

export const CategoryItem: FC<ICategoryItemProps> = ({ text, className = '', icon, ...rest }) => {
  const { t } = useTranslation();

  return (
    <li className={clsx(styles.container, className)} {...rest}>
      <img src={cableIcon} alt={t('alts.category-icon') || ''} />
      <Paragraph className={styles.text}>{text}</Paragraph>
    </li>
  );
};
