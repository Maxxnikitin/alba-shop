import clsx from 'clsx';

import { FC, FormEventHandler, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PhoneInputWithCountrySelect from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';

import styles from './sign-in-sms.module.scss';
import 'react-phone-number-input/style.css';

import { ISignInSmsProps, THandleSignInRequest, TInputsData } from './types';

import { Button, EButtonKinds, Paragraph, PhoneInput, SmsInput, Title } from '../ui';

import { authLogin, authSetPhone } from '~utils';

export const SignInSms: FC<ISignInSmsProps> = ({ className = '', ...rest }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNum, setPhoneNum] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [codeInputsData, setCodeInputsData] = useState<TInputsData>({
    0: '',
    1: '',
    2: '',
    3: '',
  });

  const navigate = useNavigate();

  const { t } = useTranslation();

  const phoneInputRef = useRef(null);

  const handleRequest: THandleSignInRequest = otp => {
    setIsLoadingError(false);
    setIsLoading(true);
    if (step === 1) {
      authSetPhone({ phone_number: phoneNum })
        .then(() => {
          setStep(2);
        })
        .catch(err => {
          console.log(err);
          setIsLoadingError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      authLogin({ phone_number: phoneNum, otp: otp ?? 0 })
        .then(({ access }) => {
          localStorage.setItem('access', access);

          navigate('/', { replace: true });
        })
        .catch(err => {
          console.log(err);
          setIsLoadingError(true);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleChangePhone = (v: string | undefined) => {
    setPhoneNum(v ?? '');
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    handleRequest();
  };

  useEffect(() => {
    if (phoneInputRef.current) {
      (phoneInputRef.current as HTMLInputElement).focus();
    }
  }, [phoneInputRef]);

  return (
    <form className={clsx(styles.form, className)} noValidate onSubmit={handleSubmit} {...rest}>
      <Title className={styles.title}>{t('sign-in.title')}</Title>
      <Paragraph className={styles.paragraph}>{t('sign-in.telegram-subtitle')}</Paragraph>
      {isLoadingError && (
        <Paragraph className={styles.error} isError>
          {t('sign-in.loading-error')}
        </Paragraph>
      )}
      {step === 1 ? (
        <PhoneInputWithCountrySelect
          defaultCountry='RU'
          inputComponent={PhoneInput}
          onChange={handleChangePhone}
          ref={phoneInputRef}
          disabled={isLoading}
        />
      ) : (
        <SmsInput
          inputsData={codeInputsData}
          setInputsData={setCodeInputsData}
          handleRequest={handleRequest}
        />
      )}
      <Button
        text={isLoading ? t('sign-in.loading') : t('sign-in.submit-btn')}
        kind={EButtonKinds.signIn}
        className={styles.btn}
        type='submit'
        disabled={isLoading}
      />
    </form>
  );
};
