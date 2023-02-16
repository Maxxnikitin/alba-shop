import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './footer.module.scss';
import { IFooter } from './types';

import { CategoryItem } from '../ui';

const categories = [
  'Защитные чехлы',
  'Защитные стёкла',
  'Ремешки',
  'Зарядные устройства',
  'Кабели',
  'Колонки и наушники',
  'Детские товары',
];

export const Footer: FC<IFooter> = memo(({ className = '', ...rest }) => (
  <footer className={clsx(styles.footer, className)} {...rest}>
    <div className={styles.container}>
      <div className={styles.main}>
        {categories.map(item => (
          <CategoryItem text={item} key={item} />
        ))}
      </div>
    </div>
  </footer>
));
