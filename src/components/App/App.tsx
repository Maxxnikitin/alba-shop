import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import styles from './App.module.scss';

import { SignIn, Header, Footer, Filters, QueryNotFound, EmptyCart, ItemDetails, Item } from '..';
import { AboutPage, FaqPage, NotFound } from '../../pages';
import { Button, CloseButton, EButtonKinds, Input } from '../ui';

import { DataContext, mockContactsData, TDataContext } from '~utils';

const itemMockData = {
  type: 'characteristics',
  id: 'rrewecdsc',
  name: 'Чехол Luxo original green',
  product_id: 'string44',
  weight: 10,
  stock: 20,
  in_cart: 0,
  price: '510.00',
  discount: 10,
  discounted_price: '410.00',
  color: 'Black',
  is_new: true,
  is_hit: true,
  in_favorite: false,
  photo: [
    'https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg',
    'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
    'https://img.mvideo.ru/Pdb/50129627b.jpg',
    'https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg',
    'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
    'https://img.mvideo.ru/Pdb/50129627b.jpg',
    'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
  ],
};

export function App() {
  const [contextData, setContextData] = useState<TDataContext>({ contacts: null });
  console.log('Render App');

  useEffect(() => {
    setContextData({ contacts: mockContactsData });
  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <Item data={itemMockData} onLikeClick={() => console.log('like')} />
          <SignIn />
          <EmptyCart />
          <QueryNotFound />
          <div style={{ width: 292 }}>
            <CloseButton text='Close filters' />
            <Filters />
          </div>
          <Button text='Да, очистить корзину' />
          <Button text='Отменить' kind={EButtonKinds.secondary} />
          <Button text='Каталог' kind={EButtonKinds.menu} />
          <Button text='Изменить' kind={EButtonKinds.addition} />
          <Button text='Загрузить ещё' kind={EButtonKinds.load} />
          <Button text='Ожидает поступления' kind={EButtonKinds.itemMissing} />
          <Button text='Войти' kind={EButtonKinds.signIn} />
          <Button text='Отправить повторно через 50с' kind={EButtonKinds.delay} />
          <Input label='Город' />
          <Input placeholder='Имя' label='Имя' />
          <Input placeholder='Пароль' type='password' />
        </div>
      ),
    },
    {
      path: '/account',
      element: <p>Account</p>,
    },
    {
      path: '/cart',
      element: <p>Cart</p>,
    },
    {
      path: '/favorites',
      element: <p>Favorites</p>,
    },
    {
      path: '/catalog/:id',
      element: <ItemDetails />,
    },
    {
      path: '/faq',
      element: <FaqPage />,
    },
    {
      path: '/about',
      element: <AboutPage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <div className={styles.container}>
      <DataContext.Provider value={contextData}>
        <Header />
        {routes}
        <Footer />
      </DataContext.Provider>
    </div>
  );
}
