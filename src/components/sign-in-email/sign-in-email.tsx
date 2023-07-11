import clsx from 'clsx';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import styles from './sign-in-email.module.scss';

import { ISignInEmailProps } from './types';

import { Button, EButtonKinds, Input, Paragraph, Title } from '../ui';

import { authSetEmail } from '~utils';

export const SignInEmail: FC<ISignInEmailProps> = ({ className = '', ...rest }) => {
  const [inputsData, setInputsData] = useState({
    email: '',
    password: '',
  });

  const { t } = useTranslation();

  const emailInputRef = useRef(null);

  const handleChangeInputs: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setInputsData({
        ...inputsData,
        [e.target.id]: e.target.value,
      });
    },
    [inputsData],
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    authSetEmail(inputsData).then(res => console.log(res));
  };

  useEffect(() => {
    if (emailInputRef.current) {
      (emailInputRef.current as HTMLInputElement).focus();
    }
  }, [emailInputRef]);

  return (
    <form className={clsx(styles.form, className)} onSubmit={handleSubmit} {...rest}>
      <Title className={styles.title}>{t('sign-in.title')}</Title>
      <Paragraph className={styles.paragraph}>{t('sign-in.subtitle')}</Paragraph>
      <Input
        placeholder='E-mail'
        fieldClassName={styles.input}
        type='email'
        id='email'
        required
        value={inputsData.email}
        onChange={handleChangeInputs}
        ref={emailInputRef}
      />
      <Input
        placeholder={t('inputs.password') || ''}
        fieldClassName={styles.input}
        type='password'
        id='password'
        value={inputsData.password}
        onChange={handleChangeInputs}
      />
      <Button text={t('sign-in.submit-btn')} kind={EButtonKinds.signIn} type='submit' />
    </form>
  );
};
