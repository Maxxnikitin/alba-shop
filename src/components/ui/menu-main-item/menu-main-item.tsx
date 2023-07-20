import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './menu-main-item.module.scss';
import { IMenuMainItemProps } from './types';

import { ArrowMenuIcon } from '../icons';
import { Paragraph } from '../paragraph';

export const MenuMainItem: FC<IMenuMainItemProps> = memo(
  ({ text, icon, type = 'button', isOpen = false, className = '', ...rest }) => {
    const { t } = useTranslation();

    return (
      <button className={clsx(styles.container, className)} type={type} {...rest}>
        <img src={icon} alt={t('alts.category-icon')!} />
        <Paragraph className={styles.text}>{text}</Paragraph>
        <ArrowMenuIcon className={clsx(styles.img, { [styles.img_open]: isOpen })} />
      </button>
    );
  },
);
