import clsx from 'clsx';
import { FC, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './sign-in.module.scss';

import { SignInSms, SignInEmail } from '../';
import logo from '../../images/logo.jpg';
import { ETypes } from '../../utils/common-types';
import { Tabs } from '../ui';

interface ISignIn {
  className?: string;
}

export const SignIn: FC<ISignIn> = ({ className = '', ...rest }) => {
  const [activeTab, setActiveTab] = useState<ETypes>(ETypes.phone);

  const { t } = useTranslation();

  return (
    <section className={clsx(styles.signin, { [className]: className })} {...rest}>
      <img className={styles.logo} alt={t('sign-in.logo-alt') || ''} src={logo} />
      <Tabs className={styles.tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === ETypes.phone ? <SignInSms /> : <SignInEmail />}
    </section>
  );
};
