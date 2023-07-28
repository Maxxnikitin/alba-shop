import clsx from 'clsx';
import { MouseEventHandler, FC, useCallback, useEffect, useState } from 'react';

import styles from './faq-page.module.scss';
import { IFaqPageProps } from './types';

import { Title, Accordion } from '../../components/ui';

import { TGetFaqDataRes, getFaqData } from '~utils';

export const FaqPage: FC<IFaqPageProps> = ({ className = '', ...rest }) => {
  const [data, setData] = useState<TGetFaqDataRes[] | null>(null);
  const [openId, setOpenId] = useState<string>('');

  const handleOpen: MouseEventHandler<HTMLButtonElement> = useCallback(({ currentTarget }) => {
    const { id } = currentTarget;

    setOpenId(id);
  }, []);

  useEffect(() => {
    getFaqData().then(res =>
      setData([
        {
          type: 'faq',
          id: 1,
          header: 'Как оформить заказ?',
          description: ['Добавить товар в корзину', 'Перейти в корзину', 'Нажать оформить заказ'],
        },
        {
          type: 'faq',
          id: 2,
          header: 'Как оформить заказ?',
          description: ['Добавить товар в корзину', 'Перейти в корзину', 'Нажать оформить заказ'],
        },
        {
          type: 'faq',
          id: 3,
          header: 'Как оформить заказ?',
          description: [
            'Добавить товар в корзину',
            'Перейти в корзину',
            'Нажать оформить заказ',
            'Добавить товар в корзину',
            'Перейти в корзину',
            'Нажать оформить заказ',
          ],
        },
      ]),
    );
  }, []);

  if (!data) return <p>loader</p>;

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.title}>FAQ</Title>
      <div className={styles.list}>
        {data.length &&
          data.map(data => (
            <Accordion
              key={data.id}
              dataObj={data}
              className={styles.accordion}
              isOpen={data.id.toString() === openId}
              onBtnClick={handleOpen}
            />
          ))}
      </div>
    </section>
  );
};
