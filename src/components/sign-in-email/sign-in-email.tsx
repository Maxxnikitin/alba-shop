import { AxiosError } from 'axios';
import clsx from 'clsx';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import styles from './sign-in-email.module.scss';

import { ISignInEmailProps } from './types';

import { Button, EButtonKinds, Input, Paragraph } from '../ui';

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
  const passwordInputRef = useRef(null);

  const handleChangeInputs: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setInputsData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }, []);

  const handleFocusToRemoveError = () => {
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setSubmitError(null);
    (emailInputRef as MutableRefObject<HTMLInputElement | null>)?.current?.blur();
    (passwordInputRef as MutableRefObject<HTMLInputElement | null>)?.current?.blur();

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
      <Paragraph className={clsx(styles.error, { [styles.error_active]: submitError })} isError>
        {submitError}
      </Paragraph>
      <Input
        className={styles.input_email}
        placeholder='E-mail'
        fieldClassName={styles.input}
        type='email'
        id='email'
        required
        value={inputsData.email}
        onChange={handleChangeInputs}
        onFocus={handleFocusToRemoveError}
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
        onFocus={handleFocusToRemoveError}
        isError={!!submitError}
        ref={passwordInputRef}
        autoComplete='on'
      />
      <Button text={t('sign-in.submit-btn')} kind={EButtonKinds.signIn} type='submit' />
    </form>
  );
};
