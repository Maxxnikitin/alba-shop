import clsx from 'clsx';
import moment from 'moment';
import { FC, memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './order-details.module.scss';
import { IOrderDetailsProps } from './types';

import { ItemOrderDetails } from '../item-order-details';
import { ModalSmall } from '../modal-small';
import { Button, CrossIcon, EButtonKinds, OrderStatus, Paragraph } from '../ui';
import { Tooltip } from '../ui/tooltip';

import { EOrderStatus, cancelOrder } from '~utils';

export const OrderDetails: FC<IOrderDetailsProps> = memo(
  ({ data, setIsUpdateData, className = '', ...rest }) => {
    const [renderItemsCount, setRenderItemsCount] = useState(10);
    const [removeOrder, setRemoveOrder] = useState<boolean>(false);
    const { t } = useTranslation();

    const handleIncrementCRenderCount = useCallback(() => {
      setRenderItemsCount(prev => prev + 10);
    }, []);

    const handleToggleRemoveOrderModal = useCallback(() => {
      setRemoveOrder(prev => !prev);
    }, []);

    const handleRemoveOrder = useCallback(() => {
      cancelOrder(data.id)
        .then(res => setIsUpdateData(true))
        .catch(err => console.log(err));
    }, [data, setIsUpdateData]);

    return (
      <article className={clsx(styles.container, className)} {...rest}>
        <div className={styles.row}>
          <div className={styles.order_num_box}>
            <Paragraph className={styles.order_num}>
              {t('personal-account.order.number', { number: data.id })}
            </Paragraph>
            <Paragraph className={styles.order_date}>
              {t('personal-account.order.date', {
                date: moment(data.created).format('Do MMMM YYYY'),
              })}
            </Paragraph>
          </div>
          {data.status === EOrderStatus.NEW && (
            <div className={styles.btn_cancel_box}>
              <button className={styles.btn_cancel} onClick={handleToggleRemoveOrderModal}>
                <CrossIcon className={styles.btn_cancel_icon} />
              </button>
              <Tooltip text={t('tooltip.cancel-order')} className={styles.tooltip} />
            </div>
          )}

          <OrderStatus type={data.status} className={styles.status} />
          <div className={styles.order_price_box}>
            <Paragraph className={styles.order_price}>
              {t('personal-account.order.price', { price: data.amount })}
            </Paragraph>
            <OrderStatus type={data.status} className={styles.status_mob} />
          </div>
        </div>
        <ul className={styles.list}>
          {data.content.map((item, i) => {
            if (i < renderItemsCount) {
              return <ItemOrderDetails key={item.id} data={item} />;
            }
            return null;
          })}
        </ul>
        {renderItemsCount < data.content.length && (
          <Button
            kind={EButtonKinds.load}
            text={t('items.load-btn')}
            onClick={handleIncrementCRenderCount}
          />
        )}
        <ModalSmall
          title={t('modals.order.cancel-title')!}
          text={t('modals.order.cancel-text', { number: data.id })!}
          isOpen={!!removeOrder}
          successBtnText={t('modals.order.btns.btn_success')!}
          cancellBtnText={t('modals.order.btns.btn_cancel')!}
          onClose={handleToggleRemoveOrderModal}
          onSuccess={handleRemoveOrder}
          withCloseBtn
        />
      </article>
    );
  },
);
