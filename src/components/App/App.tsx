import styles from './App.module.scss';

import { Button } from '../ui';

export function App() {
  return (
    <div className={styles.container}>
      <Button text='Да, очистить корзину' />
      <Button text='Отменить' kind='secondary' />
      <Button text='Каталог' kind='menu' />
      <Button text='Изменить' kind='addition' />
      <Button text='Загрузить ещё' kind='load' />
      <Button text='Ожидает поступления' kind='item-missing' />
      <Button text='Войти' kind='sign-in' />
      <Button text='Отправить повторно через 50с' kind='delay' />
    </div>
  );
}
