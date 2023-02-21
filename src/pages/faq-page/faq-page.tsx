import clsx from 'clsx';
import { MouseEventHandler, FC, memo, useCallback, useEffect, useState } from 'react';

import styles from './faq-page.module.scss';
import { IFaqPageProps } from './types';

import { Title, Accordion } from '../../components/ui';

import { getFaqData, TGetFaqDataRes } from '~utils';

export const FaqPage: FC<IFaqPageProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TGetFaqDataRes[]>([]);
  const [openId, setOpenId] = useState<string>('');

  const handleOpen: MouseEventHandler<HTMLButtonElement> = useCallback(e => {
    const target = e.target as HTMLElement;

    const id = target.id || target.closest('button')!.id;
    setOpenId(id);
  }, []);

  useEffect(() => {
    // getFaqData().then(res => setData(res))
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
    ]);
  }, []);

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
});
