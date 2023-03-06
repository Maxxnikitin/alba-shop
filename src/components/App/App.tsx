import { useRoutes } from 'react-router-dom';

import styles from './App.module.scss';

import { SignIn, Header, Footer, Filters, QueryNotFound, EmptyCart, ItemDetails } from '..';
import { FaqPage, NotFound } from '../../pages';
import { Button, CloseButton, EButtonKinds, Input } from '../ui';

export function App() {
  console.log('Render App');
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
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
      path: '/favourites',
      element: <p>Favourites</p>,
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
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <div className={styles.container}>
      <Header />
      {routes}
      <Footer />
    </div>
  );
}
