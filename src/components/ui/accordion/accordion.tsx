import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './accordion.module.scss';
import { IAccordionProps } from './types';

import { Paragraph, ETitleLevel, Title } from '..';
import arrow from '../../../images/icons/arrow-acc.svg';

export const Accordion: FC<IAccordionProps> = memo(
  ({ className = '', dataObj, isOpen, onBtnClick, ...rest }) => {
    const { id, header, description } = dataObj;
    const { t } = useTranslation();

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button className={styles.btn} id={id.toString()} onClick={onBtnClick}>
          <Title className={styles.title} level={ETitleLevel.h4}>
            {header}
          </Title>
          <img
            className={clsx(styles.img, { [styles.img_open]: isOpen })}
            src={arrow}
            alt={t('alts.arrow-icon') || ''}
          />
        </button>
        <ul
          className={clsx(styles.list, { [styles.list_open]: isOpen })}
          style={(isOpen && { maxHeight: description.length * 20 }) || {}}
        >
          {description.map((item, i) => (
            <li className={styles.list_item} key={i}>
              <Paragraph className={styles.text}>{item}</Paragraph>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
