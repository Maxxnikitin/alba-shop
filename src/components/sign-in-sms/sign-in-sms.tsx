import { AxiosError } from 'axios';
import clsx from 'clsx';

import {
  FC,
  FormEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import PhoneInputWithCountrySelect from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';

import styles from './sign-in-sms.module.scss';
import 'react-phone-number-input/style.css';

import { ISignInSmsProps, THandleSignInRequest, TInputsData } from './types';

import { Button, EButtonKinds, Paragraph, PhoneInput, SmsInput } from '../ui';

import { authLogin, authSetPhone } from '~utils';

const SignInSms: FC<ISignInSmsProps> = ({ setIsHidden, className = '', ...rest }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNum, setPhoneNum] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');

  const [codeInputsData, setCodeInputsData] = useState<TInputsData>({
    0: '',
    1: '',
    2: '',
    3: '',
  });

  const navigate = useNavigate();

  const { t } = useTranslation();

  const isPhoneValid = useMemo(() => phoneNum.length === 12, [phoneNum]);

  const [codeBtnState, setCodeBtnState] = useState({
    sec: 0,
    text: t('sign-in.sent-sms-btn', { amount: 0 }),
  });
  const [paragraphText, setParagraphText] = useState({
    first: t('sign-in.telegram-subtitle'),
    second: '',
  });

  const phoneInputRef = useRef(null);
  const input0Ref = useRef(null);

  const startCodeTimer = useCallback(() => {
    let sec = 60;

    setCodeBtnState({
      sec: 60,
      text: t('sign-in.sent-sms-btn', { amount: 60 }),
    });

    const id = setInterval(() => {
      sec--;

      setCodeBtnState({
        sec,
        text: sec ? t('sign-in.sent-sms-btn', { amount: sec }) : t('sign-in.resent-sms-btn'),
      });

      if (!sec) {
        clearInterval(id);
        return;
      }
    }, 1000);
  }, [t]);

  const handleRequest = () => {
    setLoadingError('');
    setIsLoading(true);
    authSetPhone({ phone_number: phoneNum })
      .then(({ data }) => {
        const [first, second] = data.message.split('+');
        setParagraphText({ first, second: `+${second}` });
        setStep(2);
        setIsHidden(true);
        startCodeTimer();
        handleRemoveError();
      })
      .catch(err => {
        console.log(err);
        setLoadingError(t('sign-in.loading-error')!);
      })
      .finally(() => setIsLoading(false));
  };

  const handleAuth: THandleSignInRequest = useCallback(
    otp => {
      authLogin({ phone_number: phoneNum, otp })
        .then(({ access }) => {
          localStorage.setItem('access', access);

          navigate('/', { replace: true });
        })
        .catch((err: AxiosError) => {
          console.log(err);

          if (err.response?.status === 401) {
            setLoadingError(t('sign-in.code-error')!);
          } else {
            setLoadingError(t('sign-in.loading-error')!);
          }
        })
        .finally(() => setIsLoading(false));
    },
    [phoneNum, navigate, t],
  );

  const handleRemoveError = useCallback(() => {
    setCodeInputsData({
      0: '',
      1: '',
      2: '',
      3: '',
    });
    setLoadingError('');
    (input0Ref as MutableRefObject<HTMLInputElement | null>)?.current?.focus();
  }, []);

  const handleChangePhone = (v: string | undefined) => {
    setPhoneNum(v ?? '');
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    handleRequest();
  };

  const handleFocusToRemoveError = () => {
    if (loadingError) {
      setLoadingError('');
    }
  };

  useEffect(() => {
    if (phoneInputRef.current) {
      (phoneInputRef.current as HTMLInputElement).focus();
    }
  }, [phoneInputRef]);

  return (
    <form className={clsx(styles.form, className)} noValidate onSubmit={handleSubmit} {...rest}>
      <Paragraph className={clsx(styles.paragraph, { [styles.paragraph_margin]: step === 2 })}>
        {paragraphText.first} <b>{paragraphText.second}</b>
      </Paragraph>
      <Paragraph className={clsx(styles.error, { [styles.error_active]: loadingError })} isError>
        {loadingError}
      </Paragraph>
      {step === 1 ? (
        <>
          <PhoneInputWithCountrySelect
            defaultCountry='RU'
            inputComponent={PhoneInput}
            onChange={handleChangePhone}
            ref={phoneInputRef}
            disabled={isLoading}
            isError={loadingError}
            onFocus={handleFocusToRemoveError}
          />
          <Button
            text={isLoading ? t('sign-in.loading') : t('sign-in.get-code')}
            kind={EButtonKinds.signIn}
            className={styles.btn}
            type='submit'
            disabled={isLoading || !isPhoneValid}
          />
        </>
      ) : (
        <>
          <SmsInput
            inputsData={codeInputsData}
            setInputsData={setCodeInputsData}
            handleRequest={handleAuth}
            handleRemoveError={handleRemoveError}
            isError={!!loadingError}
            input0Ref={input0Ref}
          />
          <Button
            text={isLoading ? t('sign-in.loading') : codeBtnState.text}
            kind={EButtonKinds.signIn}
            className={styles.btn}
            type='submit'
            disabled={isLoading || !!codeBtnState.sec}
          />
        </>
      )}
    </form>
  );
};

export default SignInSms;
