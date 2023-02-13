import clsx from 'clsx';
import { FC, FormEventHandler, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './sign-in-email.module.scss';

import { Button, Input, Paragraph, Title } from '../ui';

interface ISignInEmail {
  className?: string;
}

export const SignInEmail: FC<ISignInEmail> = ({ className = '', ...rest }) => {
  const [inputsData, setInputsData] = useState({
    email: '',
    password: '',
  });

  console.log('render SignInEmail');

  const { t } = useTranslation();

  const handleChangeInputs: FormEventHandler<HTMLInputElement> = useCallback(
    e => {
      const id = (e.target as HTMLInputElement).id;
      const value = (e.target as HTMLInputElement).value;

      setInputsData({
        ...inputsData,
        [id]: value,
      });
    },
    [inputsData],
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form className={clsx(styles.form, className)} noValidate onSubmit={handleSubmit} {...rest}>
      <Title text={t('sign-in.title')} className={styles.title} />
      <Paragraph text={t('sign-in.subtitle')} className={styles.paragraph} />
      <Input
        placeholder='E-mail'
        fieldClassName={styles.input}
        type='email'
        id='email'
        value={inputsData.email}
        onChange={handleChangeInputs}
      />
      <Input
        placeholder={t('inputs.password') || ''}
        fieldClassName={styles.input}
        type='password'
        id='password'
        value={inputsData.password}
        onChange={handleChangeInputs}
      />
      <Button text={t('sign-in.submit-btn')} kind='sign-in' type='submit' />
    </form>
  );
};
