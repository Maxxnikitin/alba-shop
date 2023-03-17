import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';

import styles from './pagination.module.scss';
import { IPaginationProps } from './types';

import { ArrowPagIcon } from '../icons';
import { Paragraph } from '../paragraph';

export const Pagination: FC<IPaginationProps> = memo(
  ({ amountPage, activePage, className = '', ...rest }) => {
    const list = useMemo(() => Array.from({ length: amountPage }, (_v, i) => i + 1), [amountPage]);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button
          className={clsx(styles.btn, styles.btn_arrow)}
          type='button'
          disabled={activePage === 1}
        >
          <ArrowPagIcon />
        </button>
        {list.map(item => (
          <button
            key={item}
            className={clsx(styles.btn, styles.btn_num)}
            type='button'
            disabled={activePage === item}
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
        >
          <ArrowPagIcon className={styles.btn_arrow_right} />
        </button>
      </div>
    );
  },
);
