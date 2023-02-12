import PhoneInputWithCountrySelect from 'react-phone-number-input';

import styles from './App.module.scss';
import 'react-phone-number-input/style.css';

import { Button, Input, Tabs } from '../ui';

export function App() {
  return (
    <div className={styles.container}>
      <Tabs />
      <Button text='Да, очистить корзину' />
      <Button text='Отменить' kind='secondary' />
      <Button text='Каталог' kind='menu' />
      <Button text='Изменить' kind='addition' />
      <Button text='Загрузить ещё' kind='load' />
      <Button text='Ожидает поступления' kind='item-missing' />
      <Button text='Войти' kind='sign-in' />
      <Button text='Отправить повторно через 50с' kind='delay' />
      <Input ref={el => el?.focus()} label='Город' />
      <Input placeholder='Имя' label='Имя' />
      <Input placeholder='Пароль' type='password' />
      <PhoneInputWithCountrySelect
        defaultCountry='RU'
        inputComponent={Input}
        onChange={() => console.log('tt')}
      />
    </div>
  );
}
