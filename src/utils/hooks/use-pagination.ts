import { useCallback, useEffect, useMemo, useState } from 'react';

import { handleScroll } from '../helpers';

import { TItemsWithPagination, TParams } from '../types';

type TProps = {
  onClick: (obj: TParams) => void;
  onBtnLoadClick: (obj: TParams) => void;
  callback?: (queries: string[], q?: string) => Promise<TItemsWithPagination>;
  currSort?: string;
  additionalQuery?: string;
  id?: string;
  q?: string;
};

export const usePagination = ({
  id,
  q,
  currSort,
  additionalQuery,
  onClick,
  onBtnLoadClick,
  callback,
}: TProps) => {
  const [currPaginationPage, setCurrPaginationPage] = useState(1);
  const [isLoadBtnClick, setIsLoadBtnClick] = useState(false);

  const sortQuery = useMemo(() => (currSort ? `sort=${currSort}` : ''), [currSort]);

  const handlePrevClick = useCallback(() => {
    const queries = [sortQuery, `page=${currPaginationPage - 1}`, additionalQuery ?? ''];

    onClick({
      id,
      q,
      queries,
      fn: callback,
    });
    setCurrPaginationPage(currPaginationPage - 1);
    setIsLoadBtnClick(false);
  }, [currPaginationPage, sortQuery, id, q, additionalQuery, onClick, callback]);

  const handleNextClick = useCallback(() => {
    const queries = [sortQuery, `page=${currPaginationPage + 1}`, additionalQuery ?? ''];

    onClick({
      id,
      q,
      queries,
      fn: callback,
    });
    setCurrPaginationPage(currPaginationPage + 1);
    setIsLoadBtnClick(false);
  }, [currPaginationPage, sortQuery, id, q, additionalQuery, onClick, callback]);

  const handleNumClick: (num: number | string) => () => void = num => () => {
    if (typeof num === 'string') return;

    const queries = [sortQuery, `page=${num}`, additionalQuery ?? ''];

    onClick({
      id,
      q,
      queries,
      fn: callback,
    });
    setCurrPaginationPage(num);
    setIsLoadBtnClick(false);
  };

  const handleLoadMoreClick = useCallback(() => {
    const queries = [sortQuery, `page=${currPaginationPage + 1}`, additionalQuery ?? ''];

    onBtnLoadClick({
      id,
      q,
      queries,
      fn: callback,
    });
    setCurrPaginationPage(currPaginationPage + 1);
    setIsLoadBtnClick(true);
  }, [currPaginationPage, id, q, sortQuery, additionalQuery, onBtnLoadClick, callback]);

  useEffect(() => {
    if (!isLoadBtnClick) {
      handleScroll();
    }
  }, [currPaginationPage, isLoadBtnClick]);

  return {
    currPaginationPage,
    handlePrevClick,
    handleNextClick,
    handleNumClick,
    handleLoadMoreClick,
  };
};
