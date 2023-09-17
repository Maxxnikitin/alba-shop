import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';

import styles from './pagination.module.scss';
import { IPaginationProps } from './types';

import { ArrowPagIcon } from '../icons';
import { Paragraph } from '../paragraph';

export const Pagination: FC<IPaginationProps> = memo(
  ({ amountPage, activePage, setCurrPaginationPage, className = '', ...rest }) => {
    const list = useMemo(() => Array.from({ length: amountPage }, (_v, i) => i + 1), [amountPage]);

    const listToRender = useMemo(() => {
      if (list.length <= 7) return list;

      if (activePage <= 4) return [1, 2, 3, 4, 5, '...', list.length];

      if (activePage >= list.length - 3) {
        return [
          1,
          '...',
          list.length - 4,
          list.length - 3,
          list.length - 2,
          list.length - 1,
          list.length,
        ];
      }

      return [1, '...', activePage - 1, activePage, activePage + 1, '...', list.length];
    }, [list, activePage]);

    const handlePrevClick = () => {
      setCurrPaginationPage(activePage - 1);
    };

    const handleNextClick = () => {
      setCurrPaginationPage(activePage + 1);
    };

    const handleNumClick: (num: number | string) => () => void = num => () => {
      if (typeof num === 'string') return;

      setCurrPaginationPage(num);
    };

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button
          className={clsx(styles.btn, styles.btn_arrow)}
          type='button'
          disabled={activePage === 1}
          onClick={handlePrevClick}
        >
          <ArrowPagIcon />
        </button>
        {listToRender.map((item, i) => (
          <button
            key={i}
            className={clsx(styles.btn, styles.btn_num)}
            type='button'
            disabled={activePage === item || item === '...'}
            onClick={handleNumClick(item)}
          >
            <Paragraph
              className={clsx(styles.text, {
                [styles.text_active]: activePage === item,
              })}
            >
              {item}
            </Paragraph>
          </button>
        ))}
        <button
          className={clsx(styles.btn, styles.btn_arrow)}
          type='button'
          disabled={activePage === list.length}
          onClick={handleNextClick}
        >
          <ArrowPagIcon className={styles.btn_arrow_right} />
        </button>
      </div>
    );
  },
);
