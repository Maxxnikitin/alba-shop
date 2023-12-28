import clsx from 'clsx';
import { useStore } from 'effector-react';
import { FC, memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './cart-table.module.scss';
import { ICartTableProps } from './types';

import { ItemCart } from '../item-cart';
import { Button, CloseButton, Paragraph, RemoveCrossIcon, Title } from '../ui';

import { $cartItemsStore } from 'src/models';

export const CartTable: FC<ICartTableProps> = memo(
  ({ onClick, handleRemoveCart, handleRemoveItem, className = '', ...rest }) => {
    const { t } = useTranslation();

    const { data, status } = useStore($cartItemsStore);

    const minOrderAmount = useMemo(() => +(process.env.REACT_APP_MIN_ORDER_AMOUNT || 0), []);

    const isBtnDisabled = useMemo(
      () =>
        +(data?.data?.amount || 0) < minOrderAmount ||
        status === 'LOADING' ||
        !data?.data?.is_valid,
      [data, status, minOrderAmount],
    );

    const headers = useMemo(
      () => [
        t('cart.table.name'),
        t('cart.table.able'),
        t('cart.table.amount'),
        t('cart.table.price'),
        t('cart.table.remove'),
      ],
      [t],
    );

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Title className={styles.title}>{t('cart.title')}</Title>
        <CloseButton
          className={styles.btn_clean}
          textClassName={styles.btn_clean_text}
          text={t('cart.btn-clean')!}
          onClick={handleRemoveCart}
          icon={RemoveCrossIcon}
        />
        <div className={styles.table}>
          <div className={styles.table_head}>
            {headers.map((item, i) => (
              <Paragraph key={i} className={styles.table_head_text}>
                {item}
              </Paragraph>
            ))}
          </div>
          <ul className={styles.table_list}>
            {data?.data?.content.map(item => (
              <ItemCart
                key={item.id}
                data={item}
                handleRemoveItem={handleRemoveItem}
                className={styles.table_list_item}
              />
            ))}
          </ul>
        </div>
        <div className={styles.summary}>
          <div className={styles.first_col}>
            <Paragraph className={styles.weight_text}>
              {t('cart.table.total-weight')}{' '}
              <span className={styles.weight}>{`${data?.data?.weight} ${t(
                'cart.table.total-weight-unit',
              )}`}</span>
            </Paragraph>
            <Paragraph className={styles.min_order}>
              {t('cart.table.min-order', { amount: minOrderAmount })}
            </Paragraph>
          </div>
          <div className={styles.second_col}>
            <div className={styles.row}>
              <Paragraph className={styles.row_text}>{t('cart.table.total-price')}</Paragraph>
              {data?.data?.amount !== data?.data?.final_amount && (
                <Paragraph className={styles.row_value_prev}>{`${+(
                  data?.data?.amount || 0
                )} ₽`}</Paragraph>
              )}
              <Paragraph className={styles.row_value}>{`${+(
                data?.data?.final_amount || 0
              )} ₽`}</Paragraph>
            </div>
            {!!data?.data?.customer.discount && (
              <div className={styles.row}>
                <Paragraph className={styles.row_text}>{t('cart.table.status-discount')}</Paragraph>
                <Paragraph className={styles.row_value}>{`${+data?.data?.customer
                  .discount} ₽`}</Paragraph>
              </div>
            )}
            <div className={styles.row}>
              <Paragraph className={styles.row_text}>{t('cart.table.total-pay')}</Paragraph>
              <Paragraph className={styles.row_value}>{`${+(
                data?.data?.final_amount || 0
              )} ₽`}</Paragraph>
            </div>
            <Button
              className={styles.btn}
              text={t('cart.table.btn')}
              onClick={onClick}
              disabled={isBtnDisabled}
            />
          </div>
        </div>
      </div>
    );
  },
);
