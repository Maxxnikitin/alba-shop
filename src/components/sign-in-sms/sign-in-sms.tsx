import clsx from 'clsx';
import { FC, FormEventHandler, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PhoneInputWithCountrySelect from 'react-phone-number-input';

import styles from './sign-in-sms.module.scss';
import 'react-phone-number-input/style.css';

import { ISignInSms, THandleSignInRequest, TInputsData } from './types';

import { Button, Paragraph, PhoneInput, SmsInput, Title } from '../ui';

export const SignInSms: FC<ISignInSms> = ({ className = '', ...rest }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNum, setPhoneNum] = useState('');
  const [codeInputsData, setCodeInputsData] = useState<TInputsData>({
    0: '',
    1: '',
    2: '',
    3: '',
  });

  const { t } = useTranslation();

  const phoneInputRef = useRef(null);

  const handleRequest: THandleSignInRequest = () => {
    if (step === 1) {
      console.log(phoneNum);
      setStep(2);
    } else {
      console.log('submit');
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
      {step === 1 ? (
        <PhoneInputWithCountrySelect
          defaultCountry='RU'
          inputComponent={PhoneInput}
          onChange={handleChangePhone}
          ref={phoneInputRef}
        />
      ) : (
        <SmsInput
          inputsData={codeInputsData}
          setInputsData={setCodeInputsData}
          handleRequest={handleRequest}
        />
      )}
      <Button text={t('sign-in.submit-btn')} kind='sign-in' className={styles.btn} type='submit' />
    </form>
  );
};
