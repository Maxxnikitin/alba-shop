import clsx from 'clsx';
import { FC, lazy, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import styles from './sign-in.module.scss';

import { ISignInProps } from './types';

import { SignInEmail } from '../';
import { ETypes, Paragraph, Tabs } from '../ui';
const SignInSms = lazy(() => import('../sign-in-sms'));

export const SignIn: FC<ISignInProps> = ({ className = '', ...rest }) => {
  const [activeTab, setActiveTab] = useState<ETypes>(ETypes.email);
  const [isHidden, setIsHidden] = useState(false);

  const { t } = useTranslation();

  if (localStorage.getItem('access')) return <Navigate to='/' replace />;

  return (
    <section className={clsx(styles.signin, { [className]: className })} {...rest}>
      <div className={styles.logo} />
      {!isHidden && <Paragraph className={styles.text}>{t('sign-in.subtitle')}</Paragraph>}
      {!isHidden && (
        <Tabs
          className={clsx(styles.tabs, { [styles.add_margin]: activeTab === ETypes.email })}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      {activeTab === ETypes.phone ? <SignInSms setIsHidden={setIsHidden} /> : <SignInEmail />}
    </section>
  );
};
