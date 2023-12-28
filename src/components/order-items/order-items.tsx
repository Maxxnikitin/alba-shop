import clsx from 'clsx';
import { useStore } from 'effector-react';
import { FC, memo, MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './order-items.module.scss';

import { IOrderItemsProps } from './types';

import { ItemOrder, OrderDetails } from '..';
import { BackButton, Loader, Pagination } from '../ui';

import {
  $orderItemsStore,
  getOrderItemsFx,
  removeOrdersItems,
  updateOrderItemsBtnFx,
} from 'src/models';
import { handleScroll, TOrder } from '~utils';

export const OrderItems: FC<IOrderItemsProps> = memo(({ className = '', ...rest }) => {
  const [currItem, setCurrItem] = useState<TOrder | null>(null);
  const [offset, setOffset] = useState(0);
  const [isUpdateData, setIsUpdateData] = useState(false);

  const { data } = useStore($orderItemsStore);

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

  useEffect(() => {
    getOrderItemsFx({ queries: [] });
  }, []);

  useEffect(() => {
    if (isUpdateData) {
      getOrderItemsFx({ queries: [] }).then(() => {
        setIsUpdateData(false);
        setCurrItem(null);
      });
    }
  }, [isUpdateData]);

  useEffect(() => {
    if (currItem) {
      handleScroll();
    } else {
      handleScroll(offset);
    }
  }, [offset, currItem]);

  useEffect(() => () => removeOrdersItems(), []);

  if (!data) return <Loader />;

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
            <Pagination
              className={styles.pagination}
              amountPages={data.meta.pagination.num_pages}
              onClick={getOrderItemsFx}
              onBtnLoadClick={updateOrderItemsBtnFx}
            />
          )}
        </>
      )}
    </div>
  );
});
