import PhoneInputWithCountrySelect from 'react-phone-number-input';

import styles from './app.module.scss';
import 'react-phone-number-input/style.css';

import { SignIn } from '..';
import { Button, Input } from '../ui';

export function App() {
  return (
    <div className={styles.container}>
      <SignIn />
      <Button text='Да, очистить корзину' />
      <Button text='Отменить' kind='secondary' />
      <Button text='Каталог' kind='menu' />
      <Button text='Изменить' kind='addition' />
      <Button text='Загрузить ещё' kind='load' />
      <Button text='Ожидает поступления' kind='item-missing' />
      <Button text='Войти' kind='sign-in' />
      <Button text='Отправить повторно через 50с' kind='delay' />
      <Input label='Город' />
      <Input placeholder='Имя' label='Имя' />
      <Input placeholder='Пароль' type='password' />
    </div>
  );
}
