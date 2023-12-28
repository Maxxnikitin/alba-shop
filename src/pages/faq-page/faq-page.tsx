import clsx from 'clsx';
import { MouseEventHandler, FC, useCallback, useEffect, useState } from 'react';

import styles from './faq-page.module.scss';
import { IFaqPageProps } from './types';

import { Title, Accordion, Loader } from '../../components/ui';

import { TGetFaqDataRes, getFaqData } from '~utils';

export const FaqPage: FC<IFaqPageProps> = ({ className = '', ...rest }) => {
  const [data, setData] = useState<TGetFaqDataRes[] | null>(null);
  const [openId, setOpenId] = useState<string>('');

  const handleOpen: MouseEventHandler<HTMLButtonElement> = useCallback(({ currentTarget }) => {
    const { id } = currentTarget;

    setOpenId(id);
  }, []);

  useEffect(() => {
    getFaqData().then(({ data }) => setData(data));
  }, []);

  if (!data) return <Loader />;

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
