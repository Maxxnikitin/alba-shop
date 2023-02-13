import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import PhoneInputWithCountrySelect from 'react-phone-number-input';

import styles from './sign-in-sms.module.scss';
import 'react-phone-number-input/style.css';

import { Button, Paragraph, PhoneInput, Title } from '../ui';

interface ISignInSms {
  className?: string;
}

export const SignInSms: FC<ISignInSms> = ({ className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <form className={clsx(styles.form, className)} {...rest}>
      <Title text={t('sign-in.title')} className={styles.title} />
      <Paragraph text={t('sign-in.telegram-subtitle')} className={styles.paragraph} />
      <PhoneInputWithCountrySelect
        defaultCountry='RU'
        inputComponent={PhoneInput}
        onChange={() => console.log('yy')}
      />
      <Button text={t('sign-in.submit-btn')} kind='sign-in' className={styles.btn} />
    </form>
  );
};
