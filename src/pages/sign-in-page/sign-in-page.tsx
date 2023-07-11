import clsx from 'clsx';
import { FC } from 'react';

import styles from './sign-in-page.module.scss';
import { ISignInPageProps } from './types';

import { SignIn } from '../../components';

export const SignInPage: FC<ISignInPageProps> = ({ className = '', ...rest }) => {
  console.log('t');

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <div className={styles.left_column} />
      <div className={styles.right_column}>
        <SignIn className={styles.form} />
      </div>
    </section>
  );
};
