import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './breadcrumbs-item.module.scss';
import { IBreadcrumbsItemProps } from './types';

import { Paragraph } from '../paragraph';

export const BreadcrumbsItem: FC<IBreadcrumbsItemProps> = memo(
  ({ text, link = '', isActive = false, className = '', brandName, ...rest }) => {
    const { t } = useTranslation();

    return (
      <>
        {isActive ? (
          <Paragraph
            className={clsx(styles.text, { [styles.active]: isActive }, className)}
            {...rest}
          >
            {brandName && isActive ? brandName : t(`breadcrumbs.${text}`)}
          </Paragraph>
        ) : (
          <Link className={clsx(styles.text, styles.link, className)} to={link} {...rest}>
            {brandName && isActive ? brandName : t(`breadcrumbs.${text}`) + ' /'}
          </Link>
        )}
      </>
    );
  },
);
