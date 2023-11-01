import { AxiosError } from 'axios';
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

import { useNavigate } from 'react-router-dom';

import styles from './sign-in-email.module.scss';

import { ISignInEmailProps } from './types';

import { Button, EButtonKinds, Input, Paragraph, Title } from '../ui';

import { authLogin } from '~utils';

export const SignInEmail: FC<ISignInEmailProps> = ({ className = '', ...rest }) => {
  const [inputsData, setInputsData] = useState({
    email: '',
    password: '',
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const emailInputRef = useRef(null);

  const handleChangeInputs: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setSubmitError(null);
    setInputsData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setSubmitError(null);
    authLogin(inputsData)
      .then(({ access }) => {
        localStorage.setItem('access', access);

        navigate('/', { replace: true });
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          setSubmitError(t('sign-in.password-error'));
        } else {
          setSubmitError(t('sign-in.server-error'));
        }
      });
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
      {submitError && (
        <Paragraph className={styles.error} isError>
          {submitError}
        </Paragraph>
      )}
      <Input
        placeholder='E-mail'
        fieldClassName={styles.input}
        type='email'
        id='email'
        required
        value={inputsData.email}
        onChange={handleChangeInputs}
        ref={emailInputRef}
        isError={!!submitError}
      />
      <Input
        placeholder={t('inputs.password') || ''}
        fieldClassName={styles.input}
        type='password'
        id='password'
        value={inputsData.password}
        onChange={handleChangeInputs}
        isError={!!submitError}
      />
      <Button text={t('sign-in.submit-btn')} kind={EButtonKinds.signIn} type='submit' />
    </form>
  );
};
