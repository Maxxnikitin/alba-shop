import { useRoutes } from 'react-router-dom';

import styles from './app.module.scss';

import { SignIn, Header } from '..';
import { Button, EButtonKinds, Input } from '../ui';

export function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <>
          <Header />
          <SignIn />
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
        </>
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
  ]);

  return <div className={styles.container}>{routes}</div>;
}
