import clsx from 'clsx';
import { useStore } from 'effector-react';
import { FC, memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './pagination.module.scss';
import { IPaginationProps } from './types';

import { Button, EButtonKinds } from '../button';
import { ArrowPagIcon } from '../icons';
import { Paragraph } from '../paragraph';

import { $catalogItemsStore } from 'src/models';
import { usePagination } from 'src/utils/hooks/use-pagination';

export const Pagination: FC<IPaginationProps> = memo(
  ({
    amountPages,
    currSort,
    categoryId,
    q,
    additionalQuery,
    className = '',
    onClick,
    onBtnLoadClick,
    callback,
    ...rest
  }) => {
    const {
      currPaginationPage,
      handleNextClick,
      handleNumClick,
      handlePrevClick,
      handleLoadMoreClick,
    } = usePagination({
      id: categoryId,
      q,
      currSort,
      additionalQuery,
      onClick,
      onBtnLoadClick,
      callback,
    });
    const { status } = useStore($catalogItemsStore);

    const { t } = useTranslation();

    const list = useMemo(
      () => Array.from({ length: amountPages }, (_v, i) => i + 1),
      [amountPages],
    );

    const listToRender = useMemo(() => {
      if (list.length <= 7) return list;

      if (currPaginationPage <= 4) return [1, 2, 3, 4, 5, '...', list.length];

      if (currPaginationPage >= list.length - 3) {
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

      return [
        1,
        '...',
        currPaginationPage - 1,
        currPaginationPage,
        currPaginationPage + 1,
        '...',
        list.length,
      ];
    }, [list, currPaginationPage]);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        {currPaginationPage !== list.length && (
          <Button
            kind={EButtonKinds.load}
            text={t('items.load-btn')}
            isLoading={status === 'LOADING'}
            onClick={handleLoadMoreClick}
          />
        )}
        <div className={styles.pagination_box} {...rest}>
          <button
            className={clsx(styles.btn, styles.btn_arrow)}
            type='button'
            disabled={currPaginationPage === 1}
            onClick={handlePrevClick}
          >
            <ArrowPagIcon />
          </button>
          {listToRender.map((item, i) => (
            <button
              key={i}
              className={clsx(styles.btn, styles.btn_num)}
              type='button'
              disabled={currPaginationPage === item || item === '...'}
              onClick={handleNumClick(item)}
            >
              <Paragraph
                className={clsx(styles.text, {
                  [styles.text_active]: currPaginationPage === item,
                })}
              >
                {item}
              </Paragraph>
            </button>
          ))}
          <button
            className={clsx(styles.btn, styles.btn_arrow)}
            type='button'
            disabled={currPaginationPage === list.length}
            onClick={handleNextClick}
          >
            <ArrowPagIcon className={styles.btn_arrow_right} />
          </button>
        </div>
      </div>
    );
  },
);
