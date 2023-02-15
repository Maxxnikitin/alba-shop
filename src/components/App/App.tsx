import { useRoutes } from 'react-router-dom';

import styles from './App.module.scss';

import { SignIn, Header, Footer } from '..';
import { Button, Checkbox, EButtonKinds, Input, Switch } from '../ui';

export function App() {
  console.log('Render App');
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <>
          <SignIn />
          <div style={{ width: 292 }}>
            <Checkbox label='Apple' amount={100} />
          </div>
          <div style={{ width: 292 }}>
            <Switch label='Apple' />
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

  return (
    <div className={styles.container}>
      <Header />
      {routes}
      <Footer />
    </div>
  );
}
