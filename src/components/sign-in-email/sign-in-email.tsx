import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './sign-in-email.module.scss';

import { Button, Input, Paragraph, Title } from '../ui';

interface ISignInEmail {
  className?: string;
}

export const SignInEmail: FC<ISignInEmail> = ({ className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <form className={clsx(styles.form, className)} {...rest}>
      <Title text={t('sign-in.title')} className={styles.title} />
      <Paragraph text={t('sign-in.subtitle')} className={styles.paragraph} />
      <Input placeholder='E-mail' fieldClassName={styles.input} type='email' />
      <Input
        placeholder={t('inputs.password') || ''}
        fieldClassName={styles.input}
        type='password'
      />
      <Button text={t('sign-in.submit-btn')} kind='sign-in' />
    </form>
  );
};
