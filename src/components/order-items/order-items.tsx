import clsx from 'clsx';
import { FC, memo, MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './order-items.module.scss';

import { IOrderItemsProps } from './types';

import { ItemOrder, OrderDetails } from '..';
import { BackButton, Button, EButtonKinds, Pagination } from '../ui';

import { getOrders, TOrder, TOrdersWithPagination } from '~utils';

export const OrderItems: FC<IOrderItemsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TOrdersWithPagination | null>(null);
  const [pageSize, setPageSize] = useState(18);
  const [currPaginationPage, setCurrPaginationPage] = useState(1);
  const [currItem, setCurrItem] = useState<TOrder | null>(null);
  const [offset, setOffset] = useState(0);
  const [isUpdateData, setIsUpdateData] = useState(false);

  const { t } = useTranslation();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      const { id } = currentTarget;

      setCurrItem(data?.data.find(item => item.id === +id)!);
      setOffset(window.pageYOffset);
    },
    [data],
  );

  const handleBackClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setCurrItem(null);
  }, []);

  const handleLoadMoreClick = useCallback(() => {
    setPageSize(pageSize + 18);
  }, [pageSize]);

  useEffect(() => {
    getOrders()
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (isUpdateData) {
      getOrders()
        .then(res => {
          setData(res);
          setCurrItem(null);
        })
        .catch(err => console.log(err))
        .finally(() => setIsUpdateData(false));
    }
  }, [isUpdateData]);

  useEffect(() => {
    if (currItem) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: offset,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [offset, currItem]);

  if (!data) return <p>loader</p>;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {currItem ? (
        <>
          <BackButton
            text={t('personal-account.order.back')!}
            className={styles.btn_back}
            onClick={handleBackClick}
          />
          <OrderDetails data={currItem} setIsUpdateData={setIsUpdateData} />
        </>
      ) : (
        <>
          <ul className={styles.list}>
            {data.data?.map(item => (
              <ItemOrder key={item.id} data={item} onClick={handleClick} />
            ))}
          </ul>
          {data.meta.pagination.num_pages !== 1 && (
            <>
              <Button
                kind={EButtonKinds.load}
                text={t('items.load-btn')}
                onClick={handleLoadMoreClick}
              />
              <Pagination
                className={styles.pagination}
                amountPage={data.meta.pagination.num_pages}
                activePage={currPaginationPage}
                setCurrPaginationPage={setCurrPaginationPage}
              />
            </>
          )}
        </>
      )}
    </div>
  );
});
