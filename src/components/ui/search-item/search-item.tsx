import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import styles from './search-item.module.scss';
import { ISearchItemProps } from './types';

import { ArrowMenuIcon } from '../icons';
import { Paragraph } from '../paragraph';

export const SearchItem: FC<ISearchItemProps> = memo(
  ({
    name,
    icon,
    slug,
    dataType,
    id,
    isBold,
    onCloseModal,
    className = '',
    searchReqString,
    isMobile = false,
    ...rest
  }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleClick = () => {
      switch (dataType) {
        case 'products':
          navigate(`/catalog/product/${id}`);
          break;
        case 'categories':
          navigate(`/catalog/${id}_${slug}`);
          break;
        case 'rest':
          navigate(`/search?q=${searchReqString}`);
      }
      onCloseModal();
    };

    return (
      <button className={clsx(styles.container, className)} onClick={handleClick} {...rest}>
        {icon ? (
          <img
            className={clsx(styles.icon, { [styles.invert]: !isMobile })}
            src={icon}
            alt={t('alts.category-icon')!}
          />
        ) : (
          <p className={styles.icon} />
        )}
        <Paragraph
          className={clsx(styles.text, { [styles.bold]: isBold, [styles.text_mob]: isMobile })}
        >
          {name}
        </Paragraph>
        {isMobile && dataType === 'categories' && <ArrowMenuIcon className={styles.img} />}
      </button>
    );
  },
);
